const baseURL = 'https://api.coinpaprika.com/v1/';

export function fetchData() {
    const endpoint = 'coins';
    return fetch(`${baseURL}${endpoint}`).then((response) => response.json());
}

export function fetchCoinInfoData(coinId?: string) {
    return fetch(`${baseURL}coins/${coinId}`).then((response) =>
        response.json()
    );
}

export function fetchCoinHistory(coinId?: string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24;

    return fetch(
        `${baseURL}coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
    ).then((response) => response.json());
}

export function fetchCoinToday(coinId?: string) {
    return fetch(`${baseURL}coins/${coinId}/ohlcv/today/`).then((response) =>
        response.json()
    );
}

export function fetchTickersData(coinId?: string) {
    return fetch(`${baseURL}tickers/${coinId}`).then((response) =>
        response.json()
    );
}
