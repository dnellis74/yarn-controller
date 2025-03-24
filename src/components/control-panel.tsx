import { h, Component } from 'preact';
import { ControlAction } from '../types/controls';

interface Control {
    action: ControlAction;
    label: string;
    color: string;
}

interface ControlPanelProps {
    controls: Control[];
    activeControl: ControlAction | null;
    onControlClick: (control: Control) => void;
    onControlMouseDown: (action: ControlAction) => void;
    onControlMouseUp: () => void;
    onControlMouseLeave: () => void;
    position: 'left' | 'right';
}

export class ControlPanel extends Component<ControlPanelProps> {
    render({
        controls,
        activeControl,
        onControlClick,
        onControlMouseDown,
        onControlMouseUp,
        onControlMouseLeave,
        position,
    }: ControlPanelProps) {
        const panelStyle = {
            width: '60px',
            minWidth: '60px',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '8px',
            padding: '8px',
            paddingBottom: '16px',
            backgroundColor: '#1a1a1a',
            borderRight: position === 'left' ? '1px solid #333' : 'none',
            borderLeft: position === 'right' ? '1px solid #333' : 'none',
            overflow: 'hidden',
            justifyContent: 'flex-end',
            height: '100%',
        };

        const getButtonStyle = (control: Control) => ({
            padding: '4px',
            backgroundColor: 'transparent',
            color: control.color,
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            whiteSpace: 'pre',
            lineHeight: 1,
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            transform: activeControl === control.action ? 'scale(0.95)' : 'scale(1)',
            opacity: activeControl === control.action ? 0.8 : 1,
            boxShadow: activeControl === control.action ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
        });

        return (
            <div style={panelStyle}>
                {controls.map(control => (
                    <button
                        key={control.action}
                        onClick={() => onControlClick(control)}
                        style={getButtonStyle(control)}
                        onMouseDown={() => onControlMouseDown(control.action)}
                        onMouseUp={onControlMouseUp}
                        onMouseLeave={onControlMouseLeave}
                    >
                        {`╔═══╗
║ ${control.label} ║
╚═══╝`}
                    </button>
                ))}
            </div>
        );
    }
}
