import { attach, createEffect, createEvent, createStore, guard, sample } from 'effector';
import { EVENT_EMITTER } from '../hooks/useEvents';
import { calculate, roundTo } from '../model/Calculator';

export const $input = createStore('0');
export const $expression = createStore('0');
export const $result = createStore<number | null>(null);

const updateInput = createEvent<string>();
$input.on(updateInput, (_, v) => v);

const updateExpression = createEvent<string>();
$expression.on(updateExpression, (_, v) => v);

const updateResult = createEvent<number | null>();
$result.on(updateResult, (_, v) => v);

export const keyPressed = createEvent<string>();

EVENT_EMITTER.subscribe('key', (value: string) => keyPressed(value));

const numberKeyPressed = createEvent<string>();
const functionKeyPressed = createEvent<string>();
const evaluateKeyPressed = createEvent();
const deleteKeyPressed = createEvent();
const clearKeyPressed = createEvent();

// #region Map keyPressed to actions

guard({
    source: keyPressed,
    filter: (v) => ('0' <= v && v <= '9') || v === '(' || v === ')',
    target: numberKeyPressed,
});

guard({
    source: keyPressed,
    filter: (v) => v === '.' || v === ',',
    target: numberKeyPressed.prepend(() => '.'),
});

guard({
    source: keyPressed,
    filter: (v) => ['+', '-', '*', '/'].includes(v),
    target: functionKeyPressed,
});

guard({
    source: keyPressed,
    filter: (v) => v === 'Enter' || v === '=',
    target: evaluateKeyPressed,
});

guard({
    source: keyPressed,
    filter: (v) => v === 'Clear' || v === 'C',
    target: clearKeyPressed,
});

guard({
    source: keyPressed,
    filter: (v) => v === 'Backspace',
    target: deleteKeyPressed,
});

// #endregion

// #region Clear key

$input.reset(clearKeyPressed);
$expression.reset(clearKeyPressed);
$result.reset(clearKeyPressed);

// #endregion

// #region Number keys

// $input.watch((v) => console.log('Input changed to', v));

const appendToInput = createEvent<string>();
$input.on(appendToInput, (prev, value) => prev + value);

const appendToExpression = createEvent<string>();
$expression.on(appendToExpression, (prev, value) => prev + value);

const appendNumberFx = createEffect(
    (params: { input: string; expression: string; number: string }) => {
        const hasResult = params.expression.includes('=');
        let expression = hasResult ? '0' : params.expression;
        const input = hasResult ? '0' : params.input;
        const number = params.number;

        if (hasResult) {
            updateResult(null);
        }

        if (input === '0' && '0123456789()'.includes(number)) {
            updateInput(number);
            if (expression.endsWith('0')) {
                updateExpression(expression.substring(0, expression.length - 1) + number);
            } else {
                appendToExpression(number);
            }
            return;
        }
        if (input === '-' && number === '.') {
            updateInput('-0.');
            updateExpression('-0.');
            return;
        }
        if (input.includes('.') && number === '.') {
            return;
        }
        if (input === '0' && number === '.') {
            if (!expression.endsWith('0')) {
                expression += '0';
            }
        }
        updateInput(input + number);
        updateExpression(expression + number);
    },
);

sample({
    source: numberKeyPressed,
    target: attach({
        effect: appendNumberFx,
        source: { input: $input, expression: $expression },
        mapParams: (number: string, { input, expression }) => ({
            input,
            expression,
            number,
        }),
    }),
});

// #endregion

// #region Function keys

const nonRepeatingOperators = ['+', '-', '/', '*'];

const continueWithResultFx = createEffect((expression: string) => {
    if (!expression.includes('=')) {
        return;
    }
    const values = expression.split('=').map((x) => x.trim());
    const value = values[values.length - 1] ?? '0';
    updateExpression(value + ' ');
    return value;
});

// if expression contains calculation result then continue with result
sample({
    clock: functionKeyPressed,
    target: attach({
        effect: continueWithResultFx,
        source: $expression,
    }),
});

const appendOperator = createEvent<string>();
$expression.on(appendOperator, (prev, operator) => {
    let trimmedExpression = prev.trimEnd();
    if (trimmedExpression === '0' && operator === '-') {
        return '-';
    }
    const lastSymbol = trimmedExpression[trimmedExpression.length - 1];
    if (nonRepeatingOperators.includes(lastSymbol)) {
        trimmedExpression = trimmedExpression.substring(0, trimmedExpression.length - 1).trimEnd();
    }
    return trimmedExpression + ` ${operator} `;
});

guard({
    clock: functionKeyPressed,
    filter: (expression) => !expression.includes('='),
    target: appendOperator,
});

const insertMinusFx = createEffect((expression: string) => {
    if (expression.trim() === '-') {
        updateInput('-');
    }
});

guard({
    source: functionKeyPressed,
    filter: (operator) => operator === '-',
    target: attach({ effect: insertMinusFx, source: $expression }),
});

guard({
    clock: functionKeyPressed,
    source: $expression,
    filter: (expression) => expression.trim() !== '-',
    target: updateInput.prepend(() => '0'),
});

// #endregion

// #region Backspace key

$input.on(deleteKeyPressed, (prev) => {
    return prev.length > 1 ? prev.substring(0, prev.length - 1) : '0';
});
$expression.on(deleteKeyPressed, (prev) => {
    return prev.length > 1
        ? prev
              .trimEnd()
              .substring(0, prev.trimEnd().length - 1)
              .trimEnd()
        : '0';
});
$result.reset(deleteKeyPressed);

// #endregion

// #region Evaluate key

const evaluateFx = createEffect((params: { expression: string; result: number | null }) => {
    let expression = params.expression;
    if (expression.endsWith('.')) {
        expression += '0';
        appendToInput('0');
        appendToExpression('0');
    }
    const answer = calculate(expression, params.result);
    const isNum = typeof answer == 'number';
    updateInput(`${answer}`);
    updateExpression(expression + ` = ${isNum ? roundTo(answer, 10) : answer}`);
    updateResult(isNum ? answer : null);
});

sample({
    clock: evaluateKeyPressed,
    source: { expression: $expression, result: $result },
    target: evaluateFx,
});

// #endregion
