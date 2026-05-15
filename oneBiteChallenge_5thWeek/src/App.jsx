import './App.css';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';

import { TransactionStateContext, TransactionDispatchContext } from './contexts/context';

import { useReducer, useRef, useCallback, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. '/' : 모든 거래 내역을 보여주는 Home 페이지
// 2. '/new' : 새로운 거래 내역을 추가하는 New 페이지
// 3. '/edit/:id' : 특정 거래 내역을 수정하는 Edit 페이지
// 4. '*' : 존재하지 않는 경로에 대한 NotFound 페이지

const mockData = [
  {
    id: 1,
    name: '월급',
    amount: 2500000,
    type : 'income',
    category: 'salary',
    date: new Date(),
  },
  {
    id: 2,
    name: '점심',
    amount: 8000,
    type : 'expense',
    category: 'food',
    date: new Date('2026-05-10'),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      return [...state, action.data];
    case 'UPDATE':
      return state.map((item) => (String(item.id) === String(action.data.id) ? action.data : item));
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.data.id));
    default:
      return state;
  }
}

function App() {
  const [transactions, dispatch] = useReducer(reducer, mockData);

  // 거래 내역 idRef
  const idRef = useRef(mockData.length + 1);

  // 새 거래 추가 (useCallback으로 재성성 되지 않도록 최적화)
  const onCreate = useCallback((name, amount, type, category, date) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        category,
        type,
        name,
        amount,
        date,
      },
    });
  }, []);

  // 거래 수정 (useCallback으로 재성성 되지 않도록 최적화)
  const onUpdate = useCallback((id, name, amount, type, category, date) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        category,
        type,
        name,
        amount,
        date,
      },
    });
  }, []);

  // 거래 삭제 (useCallback으로 재성성 되지 않도록 최적화)
  const onDelete = useCallback((id) => {
    dispatch({
      type: 'DELETE',
      data: {
        id,
      },
    });
  }, []);

  // useMemo로 값을 메모이제이션하여 value props로 넘어갈 때도
  // 항상 동일한 객체를 참조하도록 하여 불필요한 렌더링 방지
  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <>
      <TransactionStateContext.Provider value={transactions}>
        <TransactionDispatchContext.Provider value={memoizedDispatch}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TransactionDispatchContext.Provider>
      </TransactionStateContext.Provider>
    </>
  );
}

export default App;
