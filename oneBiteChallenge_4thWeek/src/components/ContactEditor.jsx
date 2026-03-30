import './ContactEditor.css';

import { useContext, useState } from 'react';
import { ContactDispatchContext } from '../contexts/contactContext';

function ContactEditor() {
  const { onCreate } = useContext(ContactDispatchContext);

  const [info, setInfo] = useState({
    name: '',
    email: '',
  });

  // 입력값 변경 이벤트 핸들러
  const onChangeInfo = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  // 엔터키 제출 이벤트 핸들러
  const onkeydown = (event) => {
    if (event.key === 'Enter') {
      onSubmit(event);
    }
  };

  // 제출 이벤트 핸들러
  const onSubmit = (event) => {
    // 빈 제출 방지
    if (info.name.trim() === '' || info.email.trim() === '') {
      alert('이름과 연락처(이메일)를 모두 입력해주세요.');
      return;
    }

    // 제출 시, onCreate 함수를 호출하여 연락처 추가
    onCreate(info.name, info.email);

    // 제출 후, 입력창 초기화
    setInfo({
      name: '',
      email: '',
    });
  };

  return (
    <div className="ContactEditor">
      <div className="title">Add Contact</div>
      <div className="input_wrapper" onKeyDown={onkeydown}>
        <input
          name="name"
          value={info.name}
          onChange={onChangeInfo}
          className="name"
          placeholder="이름 ..."
        />
        <input
          name="email"
          value={info.email}
          onChange={onChangeInfo}
          className="contact"
          placeholder="연락처(이메일) ..."
        />
      </div>
      <button onClick={onSubmit}>Add</button>
    </div>
  );
}

export default ContactEditor;
