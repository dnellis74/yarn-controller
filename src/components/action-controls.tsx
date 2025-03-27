import { h, Component } from 'preact';
import { Control, ControlPanelProps, containerStyle } from '../types/controls';
import { Button } from './button';

export class ActionControls extends Component<ControlPanelProps> {
    render({
        controls,
        activeControl,
        onControlClick,
        onControlMouseDown,
        onControlMouseUp,
        onControlMouseLeave,
    }: ControlPanelProps) {
        const actionControls = controls.filter(c => ['actionA', 'actionB'].includes(c.action));

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
