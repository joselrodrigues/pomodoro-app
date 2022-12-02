import { interval, map, Observable, takeWhile } from 'rxjs';

import { TWO_SECONDS_IN_MS } from '../../../constants/time';

interface Method {
    padTo2Digits: (num: number) => string;
    convertMsToTimer: (milliseconds: number) => string;
    getCountObserver: () => Observable<void>;
    resetCounter: (totalTimeInMs: number) => void;
}

interface observerProps extends Method {
    time: number;
    isPaused: boolean;
}

interface resetProps extends Method {
    setTime: (totalTimeInMs: number) => void;
    setProgres: (progress: number) => void;
    setTimer: (value: string) => void;
    setPause: (isPaused: boolean | ((n: boolean) => boolean)) => void;
}

class Methods {
    constructor() {
        this.convertMsToTimer = this.convertMsToTimer.bind(this);
        this.padTo2Digits = this.padTo2Digits.bind(this);
        this.getCountObserver = this.getCountObserver.bind(this);
        this.resetCounter = this.resetCounter.bind(this);
    }

    padTo2Digits!: (num: number) => string;
    convertMsToTimer!: (milliseconds: number) => string;
    getCountObserver!: () => Observable<number>;
    resetCounter!: (totalTimeInMs: number) => void;
}

Methods.prototype.convertMsToTimer = function (milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    return `${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`;
};

Methods.prototype.padTo2Digits = function (num: number) {
    return num.toString().padStart(2, '0');
};

Methods.prototype.getCountObserver = function (this: observerProps) {
    const { time, isPaused } = this;
    return interval(1000).pipe(
        takeWhile(() => !isPaused),
        map((counter) => {
            const currentTimeInMilliseconds = time - (counter + 1) * 1000;
            return currentTimeInMilliseconds;
        }),
        takeWhile((time: number) => {
            return time > -TWO_SECONDS_IN_MS;
        }),
    );
};

Methods.prototype.resetCounter = function (
    this: resetProps,
    totalTimeInMs: number,
) {
    const { setTime, setPause, setProgres, setTimer } = this;

    setTime(totalTimeInMs);
    setProgres(1);
    setTimer(this.convertMsToTimer(totalTimeInMs));
    setPause((prev) => !prev);
};

export default Methods;
