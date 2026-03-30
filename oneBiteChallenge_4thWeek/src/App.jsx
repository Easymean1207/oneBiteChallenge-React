import './App.css';
import ContactEditor from './components/ContactEditor';
import ContactList from './components/ContactList';

import { useMemo, useReducer, useRef, useCallback } from 'react';
import { ContactStateContext, ContactDispatchContext } from './contexts/contactContext';

const mockData = [
  {
    id: 1,
    name: '이정환',
    email: 'king199777@gmail.com',
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.contact];
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
};

function App() {
  const [contacts, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(2);

  // 연락처 추가 함수 (useCallback으로 최적화)
  const onCreate = useCallback((name, email) => {
    dispatch({
      type: 'CREATE',
      contact: {
        id: idRef.current++,
        name,
        email,
      },
    });
  }, []);

  // 연락처 삭제 함수 (useCallback으로 최적화)
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: 'DELETE',
      id: targetId,
    });
  }, []);

  // onCreate와 onDelete 함수를 객체로 묶어서 useMemo로 다시 재성성되지 않도록 설정
  const memoizedDispatch = useMemo(() => ({ onCreate, onDelete }), []);

  return (
    <div className="App">
      <ContactStateContext.Provider value={contacts}>
        <ContactDispatchContext.Provider value={memoizedDispatch}>
          <h2>Contact List</h2>
          <section>
            <ContactEditor />
          </section>
          <section>
            <ContactList />
          </section>
        </ContactDispatchContext.Provider>
      </ContactStateContext.Provider>
    </div>
  );
}

export default App;
