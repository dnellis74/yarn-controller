import { h, Component } from 'preact';
import { Control, ControlPanelProps, containerStyle } from '../types/controls';
import { Button } from './button';

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '4px',
    width: '72px',
    height: '72px',
    margin: '0 auto',
    padding: '0 4px',
};

const isDirectionalControl = (control: Control): boolean => {
    return ['moveUp', 'moveDown', 'moveLeft', 'moveRight'].includes(control.action);
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

export class DirectionalControls extends Component<ControlPanelProps> {
    render({
        controls,
        activeControl,
        onControlClick,
        onControlMouseDown,
        onControlMouseUp,
        onControlMouseLeave,
    }: ControlPanelProps) {
        const directionalControls = controls.filter(isDirectionalControl);

        return (
            <div style={{ ...containerStyle, borderRight: '1px solid #333' }}>
                <div style={gridStyle}>
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
            </div>
        );
    }
}
