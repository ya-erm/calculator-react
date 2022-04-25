import { useStore } from 'effector-react';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { roundTo } from '../model/Calculator';
import { $expression, $input } from '../model';

const formatThousands = (x: number | string) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');
};

const InputValue: React.FC = () => {
    const input = useStore($input);
    const number = Number(input);
    const value =
        isNaN(number) || input.endsWith('.') || /^\d+.*0+$/.test(input)
            ? input
            : roundTo(number, 10);
    return <>{formatThousands(value)}</>;
};

const ExpressionValue: React.FC = () => {
    const expression = useStore($expression);
    return <>{expression}</>;
};

const CalculatorHeader: React.FC = () => {
    const css = useStyles();

    return (
        <div className={css.container}>
            <div className={css.inputMain} aria-label="input">
                <InputValue />
            </div>
            <div className={css.separator} />
            <div className={css.history} aria-label="history">
                <ExpressionValue />
            </div>
        </div>
    );
};

export default CalculatorHeader;

const useStyles = createUseStyles({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        marginRight: 20,
    },
    inputMain: {
        fontSize: 30,
        textAlign: 'right',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'anywhere',
    },
    history: {
        textAlign: 'right',
        fontSize: 20,
        whiteSpace: 'pre-wrap',
        overflowWrap: 'anywhere',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
        margin: '5px 0',
    },
});
