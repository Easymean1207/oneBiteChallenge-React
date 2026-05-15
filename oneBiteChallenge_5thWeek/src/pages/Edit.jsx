import './Edit.css';

import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';

import { TransactionDispatchContext, TransactionStateContext } from '../contexts/context';

import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {
  const params = useParams();
  const navigate = useNavigate();

  const data = useContext(TransactionStateContext);
  const { onUpdate } = useContext(TransactionDispatchContext);

  const currentInput = data.find((item) => String(item.id) === String(params.id));

  const onSubmit = (input) => {
    onUpdate(params.id, input.name, input.amount, input.type, input.category, input.date);
    navigate('/', { replace: true });
  };

  return (
    <div className="Edit">
      <Header leftChild="기록 수정하기" />
      <Editor onSubmit={onSubmit} initData={currentInput} />
    </div>
  );
}

export default Edit;
