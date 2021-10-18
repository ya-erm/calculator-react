import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { EVENT_EMITTER } from '../hooks/useEvents';
import { calculate } from '../model/Calculator';

type ICalculatorInputProps = {};

const nonRepeatingOperators = ['+', '-', '/', '*'];

const CalculatorInput: React.FC<ICalculatorInputProps> = () => {
    const [state, setState] = React.useState({
        input: '0',
        expression: '0',
    });
    const { input, expression } = state;

    const clearAction = () => {
        setState({ input: '0', expression: '0' });
    };

    const numberAction = (number: string) => {
        const inputValue = expression.includes('=') ? '0' : input;
        const expressionValue = expression.includes('=') ? '0' : expression;

        if (inputValue === '0') {
            if (number === '.') {
                // If expression ends with operator then append zero
                const trimmedExpression = expressionValue.trimEnd();
                if (
                    trimmedExpression.length > 0 &&
                    nonRepeatingOperators.includes(
                        String(trimmedExpression[trimmedExpression.length - 1]),
                    )
                ) {
                    setState((prev) => ({
                        ...prev,
                        expression: prev.expression + '0',
                    }));
                }
            } else {
                // Replace zero by digit 1-9
                setState((prev) => ({
                    input: number,
                    expression: expressionValue === '0' ? number : prev.expression + number,
                }));
                return;
            }
        }
        // Ignore duplicate decimal delimiter sign
        if (inputValue.includes('.') && number === '.') {
            return;
        }

        setState((prev) => ({
            input: prev.input + number,
            expression: prev.expression + number,
        }));
    };

    const continueWithResult = () => {
        const values = expression.split('=').map((x) => x.trimEnd());
        const value = values[values.length - 1] ?? '0';
        setState((prev) => ({ ...prev, expression: value }));
        return value;
    };

    const functionAction = (text: string) => {
        // if expression contains calculation result then continue with result
        let expressionValue = expression.includes('=') ? continueWithResult() : expression;

        if (nonRepeatingOperators.includes(text)) {
            let trimmedExpression = expressionValue.trimEnd();
            let lastSymbol = trimmedExpression[trimmedExpression.length - 1];
            // if expression ends with the same operator then ignore it
            if (lastSymbol === text) {
                return;
            }
            // if expression ends with other operator then replace it
            if (nonRepeatingOperators.includes(lastSymbol)) {
                expressionValue = trimmedExpression
                    .substring(0, trimmedExpression.length - 1)
                    .trimEnd();
            }
        }

        if (expressionValue === '0' && text === '-') {
            setState({ input: '-', expression: '-' });
            return;
        }

        if (expressionValue === '') {
            expressionValue = '0';
        }

        setState({ input: '0', expression: expressionValue + ` ${text} ` });
    };

    const deleteAction = () => {
        if (expression.includes('=')) {
            continueWithResult();
        }
        setState({
            input: input.length > 1 ? input.substring(0, input.length - 1) : '0',
            expression:
                expression.length > 1
                    ? expression
                          .trimEnd()
                          .substring(0, expression.trimEnd().length - 1)
                          .trimEnd()
                    : '0',
        });
    };

    const evaluateAction = () => {
        if (expression.includes('=')) {
            return;
        }
        // If expression ends with operator then append zero
        let trimmedExpression = expression.trimEnd();
        if (
            trimmedExpression.length > 0 &&
            nonRepeatingOperators.includes(trimmedExpression[trimmedExpression.length - 1])
        ) {
            setState((prev) => ({
                ...prev,
                expression: prev.expression + '0',
            }));
        }
        let result = calculate(expression);

        setState((prev) => ({
            ...prev,
            input: `${result}`,
            expression: prev.expression + ` = ${result}`,
        }));
    };

    const onKeyPress = (key: string) => {
        if (('0' <= key && key <= '9') || key === '(' || key === ')') {
            numberAction(key);
        } else if (key === '.' || key === ',') {
            numberAction('.');
        } else if (['+', '-', '*', '/'].includes(key)) {
            functionAction(key);
        } else if (key === 'Enter' || key === '=') {
            evaluateAction();
        } else if (key === 'Backspace') {
            deleteAction();
        } else if (key === 'Clear') {
            clearAction();
        }
    };

    useEffect(() => {
        return EVENT_EMITTER.subscribe('key', (key: string) => onKeyPress(key));
    });

    const css = useStyles();

    return (
        <div className={css.container}>
            <div className={css.inputMain}>{state.input}</div>
            <div className={css.separator} />
            <div className={css.history}>{state.expression}</div>
        </div>
    );
};

export default CalculatorInput;

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
