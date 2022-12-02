import React, { useEffect, useState } from 'react';

import Methods from './index.methods';
import { CountDownContainer, TextTimer } from './index.style';

const SIX_MILISECONDS = 10 * 1000;

interface CountDownProps {
    totalTimeInMs: number;
    isPaused: boolean;
    onFinish?(): void;
    setProgres(number: number): void;
    resetOnFinish?: boolean;
}

const CountDown: React.FC<CountDownProps> = ({
    isPaused,
    onFinish,
    resetOnFinish = true,
    setProgres,
    totalTimeInMs,
}) => {
    const [time, setTime] = useState(totalTimeInMs);
    const [pause, setPause] = useState(isPaused);
    const [timer, setTimer] = useState('00:00');
    const { convertMsToTimer, getCountObserver, resetCounter } = Object.assign(
        new Methods(),
        { isPaused, time, setTime, setPause, setTimer, setProgres },
    );

    useEffect(() => {
        setTimer(convertMsToTimer(time));
    }, []);

    useEffect(() => {
        const sub$ = getCountObserver().subscribe((timeLeft) => {
            if (timeLeft >= 0) {
                setProgres(timeLeft / totalTimeInMs);
                setTimer(convertMsToTimer(timeLeft));
                setTime((prev) => prev - 1000);
            } else {
                onFinish?.();
                resetOnFinish && resetCounter(totalTimeInMs);
            }
        });
        return () => {
            return sub$.unsubscribe();
        };
    }, [isPaused, pause]);

    useEffect(() => {
        resetCounter(totalTimeInMs);
    }, [totalTimeInMs]);

    return (
        <CountDownContainer>
            <TextTimer testID="displayTimer">{timer}</TextTimer>
        </CountDownContainer>
    );
};

export default CountDown;
