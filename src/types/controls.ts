export type ControlAction = 'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' | 'actionA' | 'actionB';

export interface Control {
    action: ControlAction;
    label: string;
    color: string;
}

export interface ControlPanelProps {
    controls: Control[];
    activeControl: ControlAction | null;
    onControlClick: (control: Control) => void;
    onControlMouseDown: (action: ControlAction) => void;
    onControlMouseUp: () => void;
    onControlMouseLeave: () => void;
}

export const containerStyle = {
    width: '80px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '8px',
    backgroundColor: '#1a1a1a',
    height: '100%',
};
