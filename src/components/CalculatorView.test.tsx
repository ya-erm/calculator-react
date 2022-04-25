import { fireEvent, render, screen } from '@testing-library/react';
import CalculatorView from './CalculatorView';

const numbers = [...Array(10)].map((_, i) => `${i}`);

function press(text: string) {
    fireEvent.click(screen.getByLabelText(text));
}

function input(text: string) {
    const t = text.replaceAll(' ', '');
    for (let i = 0; i < t.length; i++) {
        press(t[i]);
    }
}

function getResult() {
    return screen.getByLabelText('input').innerHTML;
}

function getHistory() {
    return screen.getByLabelText('history').innerHTML;
}

function checkResult(expected: string) {
    const actual = getResult();
    expect(actual).toBe(expected);
}

function checkHistory(expected: string) {
    const actual = getHistory();
    expect(actual).toBe(expected);
}

function checkHistoryResult(expected: string) {
    const history = getHistory();
    const parts = history.split('=');
    expect(parts.length).toBe(2);
    const actual = parts[1].trim();
    expect(actual).toBe(expected);
}

function check(result: string, history: string) {
    checkResult(result);
    checkHistoryResult(result);
    checkHistory(history);
}

test('2 + 2 = 4', () => {
    render(<CalculatorView />);
    input('2 + 2 =');
    check('4', '2 + 2 = 4');
});

test('0.1 * 0.2 = 0.02', () => {
    render(<CalculatorView />);
    input('0.1 * 0.2 =');
    check('0.02', '0.1 * 0.2 = 0.02');
});

test('10 / 3 * 3 = 10', () => {
    render(<CalculatorView />);
    input('10 / 3 * 3 =');
    checkResult('10');
    checkHistoryResult('10');
});

test('10 / 3, then result * 3 = 10', () => {
    render(<CalculatorView />);
    input('10 / 3 =');
    input('* 3 =');
    checkHistoryResult('10');
});

test('Calculator should rendered with "0" in input and "0" in history', () => {
    render(<CalculatorView />);
    checkResult('0');
    checkHistory('0');
});

test('Press "C" should clear input and history', () => {
    render(<CalculatorView />);
    press('5');
    press('C');
    checkResult('0');
    checkHistory('0');
});

test('If first press number 1-9, "0" should be replaced by number', () => {
    render(<CalculatorView />);
    numbers.forEach((n) => {
        press(n);
        checkResult(n);
        checkHistory(n);
        press('C');
    });
});

test('If first press is ".", it should be replaced by "0."', () => {
    render(<CalculatorView />);
    press('.');
    checkResult('0.');
    checkHistory('0.');
});

test('Press "0" twice, "0" should not be repeated', () => {
    render(<CalculatorView />);
    checkResult('0');
    press('0');
    press('0');
    checkResult('0');
});

test('Press "." twice, "." should not be repeated', () => {
    render(<CalculatorView />);
    press('.');
    press('.');
    checkResult('0.');
});

test('If input contains ".", second "." should be ignored', () => {
    render(<CalculatorView />);
    input('0.25');
    press('.');
    checkResult('0.25');
});

test('If history has result, input number or brackets should clear result', () => {
    render(<CalculatorView />);
    [...numbers, '(', ')'].forEach((n) => {
        input('2 + 2 =');
        press(n);
        checkResult(n);
        checkHistory(n);
        press('C');
    });
});

test('If history has result and pressed number, stored result should be cleared and do not affect next calculation', () => {
    render(<CalculatorView />);
    input('2 + 2 =');
    input('1 + 1 =');
    check('2', '1 + 1 = 2');
});

