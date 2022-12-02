import { AppDispatch } from '../../store';
import { addCurrentTask } from '../../store/focusSlice';

interface Method {
    handleOnPress: () => void;
}

interface HandleOnPressProps {
    dispatch: AppDispatch;
    setFocus: (focus: string) => void;
    focus: string;
}

interface HandleOnFinishProps {
    setTime: (time: number) => void;
    setIsPaused: (isPaused: boolean) => void;
}

class Methods implements Method {
    constructor() {
        this.handleOnPress = this.handleOnPress.bind(this);
        this.handleOnFinish = this.handleOnFinish.bind(this);
    }
    handleOnPress!: () => void;
    handleOnFinish!: () => void;
}

Methods.prototype.handleOnPress = function handleOnPress(
    this: HandleOnPressProps,
) {
    const { dispatch, setFocus, focus } = this;

    dispatch(addCurrentTask(focus));
    setFocus('');
};

Methods.prototype.handleOnFinish = function handleOnFinish(
    this: HandleOnFinishProps,
) {
    const { setIsPaused } = this;
    setIsPaused(true);
};

export default Methods;
