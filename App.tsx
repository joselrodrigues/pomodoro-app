import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import { SafeAreaViewContainer } from './App.style';
import Focus from './src/screen/focus';
import { store } from './src/store';

export default function App() {
    return (
        <PaperProvider>
            <ReduxProvider store={store}>
                <SafeAreaViewContainer>
                    <Focus />
                </SafeAreaViewContainer>
            </ReduxProvider>
        </PaperProvider>
    );
}
