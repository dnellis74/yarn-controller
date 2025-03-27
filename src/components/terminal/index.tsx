import { bind } from 'decko';
import { Component, h } from 'preact';
import { Xterm, XtermOptions } from './xterm';
import { ControlAction } from '../../types/controls';

import '@xterm/xterm/css/xterm.css';
import { Modal } from '../modal';

interface Props extends XtermOptions {
    id: string;
}

interface State {
    modal: boolean;
    dimensions: {
        cols: number;
        rows: number;
    };
}

export interface TerminalHandle {
    sendControl: (action: ControlAction) => void;
    sendKey: (key: string) => void;
}

export class Terminal extends Component<Props, State> {
    private container: HTMLElement;
    private xterm: Xterm;
    private resizeObserver: ResizeObserver;
    private resizeTimeout: number | null = null;
    private isResizing = false;

    constructor(props: Props) {
        super();
        this.state = {
            modal: false,
            dimensions: { cols: 0, rows: 0 },
        };
        this.xterm = new Xterm(props, this.showModal);
        this.resizeObserver = new ResizeObserver(entries => {
            const entry = entries[0];
            if (entry) {
                this.handleResize();
            }
        });
    }

    async componentDidMount() {
        await this.xterm.refreshToken();
        this.xterm.open(this.container);
        this.xterm.connect();

        // Initial fit
        setTimeout(() => {
            this.handleResize();
            this.resizeObserver.observe(this.container);
            window.addEventListener('resize', this.handleWindowResize);
        }, 100);
    }

    componentWillUnmount() {
        if (this.resizeTimeout) {
            window.clearTimeout(this.resizeTimeout);
        }
        window.removeEventListener('resize', this.handleWindowResize);
        this.resizeObserver.disconnect();
        this.xterm.dispose();
    }

    private handleWindowResize = () => {
        if (!this.isResizing) {
            this.isResizing = true;
            if (this.resizeTimeout) {
                window.clearTimeout(this.resizeTimeout);
            }
            this.resizeTimeout = window.setTimeout(() => {
                this.handleResize();
                this.isResizing = false;
            }, 16); // Approximately one frame at 60fps
        }
    };

    private handleResize = () => {
        if (!this.container) return;

        const { width, height } = this.container.getBoundingClientRect();
        if (width <= 0 || height <= 0) return;

        requestAnimationFrame(() => {
            try {
                this.xterm.fit();
                // Get the new dimensions and send them to the server
                const terminal = this.xterm.getTerminal();
                const { cols, rows } = terminal;
                this.setState({ dimensions: { cols, rows } });
                this.xterm.sendResize(cols, rows);

                // Force a second fit after a short delay to handle any layout adjustments
                setTimeout(() => {
                    this.xterm.fit();
                    const terminal = this.xterm.getTerminal();
                    const { cols, rows } = terminal;
                    this.setState({ dimensions: { cols, rows } });
                    this.xterm.sendResize(cols, rows);
                }, 50);
            } catch (e) {
                console.error('Error during terminal resize:', e);
            }
        });
    };

    sendControl = (action: ControlAction) => {
        this.xterm.sendControl(action);
    };

    sendKey = (key: string) => {
        this.xterm.sendData(key);
    };

    render({ id }: Props, { modal, dimensions }: State) {
        const containerStyle = {
            width: '100%',
            height: '100%',
            position: 'relative' as const,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column' as const,
            minHeight: '0',
            flex: '1 1 auto',
        };

        const debugStyle = {
            position: 'absolute' as const,
            top: '5px',
            right: '5px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: 'monospace',
            zIndex: 1000,
            pointerEvents: 'none' as const,
        };

        const terminal = this.xterm.getTerminal();
        const fontSize = terminal?.options?.fontSize || '?';

        return (
            <div id={id} style={containerStyle} ref={c => (this.container = c as HTMLElement)}>
                <div style={debugStyle}>
                    {dimensions.cols}x{dimensions.rows} @ {fontSize}px
                </div>
                <Modal show={modal}>
                    <label class="file-label">
                        <input onChange={this.sendFile} class="file-input" type="file" multiple />
                        <span class="file-cta">Choose files…</span>
                    </label>
                </Modal>
            </div>
        );
    }

    @bind
    showModal() {
        this.setState({ modal: true });
    }

    @bind
    sendFile(event: Event) {
        this.setState({ modal: false });
        const files = (event.target as HTMLInputElement).files;
        if (files) this.xterm.sendFile(files);
    }
}
