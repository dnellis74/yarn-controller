import { h, Component } from 'preact';
import { ControlAction } from '../types/controls';
import { Button } from './button';

interface Control {
    action: ControlAction;
    label: string;
    color: string;
}

interface DirectionalControlsProps {
    controls: Control[];
    activeControl: ControlAction | null;
    onControlClick: (control: Control) => void;
    onControlMouseDown: (action: ControlAction) => void;
    onControlMouseUp: () => void;
    onControlMouseLeave: () => void;
}

export class DirectionalControls extends Component<DirectionalControlsProps> {
    render({
        controls,
        activeControl,
        onControlClick,
        onControlMouseDown,
        onControlMouseUp,
        onControlMouseLeave,
    }: DirectionalControlsProps) {
        const containerStyle = {
            width: '80px',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '8px',
            backgroundColor: '#1a1a1a',
            borderRight: '1px solid #333',
            height: '100%',
        };

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

        return (
            <div style={containerStyle}>
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
