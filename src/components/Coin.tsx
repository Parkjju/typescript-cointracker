import { useQuery } from 'react-query';
import { fetchCoinInfoData } from '../api';
import { useParams, Link, Outlet, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const Img = styled.img`
    width: 50px;
    border-radius: 25px;
    margin-right: 20px;
`;

const Container = styled.div`
    margin: 0 auto;
    max-width: 480px;
    color: ${(props) => props.theme.coinNameColor};
`;

const InfoFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const InfoHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const InfoHeaderCoinName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 40px;

    span {
        font-size: 20px;
        color: ${(props) => props.theme.priceColor};
        font-weight: bold;
    }
`;

const Tap = styled.div<{ isActive: boolean }>`
    font-size: 16px;
    line-height: 26px;
    font-weight: bold;
    &:hover {
        a {
            color: ${(props) => props.theme.hoverColor};
        }
    }
    a {
        color: ${(props) => props.theme.priceColor};
        text-decoration: none;
        transition: 0.1s linear;
    }
    width: 45%;
    text-align: center;
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 10px;
`;

const InfoHeaderRank = styled.div`
    height: 40px;
    color: ${(props) => props.theme.coinNameColor};
    font-size: 20px;
    font-weight: bold;

    span {
        margin-right: 10px;
    }
`;
const InfoBody = styled.div`
    color: ${(props) => props.theme.priceColor};
`;
interface ICoinInfo {
    id: string;
    name: string;
    symbol: string;
    description: string;
    started_at: string;
    first_data_at: string;
    last_data_at: string;
    rank: number;
}

function Coin() {
    const { coinId } = useParams();
    const chartURLMatch = useMatch('/:coinId/chart');
    const priceURLMatch = useMatch('/:coinId/price');

    const { isLoading: coinInfoLoading, data: coinInfoData } =
        useQuery<ICoinInfo>('[coinInfo]', () => fetchCoinInfoData(coinId));

    return (
        <Container>
            <Helmet>
                <title>{coinInfoData?.name}</title>
            </Helmet>
            {coinInfoLoading ? (
                <h1>Loading...</h1>
            ) : (
                <InfoHeader>
                    <Img
                        src={`https://coinicons-api.vercel.app/api/icon/${coinInfoData?.symbol.toLowerCase()}`}
                    />
                    <InfoHeaderCoinName>
                        <span>{coinInfoData?.name}</span>

                        <InfoHeaderRank>
                            <span>${coinInfoData?.symbol}</span>
                            rank {coinInfoData?.rank}
                        </InfoHeaderRank>
                    </InfoHeaderCoinName>
                </InfoHeader>
            )}
            <hr />
            {coinInfoLoading ? null : (
                <InfoBody>{coinInfoData?.description}</InfoBody>
            )}
            <hr />
            {coinInfoLoading ? null : (
                <InfoFooter>
                    <Tap isActive={chartURLMatch !== null}>
                        <Link to='chart'>CHART</Link>
                    </Tap>
                    <Tap isActive={priceURLMatch !== null}>
                        <Link to='price'>PRICE</Link>
                    </Tap>
                </InfoFooter>
            )}
            <hr />
            <Outlet context={{ coinId: coinInfoData?.id }} />
        </Container>
    );
}

export default Coin;
