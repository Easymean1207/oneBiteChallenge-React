import './App.css';
import Header from './components/Header';
import ConverterForm from './components/ConverterForm';
import Button from './components/Button';
import { useState } from 'react';

const EXCHANGE_RATE = 1400;

function App() {
  const [balance, setBalance] = useState({
    krw: 0,
    usd: 0,
  });

  const onChangeHandler = (currency, value) => {
    if (currency === 'krw') {
      setBalance({
        krw: value,
        usd: value / EXCHANGE_RATE,
      });
    } else {
      setBalance({
        krw: value * EXCHANGE_RATE,
        usd: value,
      });
    }
  };

  const onResetHandler = () => {
    setBalance({
      krw: 0,
      usd: 0,
    });
  };

  return (
    <div className="App">
      <Header EXCHANGE_RATE={EXCHANGE_RATE} />
      <ConverterForm currency={Object.keys(balance)[0]} value={balance[Object.keys(balance)[0]]} onChange={onChangeHandler} />
      <ConverterForm currency={Object.keys(balance)[1]} value={balance[Object.keys(balance)[1]]} onChange={onChangeHandler} />
      <Button onClick={onResetHandler} />
    </div>
  );
}

export default App;
