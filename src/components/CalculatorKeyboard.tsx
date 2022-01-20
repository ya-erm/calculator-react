import React, { MouseEventHandler, useCallback, useMemo, useRef } from 'react';
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

    const buttonsMap = useMemo(
        () => [
            ['C', '(', ')', '/'],
            ['7', '8', '9', '*'],
            ['4', '5', '6', '-'],
            ['1', '2', '3', '+'],
            ['0', '0', '.', '='],
        ],
        [],
    );
    const backdropRef = useRef<HTMLDivElement>(null);
    const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
        (e) => {
            if (!backdropRef.current || e.target !== backdropRef.current) {
                return;
            }
            const rect = backdropRef.current.getBoundingClientRect();
            const x = e.pageX - rect.x;
            const y = e.pageY - rect.y;
            const col = Math.floor(x / (rect.width / 4));
            const row = Math.floor(y / (rect.height / 5));
            if (col < 0 || col > 3 || row < 0 || row > 4) {
                return;
            }
            const button = buttonsMap[row][col];
            onKeyPress(button);
        },
        [buttonsMap],
    );

    const css = useStyle();

    return (
        <div className={css.container} onClick={handleClick}>
            <div ref={backdropRef} className={css.backdrop} />
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
        position: 'relative',
    },
    backdrop: {
        position: 'absolute',
        zIndex: 5,
        width: '100%',
        height: '100%',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
