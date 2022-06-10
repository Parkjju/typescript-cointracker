import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useRecoilState } from 'recoil';
import { modeState } from '../atom';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderBox = styled.div`
    height: 50px;
    width: 100%;
    position: absolute;
    top: 0;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    padding-left: 30px;
    display: flex;
    align-items: center;
`;
const Icon = styled.span`
    color: ${(props) => props.theme.priceColor};
    &:hover {
        cursor: pointer;
    }
    user-select: none;
    margin-right: 30px;
    &:hover {
        color: ${(props) => props.theme.hoverColor};
    }
    transition: 0.1s linear;
`;

function Header() {
    const [modeValue, setModeValue] = useRecoilState(modeState);
    const navigate = useNavigate();

    const onClick = (event: React.MouseEvent) => {
        setModeValue((current) => !current);
        modeValue
            ? (event.currentTarget.innerHTML = 'dark_mode')
            : (event.currentTarget.innerHTML = 'light_mode');
    };

    return (
        <HeaderBox>
            <Helmet>
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0'
                />
            </Helmet>
            <Icon onClick={onClick} className='material-symbols-outlined'>
                {modeValue ? 'light_mode' : 'dark_mode'}
            </Icon>
            <Icon
                onClick={() => navigate(-1)}
                className='material-symbols-outlined'
            >
                arrow_back
            </Icon>
            <Icon
                className='material-symbols-outlined'
                onClick={() => navigate(`${process.env.PUBLIC_URL}/`)}
            >
                home
            </Icon>
        </HeaderBox>
    );
}

export default Header;
