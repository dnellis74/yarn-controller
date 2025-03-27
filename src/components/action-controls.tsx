import { h, Component } from 'preact';
import { ControlAction } from '../types/controls';
import { Button } from './button';

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

        const actionControls = controls.filter(c => ['actionA', 'actionB'].includes(c.action));

        return (
            <div style={containerStyle}>
                {actionControls.map(control => (
                    <Button
                        key={control.action}
                        control={control}
                        activeControl={activeControl}
                        onClick={onControlClick}
                        onMouseDown={onControlMouseDown}
                        onMouseUp={onControlMouseUp}
                        onMouseLeave={onControlMouseLeave}
                    />
                ))}
            </div>
        );
    }
}
