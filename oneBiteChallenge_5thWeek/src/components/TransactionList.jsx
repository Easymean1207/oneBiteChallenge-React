import './TransactionList.css';

import TransactionItem from './TransactionItem';

import { useContext, useState } from 'react';

import { TransactionStateContext } from '../contexts/context';

function TransactionList() {
  const data = useContext(TransactionStateContext);

  const [sortType, setSortType] = useState('latest');

  const onChangeSortType = (event) => {
    setSortType(event.target.value);
  };

  const getSortedData = () => {
    return data.toSorted((a, b) => {
      if (sortType === 'latest') {
        return Number(b.date) - Number(a.date);
      } else {
        return Number(a.date) - Number(b.date);
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="TransactionList">
      <div className="sorting_type">
        <select value={sortType} onChange={onChangeSortType}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
      </div>

      <div className="list_wrapper">
        {sortedData.map((item) => (
          <TransactionItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
