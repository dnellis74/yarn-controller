import { h, Component } from 'preact';
import { Terminal } from './terminal';
import { ControlPanel } from './control-panel';
import { ControlAction } from '../types/controls';

import type { ITerminalOptions, ITheme } from '@xterm/xterm';
import type { ClientOptions, FlowControl } from './terminal/xterm';

// Get WebSocket URL from environment or construct from current location
const getWsUrl = () => {
    return 'wss://ec2-3-92-134-219.compute-1.amazonaws.com/ws';
    // Check for environment variable first
    // if (process.env.REACT_APP_WS_URL) {
    //     return process.env.REACT_APP_WS_URL;
    // }
    // // Fallback to constructing from current location
    // const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    // const path = window.location.pathname.replace(/[/]+$/, '');
    // return [protocol, '//', window.location.host, path, '/ws', window.location.search].join('');
};

// Get token URL from environment or construct from current location
const getTokenUrl = () => {
    return 'https://ec2-3-92-134-219.compute-1.amazonaws.com/token';
    // Check for environment variable first
    // if (process.env.REACT_APP_TOKEN_URL) {
    //     return process.env.REACT_APP_TOKEN_URL;
    // Fallback to constructing from current location
    // const path = window.location.pathname.replace(/[/]+$/, '');
    // return [window.location.protocol, '//', window.location.host, path, '/token'].join('');
};

const wsUrl = getWsUrl();
const tokenUrl = getTokenUrl();

const clientOptions = {
    rendererType: 'webgl',
    disableLeaveAlert: false,
    disableResizeOverlay: false,
    enableZmodem: false,
    enableTrzsz: false,
    enableSixel: false,
    closeOnDisconnect: false,
    isWindows: false,
    unicodeVersion: '11',
} as ClientOptions;
const termOptions = {
    fontSize: 13,
    fontFamily: 'Consolas,Liberation Mono,Menlo,Courier,monospace',
    theme: {
        foreground: '#d2d2d2',
        background: '#2b2b2b',
        cursor: '#adadad',
        black: '#000000',
        red: '#d81e00',
        green: '#5ea702',
        yellow: '#cfae00',
        blue: '#427ab3',
        magenta: '#89658e',
        cyan: '#00a7aa',
        white: '#dbded8',
        brightBlack: '#686a66',
        brightRed: '#f54235',
        brightGreen: '#99e343',
        brightYellow: '#fdeb61',
        brightBlue: '#84b0d8',
        brightMagenta: '#bc94b7',
        brightCyan: '#37e6e8',
        brightWhite: '#f1f1f0',
    } as ITheme,
    allowProposedApi: true,
} as ITerminalOptions;
const flowControl = {
    limit: 100000,
    highWater: 10,
    lowWater: 4,
} as FlowControl;

interface Control {
    action: ControlAction;
    label: string;
    color: string;
}

export class App extends Component {
    private terminalRef: Terminal | null = null;
    private activeControl: ControlAction | null = null;

    private controls: Control[] = [
        { action: 'moveUp', label: '^', color: '#2196F3' },
        { action: 'moveDown', label: 'v', color: '#2196F3' },
        { action: 'moveLeft', label: '<', color: '#2196F3' },
        { action: 'moveRight', label: '>', color: '#2196F3' },
        { action: 'actionA', label: 'A', color: '#f44336' },
        { action: 'actionB', label: 'B', color: '#f44336' },
    ];

    private handleControl = (control: Control) => {
        this.activeControl = control.action;
        this.terminalRef?.sendControl(control.action);
        setTimeout(() => {
            this.activeControl = null;
            this.forceUpdate();
        }, 200);
    };

    private handleControlMouseDown = (action: ControlAction) => {
        this.activeControl = action;
        this.forceUpdate();
    };

    private handleControlMouseUp = () => {
        this.activeControl = null;
        this.forceUpdate();
    };

    private handleControlMouseLeave = () => {
        this.activeControl = null;
        this.forceUpdate();
    };

    render() {
        const appStyle = {
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'row' as const,
            overflow: 'hidden',
        };

        const terminalContainerStyle = {
            flex: 1,
            minWidth: 0,
            overflow: 'hidden',
        };

        return (
            <div style={appStyle}>
                <ControlPanel
                    controls={this.controls.slice(0, 4)}
                    activeControl={this.activeControl}
                    onControlClick={this.handleControl}
                    onControlMouseDown={this.handleControlMouseDown}
                    onControlMouseUp={this.handleControlMouseUp}
                    onControlMouseLeave={this.handleControlMouseLeave}
                    position="left"
                />

                <div style={terminalContainerStyle}>
                    <Terminal
                        ref={ref => (this.terminalRef = ref)}
                        id="terminal-container"
                        wsUrl={wsUrl}
                        tokenUrl={tokenUrl}
                        clientOptions={clientOptions}
                        termOptions={termOptions}
                        flowControl={flowControl}
                    />
                </div>

                <ControlPanel
                    controls={this.controls.slice(4)}
                    activeControl={this.activeControl}
                    onControlClick={this.handleControl}
                    onControlMouseDown={this.handleControlMouseDown}
                    onControlMouseUp={this.handleControlMouseUp}
                    onControlMouseLeave={this.handleControlMouseLeave}
                    position="right"
                />
            </div>
        );
    }
}
