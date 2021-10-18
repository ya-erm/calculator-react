import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';

export type IButtonProps = {
    text: string;
    icon?: JSX.Element;
    type?: 'action' | 'number';
    columns?: number;
    onPress?: () => any;
};

export const BUTTON_SIZE = 85;
export const BUTTON_MARGIN = 5;
export const BUTTON_FULL_SIZE = BUTTON_SIZE + 2 * BUTTON_MARGIN;

export const CalculatorButton: React.FC<IButtonProps> = ({
    text,
    icon,
    type = 'number',
    columns = 1,
    onPress = () => {},
}) => {
    const css = useStyles();
    const extraClass = type === 'number' ? css.numberButton : css.actionButton;

    const maxSize = Math.min(window.innerWidth, window.innerHeight) / 4;
    const size = Math.min(BUTTON_SIZE, maxSize);

    return (
        <button
            className={clsx(css.button, extraClass)}
            style={{
                height: size,
                width: columns * size + (columns - 1) * 2 * BUTTON_MARGIN,
                borderRadius: size,
            }}
            onClick={onPress}
        >
            {icon ? icon : text}
        </button>
    );
};

export const ActionButton: React.FC<IButtonProps> = ({ text, type = 'action', ...other }) => (
    <CalculatorButton text={text} type={type} {...other} />
);

const useStyles = createUseStyles({
    button: {
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
        textAlign: 'center',
        cursor: 'pointer',
        fontSize: 30,
        userSelect: 'none',
        margin: BUTTON_MARGIN,

        '&:hover': {
            opacity: 0.95,
        },

        '&:active': {
            opacity: 0.6,
        },

        '& svg': {
            width: '35px',
            height: '35px',
        },
    },
    numberButton: {
        color: 'black',
        backgroundColor: '#D6E2FC',
    },
    actionButton: {
        backgroundColor: '#285FF5',
        color: 'white',
        fill: 'white',
    },
    icon: {
        width: '100%',
        height: '100%',
    },
});
