import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchData } from '../api';
import { Link } from 'react-router-dom';

const CoinBox = styled(Link)`
    width: 100%;
    height: 40px;
    border: 1px solid ${(props) => props.theme.borderColor};
    display: flex;
    align-items: center;
    padding-left: 20px;
    text-decoration: none;
    &:hover {
        background-color: ${(props) => props.theme.hoverColor};
    }

    transition: 0.2s linear;
`;

const CoinName = styled.span`
    color: ${(props) => props.theme.coinNameColor};
`;

const Img = styled.img`
    width: 24px;
    border-radius: 12px;
    margin-right: 20px;
`;

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

const Container = styled.div`
    margin: 0 auto;

    max-width: 480px;
`;

function Coins() {
    const { isLoading: coinlistLoading, data: coinlistData } = useQuery<
        ICoin[]
    >(['coins'], fetchData);
    const slicedData = coinlistData?.slice(0, 1000);

    return (
        <Container>
            {coinlistLoading ? (
                <h1>Loading...</h1>
            ) : (
                slicedData?.map((coin) => {
                    return (
                        <CoinBox key={coin.id} to={`/${coin.id}`}>
                            <Img
                                src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                            />
                            <CoinName>{coin.name}</CoinName>
                        </CoinBox>
                    );
                })
            )}
        </Container>
    );
}

export default Coins;
