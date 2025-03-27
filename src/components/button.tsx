import { h, Component } from 'preact';
import { Control, ControlAction } from '../types/controls';

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
            color: control.color,
            ...style,
        };

        return (
            <button
                onClick={() => onClick(control)}
                style={buttonStyle}
                onMouseDown={() => onMouseDown(control.action)}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                className={`control-button ${activeControl === control.action ? 'active' : ''}`}
            >
                {`╔═══╗
║ ${control.label} ║
╚═══╝`}
            </button>
        );
    }
}
