import { CalculationToken } from './CalculationToken';

class CalculatorError extends Error {
    message: string;
    position?: number;
    constructor(message: string, position?: number) {
        super();
        this.message = message;
        this.position = position;
    }
}

const parse: (expression: string) => CalculationToken[] = (expression) => {
    let tokens: CalculationToken[] = [];
    let previous: CalculationToken | null = null;
    let numberChars: string[] = [];
    let bracketsCount = 0;
    let unary = false;

    const checkToken = (token: CalculationToken, position: number) => {
        if (!previous) {
            if (!token.canBeFirst()) {
                throw new CalculatorError(`Token ${token} can't be first`, position);
            }
        } else if (!token.canBeAfter(previous)) {
            throw new CalculatorError(`Token ${token} can't be after ${previous.type}`, position);
        }
        if (position === expression.length - 1 && !token.canBeLast()) {
            throw new CalculatorError(`Token ${token} can't be last`, position);
        }
    };

    const processNumber = (position: number) => {
        let numberText = numberChars.join('');
        if (previous?.type === 'minus' && unary) {
            numberText = `-${numberText}`;
            tokens.pop();
            previous = null;
            unary = false;
        }
        const numberToken = CalculationToken.parse(numberText);
        if (!numberToken) {
            throw new CalculatorError(
                `Failed to initialize number token from "${numberText}"`,
                position,
            );
        }
        checkToken(numberToken, position);
        tokens.push(numberToken);
        previous = numberToken;
        numberChars = [];
    };

    for (let i = 0; i < expression.length; i++) {
        const symbol = expression[i];
        if (symbol === ' ') {
            continue;
        }
        if (symbol.match(/\d/) || symbol === '.') {
            numberChars.push(symbol);
            continue;
        }
        if (numberChars.length > 0) {
            processNumber(i);
        }
        const token = CalculationToken.parse(symbol);
        if (!token) {
            throw new CalculatorError(`Unsupported symbol "${symbol}"`, i);
        }
        switch (token.type) {
            case 'minus':
                switch (previous?.type) {
                    case 'leftBracket':
                    case 'pow':
                    case null:
                    case undefined:
                        unary = true;
                        break;
                    default:
                        unary = false;
                        break;
                }
                break;
            case 'leftBracket':
                bracketsCount += 1;
                break;
            case 'rightBracket':
                bracketsCount -= 1;
                break;
            default:
                break;
        }
        if (bracketsCount < 0) {
            throw new CalculatorError('Closed brackets more than opened', i);
        }
        checkToken(token, i);
        tokens.push(token);
        previous = token;
    }
    if (numberChars.length > 0) {
        processNumber(expression.length - 1);
    }
    if (bracketsCount > 0) {
        throw new CalculatorError('Opened brackets more than closed', expression.length - 1);
    }

    return tokens;
};

const performOperation = (operationToken: CalculationToken, left: number, right: number) => {
    switch (operationToken.type) {
        case 'plus':
            return left + right;
        case 'minus':
            return left - right;
        case 'multiply':
            return left * right;
        case 'divide':
            return left / right;
        case 'mod':
            return left % right;
        case 'pow':
            return Math.pow(left, right);
        case 'leftBracket':
        case 'rightBracket':
        case 'number':
            throw Error(`${operationToken.type} is not operationToken`);
    }
};

export const calculate = (expression: string, previous: number | null) => {
    try {
        let leftStack: CalculationToken[] = [];
        let rightStack = parse(expression);
        let accumulator: number | null = null;

        if (previous) {
            rightStack[0] = new CalculationToken('number', previous.toString());
        }

        const scroll = () => {
            const accumulatedValue = accumulator;
            if (accumulatedValue !== null) {
                const newToken = new CalculationToken('number', accumulatedValue.toString());
                leftStack = [newToken, ...leftStack];
                accumulator = null;
            }
            do {
                if (rightStack.length === 0) {
                    return;
                }
                const token = rightStack.shift();
                if (!token) {
                    return;
                }
                switch (token.type) {
                    case 'number':
                        accumulator = parseFloat(token.value!);
                        return;
                    default:
                        leftStack = [token, ...leftStack];
                        break;
                }
            } while (true);
        };

        scroll();
        while (true) {
            let leftToken = leftStack[0];
            const rightToken = rightStack[0];
            let delta = (leftToken?.leftPriority() ?? 0) - (rightToken?.rightPriority() ?? 0);
            if (leftToken && delta > 0) {
                const operation = leftStack.shift();
                const leftOperand = leftStack.shift();
                if (!operation || !leftOperand) {
                    return;
                }
                switch (leftOperand.type) {
                    case 'number':
                        const value = parseFloat(leftOperand.value!);
                        const result = performOperation(operation, value, accumulator ?? 0);
                        accumulator = result;
                        leftToken = leftStack[0];
                        delta =
                            (leftToken?.leftPriority() ?? 0) - (rightToken?.rightPriority() ?? 0);
                        break;
                    default:
                        throw new Error(`Left operand ${leftOperand.type} is not number`);
                }
            }
            if (rightToken && rightToken?.type !== 'number' && delta < 0) {
                scroll();
            }
            if (leftToken?.type === 'leftBracket' && rightToken?.type === 'rightBracket') {
                leftStack.shift();
                rightStack.shift();
            }
            if (leftStack.length === 0 && rightStack.length === 0) {
                break;
            }
        }

        return accumulator;
    } catch (error) {
        console.log(error);
        return 'Error';
    }
};

export function roundTo(n: number, digits?: number) {
    let negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = -1 * n;
    }
    let m = Math.pow(10, digits);
    let r = parseFloat((n * m).toFixed(11));
    r = Number((Math.round(r) / m).toFixed(digits));
    if (negative) {
        r = -1 * r;
    }
    return r;
}
