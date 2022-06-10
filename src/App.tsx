import Router from './router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import GlobalStyle from './components/Global';
import { modeState } from './atom';
import { useRecoilValue } from 'recoil';

function App() {
    const currentMode = useRecoilValue(modeState);
    return (
        <>
            <ThemeProvider theme={currentMode ? lightTheme : darkTheme}>
                <GlobalStyle />
                <Router></Router>
                <ReactQueryDevtools initialIsOpen={true} />
            </ThemeProvider>
        </>
    );
}

export default App;
