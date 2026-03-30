import "./ContactItem.css";

import {useContext, memo} from "react";
import {ContactDispatchContext} from "../contexts/contactContext"

function ContactItem({id, name, email}) {
  const {onDelete} = useContext(ContactDispatchContext);

  return (
    <div className="ContactItem">
      <div className="name">{name}</div>
      <div className="contact">{email}</div>
      <button onClick={() => onDelete(id)} >🗑️ Remove</button>
    </div>
  );
}

export default memo(ContactItem);