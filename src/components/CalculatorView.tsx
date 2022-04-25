import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { ReactComponent as BackspaceIcon } from '../assets/icons/backspace.svg';
import { keyPressed } from '../model';
import { ActionButton, BUTTON_FULL_SIZE } from './CalculatorButton';
import CalculatorHeader from './CalculatorHeader';
import CalculatorKeyboard from './CalculatorKeyboard';

type ICalculatorViewProps = {};

const CalculatorView: React.FC<ICalculatorViewProps> = () => {
    const css = useStyles();
    const windowSize = Math.min(window.innerWidth, window.innerHeight);

    useEffect(() => {
        // Disable scroll on mobile devices
        document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

        // Keyboard input
        window.addEventListener('keydown', (e: KeyboardEvent) => keyPressed(e.key));

        // Clear at render
        keyPressed('Clear');
    }, []);

    return (
        <div className={css.container}>
            <div style={{ width: Math.min(4 * BUTTON_FULL_SIZE, windowSize) }}>
                <div className={css.calculatorInput}>
                    <CalculatorHeader />
                    <div className={css.backspace}>
                        <ActionButton
                            text="Backspace"
                            icon={<BackspaceIcon />}
                            onPress={() => keyPressed('Backspace')}
                        />
                    </div>
                </div>
                <CalculatorKeyboard />
            </div>
        </div>
    );
};

export default CalculatorView;

const useStyles = createUseStyles({
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calculatorInput: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
    },
    backspace: {
        flexShrink: 0,
    },
});
