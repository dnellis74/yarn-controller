import { h, Component } from 'preact';
import { ControlPanelProps, containerStyle } from '../types/controls';
import { Button } from './button';
import { Control } from '../types/controls';

const isActionControl = (control: Control): boolean => {
    return ['actionA', 'actionB', 'fullscreen', 'ctrlC'].includes(control.action);
};

export class ActionControls extends Component<ControlPanelProps> {
    render({
        controls,
        activeControl,
        onControlClick,
        onControlMouseDown,
        onControlMouseUp,
        onControlMouseLeave,
    }: ControlPanelProps) {
        const actionControls = controls.filter(isActionControl);

        return (
            <div style={{ ...containerStyle, borderLeft: '1px solid #333' }}>
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
