import { h, Component } from 'preact';
import { ControlAction } from '../types/controls';

interface Control {
    action: ControlAction;
    label: string;
    color: string;
}

interface ButtonProps {
    control: Control;
    activeControl: ControlAction | null;
    onClick: (control: Control) => void;
    onMouseDown: (action: ControlAction) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    style?: h.JSX.CSSProperties;
}

export class Button extends Component<ButtonProps> {
    render({ control, activeControl, onClick, onMouseDown, onMouseUp, onMouseLeave, style }: ButtonProps) {
        const buttonStyle = {
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
            ...style,
        };

        return (
            <button
                onClick={() => onClick(control)}
                style={buttonStyle}
                onMouseDown={() => onMouseDown(control.action)}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
            >
                {`╔═══╗
║ ${control.label} ║
╚═══╝`}
            </button>
        );
    }
}
