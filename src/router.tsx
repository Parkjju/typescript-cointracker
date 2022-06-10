import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Header from './components/Header';
import Coin from './components/Coin';
import Chart from './components/Chart';
import Price from './components/Price';

function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
                <Route path='/:coinId' element={<Coin />}>
                    <Route path='chart' element={<Chart />} />
                    <Route path='price' element={<Price />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
