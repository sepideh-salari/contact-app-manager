import styles from "../Styles/ContactItem.module.css";
import ContactContext from "../context/ContactContext";
import React, { useContext } from "react";

function ContactItem({ data: { id, name, lastName, email, phone } }) {
  const { state, dispatch } = useContext(ContactContext);

  const deleteHandler = () => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  const editChangeHandler = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { id, name, lastName, email, phone },
    });
  };

  const toggleSelection = () => {
    dispatch({ type: "TOGGLE_CONTACT_SELECTION", payload: id });
  };

  return (
    <li className={styles.item} key={id}>
      <input
        type="checkbox"
        onChange={toggleSelection}
        className={styles.checkbox}
      />
      <p>
        {name} {lastName}
      </p>
      <p>{email}</p>
      <p>{phone}</p>
      <div className={styles.contact_buttons}>
        <button onClick={deleteHandler}>Delete</button>
        <button onClick={editChangeHandler}>Edit</button>{" "}
      </div>
    </li>
  );
}

export default ContactItem;
