import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CalculatorKeyboard from './CalculatorKeyboard';
import { EVENT_EMITTER } from '../hooks/useEvents';

const numbers = [...Array(10)].map((_, i) => `${i}`);
const operators = ['/', '*', '+', '-'];
const punctuation = ['(', ')', '.'];
const actions = ['C', '='];
const allButtons = [...numbers, ...operators, ...punctuation, ...actions];

const BUTTONS_COUNT = 19;

test(`all ${BUTTONS_COUNT} buttons will be checked`, () => {
    expect(allButtons.length).toBe(BUTTONS_COUNT);
});

test(`keyboard should have ${BUTTONS_COUNT} buttons`, () => {
    render(<CalculatorKeyboard />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(BUTTONS_COUNT);
});

test('all number buttons should be rendered', () => {
    render(<CalculatorKeyboard />);
    numbers.forEach((item) => {
        const button = screen.getByText(item);
        expect(button).toBeInTheDocument();
    });
});

test('all buttons should be rendered and have labels', () => {
    render(<CalculatorKeyboard />);
    allButtons.forEach((item) => {
        const button = screen.getByLabelText(item);
        expect(button).toBeInTheDocument();
    });
});

test('click to any button should emit key event', () => {
    render(<CalculatorKeyboard />);
    allButtons.forEach((item) => {
        const button = screen.getByLabelText(item);
        let received: string | null = null;
        const unsubscribe = EVENT_EMITTER.subscribe('key', (data: string) => {
            received = data;
            unsubscribe();
        });
        fireEvent.click(button);
        expect(received).toBe(item);
    });
});
