import ApexCharts from 'react-apexcharts';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import { useQuery } from 'react-query';
import { modeState } from '../atom';
import { useRecoilValue } from 'recoil';

interface ICoinName {
    coinId: string;
}

interface IHistory {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart() {
    const { coinId } = useOutletContext<ICoinName>();
    const mode = useRecoilValue(modeState);

    const { isLoading, data } = useQuery<IHistory[]>('[coinHistory]', () =>
        fetchCoinHistory(coinId)
    );

    return (
        <div>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <ApexCharts
                    type='candlestick'
                    series={[
                        {
                            data: data?.map((item) => [
                                new Date(item.time_close).getTime(),
                                item.open.toFixed(3),
                                item.high.toFixed(3),
                                item.low.toFixed(3),
                                item.close.toFixed(3),
                            ]) as [],
                        },
                    ]}
                    options={{
                        theme: {
                            mode: mode ? 'dark' : 'light',
                        },
                        chart: {
                            type: 'candlestick',
                            height: 350,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: 'transparent',
                        },
                        stroke: {
                            curve: 'smooth',
                            width: 2,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            type: 'datetime',
                            categories: data?.map((price) => price.time_close),
                            labels: {
                                style: {
                                    colors: '#9c88ff',
                                },
                            },
                        },
                        plotOptions: {
                            candlestick: {
                                colors: {
                                    upward: '#3C90EB',
                                    downward: '#DF7D46',
                                },
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}

export default Chart;