test('If history has result, calculation can be continued with +,-,*,/', () => {
    const cases: { in: string; res: string; his: string }[] = [
        { in: ' + 2 =', res: '6', his: '4 + 2 = 6' },
        { in: ' - 1 =', res: '3', his: '4 - 1 = 3' },
        { in: ' * 2 =', res: '8', his: '4 * 2 = 8' },
        { in: ' / 2 =', res: '2', his: '4 / 2 = 2' },
    ];
    render(<CalculatorView />);
    cases.forEach((item) => {
        input('2 + 2 =');
        input(item.in);
        checkResult(item.res);
        checkHistoryResult(item.res);
        checkHistory(item.his);
        press('C');
    });
});

test('If history has result, press "." should clear result and start with "0."', () => {
    render(<CalculatorView />);
    input('2 + 2 =');
    press('.');
    checkResult('0.');
    checkHistory('0.');
});

test('If history ends with any operator, it can be changed to any other operator', () => {
    const operators = ['+', '-', '*', '/'];
    render(<CalculatorView />);
    operators.forEach((o1) => {
        operators.forEach((o2) => {
            press('2');
            press(o1);
            press(o2);
            checkHistory(`2 ${o2} `);
            press('C');
        });
    });
});

test('If first press is "-", "0" should be replaced by "-"', () => {
    render(<CalculatorView />);
    press('-');
    checkResult('-');
    checkHistory('-');
});

test('-.5 should be converted to -0.5', () => {
    render(<CalculatorView />);
    press('-');
    press('.');
    press('5');
    checkResult('-0.5');
    checkHistory('-0.5');
});

test('2+.5 should be converted to 2 + 0.5', () => {
    render(<CalculatorView />);
    input('2 + . 5');
    checkResult('0.5');
    checkHistory('2 + 0.5');
    press('=');
    check('2.5', '2 + 0.5 = 2.5');
});

test('0 = 0, 1 = 1, etc...', () => {
    render(<CalculatorView />);
    numbers.forEach((n) => {
        press(n);
        press('=');
        check(n, `${n} = ${n}`);
        press('C');
    });
});

test('Press "." and "=" should be replaced by 0.0 = 0', () => {
    render(<CalculatorView />);
    press('.');
    press('=');
    check('0', '0.0 = 0');
});

test('1.0 = 1, 2.0 = 2, etc', () => {
    render(<CalculatorView />);
    numbers.forEach((n) => {
        press(n);
        press('.');
        press('=');
        check(n, `${n}.0 = ${n}`);
        press('C');
    });
});

test('Backspace delete last symbol at input', () => {
    render(<CalculatorView />);
    input('123');
    press('Backspace');
    checkResult('12');
});

test('Backspace delete last symbol at history', () => {
    render(<CalculatorView />);
    input('2 + 2 =');
    check('4', '2 + 2 = 4');
    press('Backspace');
    checkResult('0');
    checkHistory('2 + 2 =');
});

test('5 * 5 = 25, then backspace all and 2 + 2 = 4', () => {
    render(<CalculatorView />);
    input('5 * 5 =');
    check('25', '5 * 5 = 25');
    // clear all
    for (let i = 0; i < 6; i++) {
        press('Backspace');
    }
    checkResult('0');
    checkHistory('0');
    // second input
    input('2 + 2 =');
    check('4', '2 + 2 = 4');
});

test('0.000 should display as 0.000 during input 0.0005', () => {
    render(<CalculatorView />);
    input('0.000');
    checkResult('0.000');
    input('5');
    checkResult('0.0005');
});

test('1000 should be displayed with a space, like 1 000', () => {
    render(<CalculatorView />);
    input('1000');
    checkResult('1 000');
});

test('1000000 should be displayed with spaces, like 1 000 000', () => {
    render(<CalculatorView />);
    input('1000000');
    checkResult('1 000 000');
});

test('1000.0001 should be displayed as 1 000.0001', () => {
    render(<CalculatorView />);
    input('1000.0001');
    checkResult('1 000.0001');
});

test('0.000001 should be displayed without spaces', () => {
    render(<CalculatorView />);
    input('0.000001');
    checkResult('0.000001');
});
