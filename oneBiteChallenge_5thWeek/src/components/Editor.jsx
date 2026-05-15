import './Editor.css';

import Button from './Button';

import { getStringedDate } from '../util/get-stringed-date';

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Editor({ onSubmit, initData }) {
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const amountRef = useRef(null);

  const [input, setInput] = useState({
    type: 'expense',
    name: '',
    amount: 0,
    category: 'food',
    date: new Date(),
  });

  useEffect(() => {
    if (initData) {
      setInput({ ...initData });
    }
  }, [initData]);

  const onChangeInput = (event) => {
    let { name, value } = event.target;

    // select 태그의 value는 문자열이므로,
    // type이 date인 경우에는 Date 객체로 변환해주기
    if (name === 'date') {
      value = new Date(value);
    }

    // input.value는 문자열 값이므로 숫자값인 amount의 경우에는 Number로 변환
    if (name === 'amount') {
      value = value === '' ? '' : Number(value);
    }

    setInput({ ...input, [name]: value });
  };

  const onClickSaveButton = () => {
    // 이름 유효성 검사
    if (input.name.trim() === '') {
      alert('거래 내역 이름을 입력해주세요.');
      nameRef.current.focus();
      return;
    }

    // 금액 유효성 검사
    if (input.amount === '' || isNaN(input.amount) || Number(input.amount) <= 0) {
      alert('올바른 금액을 입력해주세요.');
      amountRef.current.focus();
      return;
    }

    // ensure amount is a number before submitting
    const payload = { ...input, amount: Number(input.amount) };
    onSubmit(payload);
  };

  return (
    <div className="Editor">
      <div className="type">
        <h4>분류</h4>
        <select name="type" value={input.type} onChange={onChangeInput}>
          <option value="expense">지출</option>
          <option value="income">수입</option>
        </select>
      </div>

      <div className="name">
        <h4>지출/수입 이름</h4>
        <input
          ref={nameRef}
          type="text"
          name="name"
          value={input.name}
          onChange={onChangeInput}
          placeholder="거래 내역 이름"
        />
      </div>

      <div className="amount">
        <h4>지출/수입 금액</h4>
        <input
          ref={amountRef}
          type="number"
          name="amount"
          value={input.amount}
          onChange={onChangeInput}
          placeholder="금액"
        />
      </div>

      <div className="category">
        <h4>카테고리</h4>
        <select name="category" value={input.category} onChange={onChangeInput}>
          <option value="food">🍱식비</option>
          <option value="transport">🚌교통비</option>
          <option value="living">🏠생활비</option>
          <option value="entertain">🎬문화/여가</option>
          <option value="salary">💰급여</option>
          <option value="pocket">🪙용돈</option>
          <option value="other">📦기타</option>
        </select>
      </div>

      <div className="date">
        <h4>날짜</h4>
        <input
          type="date"
          name="date"
          value={getStringedDate(input.date)}
          onChange={onChangeInput}
        />
      </div>

      <div className="button_container">
        <Button className="submit_button" text="저장" onClick={onClickSaveButton} />
        <Button
          className="cancel_button"
          text="취소"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
    </div>
  );
}

export default Editor;
