import React, { PropsWithChildren } from 'react';
import { StyleProp, Text, ViewStyle } from 'react-native';

import { TouchableContainer } from './index.style';

interface ButtonProps extends PropsWithChildren {
    style?: StyleProp<ViewStyle>;
    onPress(): void;
}

const Button: React.FC<ButtonProps> = (
    { children, style, onPress },
    ...props
) => {
    return (
        <TouchableContainer style={style} {...props} onPress={onPress}>
            {children}
        </TouchableContainer>
    );
};

export default Button;
