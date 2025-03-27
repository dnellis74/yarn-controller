import { h, Component } from 'preact';
import { ControlAction } from '../types/controls';

interface Control {
    action: ControlAction;
    label: string;
    color: string;
}

interface ActionControlsProps {
    controls: Control[];
    activeControl: ControlAction | null;
    onControlClick: (control: Control) => void;
    onControlMouseDown: (action: ControlAction) => void;
    onControlMouseUp: () => void;
    onControlMouseLeave: () => void;
}

export class ActionControls extends Component<ActionControlsProps> {
    render({
        controls,
        activeControl,
        onControlClick,
        onControlMouseDown,
        onControlMouseUp,
        onControlMouseLeave,
    }: ActionControlsProps) {
        const containerStyle = {
            width: '80px',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '8px',
            backgroundColor: '#1a1a1a',
            borderLeft: '1px solid #333',
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
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            transform: activeControl === control.action ? 'scale(0.95)' : 'scale(1)',
            opacity: activeControl === control.action ? 0.8 : 1,
            boxShadow: activeControl === control.action ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
        });

        const actionControls = controls.filter(c => ['actionA', 'actionB'].includes(c.action));

        return (
            <div style={containerStyle}>
                {actionControls.map(control => (
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
