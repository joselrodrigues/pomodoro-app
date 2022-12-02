import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export const CountDownContainer = styled(View)`
    align-items: center;
    background: rgba(213, 1, 255, 0.3);
    flex-direction: 'row';
    flex: 0.2;
    justify-content: center;
    width: 100%;
`;

export const TextTimer = styled(Text)`
    font-size: 60px;
    color: #ffffff;
`;
