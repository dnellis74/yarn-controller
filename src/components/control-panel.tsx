import { h, Component, Fragment } from 'preact';
import { Control, ControlPanelProps, containerStyle } from '../types/controls';
import { Button } from './button';

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
        const isLandscape = window.innerWidth > window.innerHeight;

        const panelStyle = {
            ...containerStyle,
            position: position || 'relative',
            borderLeft: '1px solid #333',
        };

        const directionalControlsStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            gap: '4px',
            width: '100%',
            height: '100%',
            maxWidth: '120px',
            maxHeight: '120px',
            margin: '0 auto',
        };

        const getGridPosition = (control: Control) => {
            switch (control.action) {
                case 'moveUp':
                    return { gridRow: 1, gridColumn: 2 };
                case 'moveDown':
                    return { gridRow: 3, gridColumn: 2 };
                case 'moveLeft':
                    return { gridRow: 2, gridColumn: 1 };
                case 'moveRight':
                    return { gridRow: 2, gridColumn: 3 };
                default:
                    return {};
            }
        };

        const directionalControls = controls.filter(c =>
            ['moveUp', 'moveDown', 'moveLeft', 'moveRight'].includes(c.action)
        );
        const actionControls = controls.filter(c => ['actionA', 'actionB'].includes(c.action));
        const fullscreenControl = controls.find(c => c.action === 'fullscreen');

        return (
            <div style={panelStyle}>
                {isLandscape ? (
                    <Fragment>
                        {fullscreenControl && (
                            <Button
                                key={fullscreenControl.action}
                                control={fullscreenControl}
                                activeControl={activeControl}
                                onClick={onControlClick}
                                onMouseDown={onControlMouseDown}
                                onMouseUp={onControlMouseUp}
                                onMouseLeave={onControlMouseLeave}
                                style={{ marginBottom: 'auto' }}
                            />
                        )}
                        <div style={directionalControlsStyle}>
                            {directionalControls.map(control => (
                                <Button
                                    key={control.action}
                                    control={control}
                                    activeControl={activeControl}
                                    onClick={onControlClick}
                                    onMouseDown={onControlMouseDown}
                                    onMouseUp={onControlMouseUp}
                                    onMouseLeave={onControlMouseLeave}
                                    style={getGridPosition(control)}
                                />
                            ))}
                        </div>
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
                    </Fragment>
                ) : (
                    <Fragment>
                        {fullscreenControl && (
                            <Button
                                key={fullscreenControl.action}
                                control={fullscreenControl}
                                activeControl={activeControl}
                                onClick={onControlClick}
                                onMouseDown={onControlMouseDown}
                                onMouseUp={onControlMouseUp}
                                onMouseLeave={onControlMouseLeave}
                                style={{ marginLeft: 'auto' }}
                            />
                        )}
                        {controls
                            .filter(c => c.action !== 'fullscreen')
                            .map(control => (
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
                    </Fragment>
                )}
            </div>
        );
    }
}
