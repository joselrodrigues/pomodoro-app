import React, { useEffect, useState } from 'react';
import { Dimensions, Text } from 'react-native';
import { MD3Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import CountDown from '../../components/atoms/countdown';
import Timers from '../../components/molecules/timers';
import { RootState } from '../../store';
import Methods from './index.methods';
import { ProgressBarWrapper, StartButtom } from './index.style';

const Focus = () => {
    const ProgressWidth = Dimensions.get('window').width;

    const [isPaused, setIsPaused] = useState(false);
    const [time, setTime] = useState(6000);
    const [focus, setFocus] = useState<string>('');
    const [progress, setProgress] = useState(1);
    const { currentTask } = useSelector((state: RootState) => state.focus);
    const dispatch = useDispatch();
    const { handleOnPress, handleOnFinish } = Object.assign(new Methods(), {
        dispatch,
        setTime,
        setFocus,
        setIsPaused,
        focus,
    });
    useEffect(() => {
        setIsPaused(true);
    }, [time]);
    return (
        <>
            <CountDown
                setProgres={setProgress}
                isPaused={isPaused}
                totalTimeInMs={time}
                onFinish={handleOnFinish}
            />
            <ProgressBarWrapper
                progress={progress}
                width={ProgressWidth}
                color={MD3Colors.error10}
            />
            <Timers setTime={setTime} />
            <StartButtom
                style={{ width: 90 }}
                onPress={() => setIsPaused((prev) => !prev)}
            >
                <Text>{isPaused ? 'START' : 'STOP'}</Text>
            </StartButtom>
            {/* <InputFocusContainer>
                <FocusInput
                    label="What would you like to focus on?"
                    value={focus}
                    onChangeText={setFocus}
                />
                <Button onPress={handleOnPress} />
            </InputFocusContainer> */}
        </>
    );
};

export default Focus;
