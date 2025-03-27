import { Control } from '../types/controls';

const BUTTON_TEMPLATE = `╔═══╗
║ {label} ║
╚═══╝`;

export const getButtonText = (control: Control): string => {
    return BUTTON_TEMPLATE.replace('{label}', control.label);
};

export const isDirectionalControl = (control: Control): boolean => {
    return ['moveUp', 'moveDown', 'moveLeft', 'moveRight'].includes(control.action);
};

export const isActionControl = (control: Control): boolean => {
    return ['actionA', 'actionB'].includes(control.action);
}; 