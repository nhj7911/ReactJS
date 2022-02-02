import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json); // coin(json) 받아서 coins에 넣기
        setLoading(false); // coin 받았으니 loading false로 변환
      });
  }, []); // 컴포넌트 시작시에 1번만 API 받아옴
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => {
            <option>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>;
          })}
        </select>
      )}
    </div>
  );
}

export default App;
