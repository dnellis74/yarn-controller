import { Control } from '../types/controls';

export const isDirectionalControl = (control: Control): boolean => {
    return ['moveUp', 'moveDown', 'moveLeft', 'moveRight'].includes(control.action);
};

export const isActionControl = (control: Control): boolean => {
    return ['actionA', 'actionB', 'fullscreen', 'ctrlC'].includes(control.action);
};
