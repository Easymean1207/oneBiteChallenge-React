function Header({ EXCHANGE_RATE }) {
    return (
        <div>
            <h1>환율 변환기(KRW-USD)</h1>
            <p>현재 환율: 1 USD = {EXCHANGE_RATE} KRW</p>
        </div>
    )
}

export default Header