import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-paper';

import { TEN_MINUTS_IN_MS, TWENTY_MINUTS_IN_MS } from '../../../constants/time';
import { TimersContainer } from './index.style';

interface TimersProps {
    setTime(number: number): void;
}

const Timers: React.FC<TimersProps> = ({ setTime }) => {
    return (
        <TimersContainer>
            <TouchableOpacity onPress={() => setTime(10000)}>
                <Badge size={40} style={{ backgroundColor: 'blue' }}>
                    5
                </Badge>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTime(11000)}>
                <Badge size={40} style={{ backgroundColor: 'blue' }}>
                    10
                </Badge>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTime(TEN_MINUTS_IN_MS)}>
                <Badge size={40} style={{ backgroundColor: 'blue' }}>
                    15
                </Badge>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTime(TWENTY_MINUTS_IN_MS)}>
                <Badge size={40} style={{ backgroundColor: 'blue' }}>
                    20
                </Badge>
            </TouchableOpacity>
        </TimersContainer>
    );
};

export default Timers;
