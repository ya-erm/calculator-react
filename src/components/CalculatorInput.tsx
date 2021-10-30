import React, { useCallback, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { EVENT_EMITTER } from '../hooks/useEvents';
import { calculate } from '../model/Calculator';

type ICalculatorInputProps = {};

const nonRepeatingOperators = ['+', '-', '/', '*'];

type ICalculatorState = {
    input: string;
    expression: string;
};

const CalculatorInput: React.FC<ICalculatorInputProps> = () => {
    const inputRef = useRef<string>('0');
    const expressionRef = useRef<string>('0');

    const [state, _setState] = React.useState<ICalculatorState>({
        input: '0',
        expression: '0',
    });
    const setState = (action: (prev: ICalculatorState) => ICalculatorState) => {
        _setState((prev) => {
            const newValue = action(prev);
            inputRef.current = newValue.input;
            expressionRef.current = newValue.expression;
            return newValue;
        });
    };
    // const { input, expression } = state;

    const clearAction = useCallback(() => {
        setState((prev) => ({ input: '0', expression: '0' }));
    }, []);

    const numberAction = useCallback((number: string) => {
        const inputValue = expressionRef.current.includes('=') ? '0' : inputRef.current;
        const expressionValue = expressionRef.current.includes('=') ? '0' : expressionRef.current;

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
    }, []);

    const continueWithResult = useCallback(() => {
        const values = expressionRef.current.split('=').map((x) => x.trimEnd());
        const value = values[values.length - 1] ?? '0';
        setState((prev) => ({ ...prev, expression: value }));
        return value;
    }, []);

    const functionAction = useCallback(
        (text: string) => {
            // if expression contains calculation result then continue with result
            let expressionValue = expressionRef.current.includes('=')
                ? continueWithResult()
                : expressionRef.current;

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
                setState((_) => ({ input: '-', expression: '-' }));
                return;
            }

            if (expressionValue === '') {
                expressionValue = '0';
            }

            setState((_) => ({ input: '0', expression: expressionValue + ` ${text} ` }));
        },
        [continueWithResult],
    );

    const deleteAction = useCallback(() => {
        setState((prev) => ({
            input: prev.input.length > 1 ? prev.input.substring(0, prev.input.length - 1) : '0',
            expression:
                prev.expression.length > 1
                    ? prev.expression
                          .trimEnd()
                          .substring(0, prev.expression.trimEnd().length - 1)
                          .trimEnd()
                    : '0',
        }));
    }, []);

    const evaluateAction = useCallback(() => {
        if (expressionRef.current.includes('=')) {
            return;
        }
        // If expression ends with operator then append zero
        let trimmedExpression = expressionRef.current.trimEnd();
        if (
            trimmedExpression.length > 0 &&
            nonRepeatingOperators.includes(trimmedExpression[trimmedExpression.length - 1])
        ) {
            setState((prev) => ({
                ...prev,
                expression: prev.expression + '0',
            }));
        }
        let result = calculate(expressionRef.current);

        setState((prev) => ({
            ...prev,
            input: `${result}`,
            expression: prev.expression + ` = ${result}`,
        }));
    }, []);

    const onKeyPress = useCallback(
        (key: string) => {
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
            } else if (key === 'Clear' || key === 'C') {
                clearAction();
            }
        },
        [clearAction, deleteAction, evaluateAction, functionAction, numberAction],
    );

    useEffect(() => {
        return EVENT_EMITTER.subscribe('key', (key: string) => onKeyPress(key));
    }, [onKeyPress]);

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
