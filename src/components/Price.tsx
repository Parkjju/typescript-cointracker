import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinToday, fetchTickersData } from '../api';

interface ICoinName {
    coinId: string;
}

interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}
interface ICoinToday {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

const PriceBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const PricePeriod = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    color: ${(props) => props.theme.priceColor};
    text-align: center;
`;

const PricePeriodValue = styled(PricePeriod)``;

const UpDown = styled.span<{ upOrDown: boolean }>`
    color: ${(props) => (props.upOrDown ? 'green' : '#E15240')};
`;
const Current = styled.div`
    color: ${(props) => props.theme.priceColor};
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

function Price() {
    const { coinId } = useOutletContext<ICoinName>();
    const { isLoading, data } = useQuery<ICoinToday[]>('[todayCoin]', () =>
        fetchCoinToday(coinId)
    );

    const { isLoading: tickersLoading, data: tickersData } =
        useQuery<IPriceData>('tickersData', () => fetchTickersData(coinId));

    const open = Number(data?.slice(0)[0].open?.toFixed(6));
    const close = Number(data?.slice(0)[0].close?.toFixed(6));
    const percentage = (((open - close) / open) * 100).toFixed(6);
    const upOrDown = open - close > 0 ? true : false;

    const coinValues = [
        tickersData?.quotes?.USD?.percent_change_1h,
        tickersData?.quotes?.USD?.percent_change_24h,
        tickersData?.quotes?.USD?.percent_change_7d,
        tickersData?.quotes?.USD?.percent_change_30d,
        tickersData?.quotes?.USD?.percent_change_1y,
    ];

    return (
        <div>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <Current>
                    <span>${data?.slice(0)[0].close.toFixed(2)}</span>
                    <UpDown upOrDown={upOrDown}>({percentage}%)</UpDown>
                </Current>
            )}

            {tickersLoading ? null : (
                <PriceBox>
                    <PricePeriod>
                        <span>1h</span>
                        <span>24h</span>
                        <span>Week</span>
                        <span>Month</span>
                        <span>Year</span>
                    </PricePeriod>
                    <PricePeriodValue>
                        {coinValues.map((value) => (
                            <span
                                key={value}
                                style={{
                                    color: `${
                                        value !== undefined && value > 0
                                            ? '#42AA07'
                                            : '#E15240'
                                    }`,
                                }}
                            >
                                {value !== undefined && value > 0 ? (
                                    <span>+</span>
                                ) : null}
                                {value}%
                            </span>
                        ))}
                    </PricePeriodValue>
                </PriceBox>
            )}
        </div>
    );
}

export default Price;
