import './Home.css';

import TransactionList from '../components/TransactionList';
import Header from '../components/Header';
import Button from '../components/Button';

import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="Home">
      <Header
        leftChild="한입 가계부"
        rightChild={<Button text="+ 작성하기" onClick={() => navigate('/new')} />}
      />
      <TransactionList />
    </div>
  );
}

export default Home;
