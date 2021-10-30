import React from 'react';
import { createUseStyles } from 'react-jss';
import { ReactComponent as MultiplyIcon } from '../assets/icons/close.svg';
import { ReactComponent as TrashIcon } from '../assets/icons/delete.svg';
import { ReactComponent as DivideIcon } from '../assets/icons/division.svg';
import { ReactComponent as EqualsIcon } from '../assets/icons/equal.svg';
import { ReactComponent as MinusIcon } from '../assets/icons/minus.svg';
import { ReactComponent as PlusIcon } from '../assets/icons/plus.svg';
import { EVENT_EMITTER } from '../hooks/useEvents';
import { ActionButton, CalculatorButton, IButtonProps } from './CalculatorButton';

type ICalculatorKeyboardProps = {};

const Row: React.FC = ({ children }) => {
    const css = useStyle();
    return <div className={css.row}>{children}</div>;
};

const CalculatorKeyboard: React.FC<ICalculatorKeyboardProps> = () => {
    const onKeyPress = (key: string) => {
        EVENT_EMITTER.emit('key', key);
    };

    const NumberButton: React.FC<IButtonProps> = ({ text, type = 'number', ...other }) => (
        <CalculatorButton text={text} type={type} onPress={() => onKeyPress(text)} {...other} />
    );

    const FunctionButton: React.FC<IButtonProps> = ({ text, type = 'action', ...other }) => (
        <CalculatorButton text={text} type={type} onPress={() => onKeyPress(text)} {...other} />
    );

    const css = useStyle();

    return (
        <div className={css.container}>
            <Row>
                <ActionButton text="C" icon={<TrashIcon />} onPress={() => onKeyPress('C')} />
                <NumberButton text="(" type="action" />
                <NumberButton text=")" type="action" />
                <FunctionButton text="/" icon={<DivideIcon />} />
            </Row>
            <Row>
                <NumberButton text="7" />
                <NumberButton text="8" />
                <NumberButton text="9" />
                <FunctionButton text="*" icon={<MultiplyIcon />} />
            </Row>
            <Row>
                <NumberButton text="4" />
                <NumberButton text="5" />
                <NumberButton text="6" />
                <FunctionButton text="-" icon={<MinusIcon />} />
            </Row>
            <Row>
                <NumberButton text="1" />
                <NumberButton text="2" />
                <NumberButton text="3" />
                <FunctionButton text="+" icon={<PlusIcon />} />
            </Row>
            <Row>
                <NumberButton text="0" columns={2} />
                <NumberButton text="." />
                <ActionButton text="=" onPress={() => onKeyPress('=')} icon={<EqualsIcon />} />
            </Row>
        </div>
    );
};

export default CalculatorKeyboard;

const useStyle = createUseStyles({
    container: {
        marginBottom: 20,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
