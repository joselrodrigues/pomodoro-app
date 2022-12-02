import { View } from 'react-native';
import { ProgressBar, TextInput } from 'react-native-paper';
import styled from 'styled-components';

import Button from '../../components/atoms/button';

interface ProgressBarExtend {
    width: number;
}

type value = typeof ProgressBar & ProgressBarExtend;

export const InputFocusContainer = styled(View)`
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
`;

export const FocusInput = styled(TextInput)`
    flex: 1;
    margin-right: 10px;
`;

export const ProgressBarWrapper = styled(ProgressBar)<value>`
    height: 30px;
    background-color: rgba(130, 30, 149, 0.3);
`;

export const StartButtom = styled(Button)`
    width: 90px;
`;
