import { h, Component, Fragment } from 'preact';
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
        const isLandscape = window.innerWidth > window.innerHeight;
        const panelStyle = {
            width: isLandscape ? '60px' : '100%',
            minWidth: isLandscape ? '60px' : 'auto',
            height: isLandscape ? '100%' : '60px',
            minHeight: isLandscape ? 'auto' : '60px',
            display: 'flex',
            flexDirection: isLandscape ? ('column' as const) : ('row' as const),
            gap: '8px',
            padding: '8px',
            paddingBottom: isLandscape ? '16px' : '8px',
            paddingRight: isLandscape ? '8px' : '16px',
            backgroundColor: '#1a1a1a',
            borderRight: position === 'left' ? '1px solid #333' : 'none',
            borderLeft: position === 'right' ? '1px solid #333' : 'none',
            borderBottom: !isLandscape ? '1px solid #333' : 'none',
            overflow: 'hidden',
            justifyContent: isLandscape ? 'center' : 'flex-start',
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

        return (
            <div style={panelStyle}>
                {isLandscape ? (
                    <Fragment>
                        <div style={directionalControlsStyle}>
                            {directionalControls.map(control => (
                                <button
                                    key={control.action}
                                    onClick={() => onControlClick(control)}
                                    style={{ ...getButtonStyle(control), ...getGridPosition(control) }}
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
                    </Fragment>
                ) : (
                    controls.map(control => (
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
                    ))
                )}
            </div>
        );
    }
}
