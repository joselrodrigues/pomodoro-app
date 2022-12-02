import { act, render, screen } from '@testing-library/react-native';
import React from 'react';

import { TEN_SECONDS_IN_MS, TWO_SECONDS_IN_MS } from '../../../constants/time';
import CountDown from './';
import Methods from './index.methods';

jest.useFakeTimers();

describe('CountDown', () => {
    const setProgres = jest.fn();
    const onFinish = jest.fn();
    beforeEach(() => {
        render(
            <CountDown
                isPaused={false}
                totalTimeInMs={TEN_SECONDS_IN_MS}
                setProgres={setProgres}
                onFinish={onFinish}
            />,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should display the elapsed time', () => {
        act(() => {
            jest.advanceTimersByTime(TWO_SECONDS_IN_MS);
        });

        const { convertMsToTimer } = Object.assign(new Methods(), {});
        const actual = screen.getByTestId('displayTimer');
        const expected = convertMsToTimer(
            TEN_SECONDS_IN_MS - TWO_SECONDS_IN_MS,
        );

        expect(actual).toHaveTextContent(expected);
    });

    it('should reset after finish', () => {
        act(() => {
            jest.advanceTimersByTime(TWO_SECONDS_IN_MS);
        });

        const { convertMsToTimer } = Object.assign(new Methods(), {});
        const actual = screen.getByTestId('displayTimer');
        let expected = convertMsToTimer(TEN_SECONDS_IN_MS - TWO_SECONDS_IN_MS);

        expect(actual).toHaveTextContent(expected);

        act(() => {
            jest.runAllTimers();
        });

        expected = convertMsToTimer(TEN_SECONDS_IN_MS);

        expect(actual).toHaveTextContent(expected);
    });

    it('should not reset after finish if resetOnFinish prop is false', () => {
        render(
            <CountDown
                isPaused={false}
                totalTimeInMs={TEN_SECONDS_IN_MS}
                setProgres={setProgres}
                resetOnFinish={false}
            />,
        );

        act(() => {
            jest.runAllTimers();
        });

        const { convertMsToTimer } = Object.assign(new Methods(), {});
        const actual = screen.getByTestId('displayTimer');
        const expected = convertMsToTimer(0);

        expect(actual).toHaveTextContent(expected);
    });

    it('should not start if it is paused', () => {
        render(
            <CountDown
                isPaused={true}
                totalTimeInMs={TEN_SECONDS_IN_MS}
                setProgres={setProgres}
                resetOnFinish={false}
            />,
        );

        act(() => {
            jest.advanceTimersByTime(TWO_SECONDS_IN_MS);
        });

        const { convertMsToTimer } = Object.assign(new Methods(), {});
        const actual = screen.getByTestId('displayTimer');
        const expected = convertMsToTimer(TEN_SECONDS_IN_MS);

        expect(actual).toHaveTextContent(expected);
    });

    it('should call onFinish after reaching zero', () => {
        act(() => {
            jest.runAllTimers();
        });

        expect(onFinish).toHaveBeenCalled();
    });

    it('should save the progress', () => {
        act(() => {
            jest.advanceTimersByTime(TWO_SECONDS_IN_MS);
        });

        const actual = setProgres.mock.calls.length;
        const expected = 3;

        expect(actual).toBe(expected);
    });
});
