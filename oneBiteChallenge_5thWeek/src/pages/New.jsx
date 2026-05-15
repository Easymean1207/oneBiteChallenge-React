import './New.css';

import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';

import {TransactionDispatchContext} from '../contexts/context';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function New() {
  const navigate = useNavigate();

  const { onCreate } = useContext(TransactionDispatchContext);

  const onSubmit = (input) => {
    onCreate(input.name, input.amount, input.type, input.category, input.date);
    navigate('/', { replace: true });
  };

  return (
    <div className="New">
      <Header leftChild="새로운 기록" />
      <Editor onSubmit={onSubmit} />
    </div>
  );
}

export default New;
