import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [cost, setCost] = useState(1);
  const [money, setMoney] = useState(1);
  const onSelect = (event) => {
    setCost(event.target.value);
    setMoney(1); // 초기화
  };
  const onChangeInput = (event) => {
    setMoney(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The coins!{loading ? "" : `(${coins.length} coins)`}</h1>
      <h2>Select Coin!</h2>
      {loading ? (
        <strong>loading...</strong>
      ) : (
        <select onChange={onSelect}>
          <option>Select Coin!</option>
          {coins.map((coin, index) => (
            <option
              key={index}
              value={coin.quotes.USD.price}
              id={coin.symbol}
              symbol={coin.symbol}
            >
              {coin.name}({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <h2>Enter the USD you want to purchase Coin</h2>
      <div>
        <input
          type="number"
          value={money}
          onChange={onChangeInput}
          placeholder="dollor"
        />
        $
      </div>
      <h2>You can get {money / cost} Coins </h2>
    </div>
  );
}
export default App;
