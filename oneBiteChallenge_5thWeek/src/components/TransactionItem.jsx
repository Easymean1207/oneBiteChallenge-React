import './TransactionItem.css';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { TransactionDispatchContext } from '../contexts/context';
import { getStringedDate } from '../util/get-stringed-date';

const categoryLabelMap = {
  food: '🍱식비',
  transport: '🚌교통비',
  living: '🏠생활비',
  entertain: '🎬문화/여가',
  salary: '💰급여',
  pocket: '🪙용돈',
  other: '📦기타',
};

function TransactionItem({ id, name, amount, type, category, date }) {
  const navigate = useNavigate();

  const { onDelete } = useContext(TransactionDispatchContext);

  const onClickDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까? 다시 복구할 수 없습니다!')) {
      // 일기 삭제 로직
      onDelete(id);
    }
  };

  return (
    <div className="TransactionItem">
      <div className="category">{categoryLabelMap[category] ?? category}</div>
      <div className="name">{name}</div>
      <div className={`amount ${type === 'income' ? 'amount_income' : 'amount_expense'}`}>
        {type === 'income' ? '+' : '-'}
        {amount.toLocaleString()}원
      </div>
      <div className="date">{getStringedDate(date)}</div>
      <div className="button_container">
        <div className="edit_button" onClick={() => navigate(`/edit/${id}`)}>
          수정
        </div>
        <div className="delete_button" onClick={onClickDelete}>
          삭제{' '}
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;
