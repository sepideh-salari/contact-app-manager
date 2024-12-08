import styles from "../Styles/EditModal.module.css";
import React, { useContext } from "react";
import ContactContext from "../context/ContactContext";
function EditModal() {
  const { state, dispatch } = useContext(ContactContext);
  const { isModalOpen, selectedContact } = state;
  if (!isModalOpen) return null;
  const onChange = (e) => {
    dispatch({
      type: "EDIT_CONTACT_FIELD",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const onSave = () => {
    dispatch({ type: "SAVE_CONTACT" });
  };

  const onClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.modal}>
        <input
          type="text"
          name="name"
          value={selectedContact.name}
          onChange={onChange}
        />
        <input
          type="text"
          name="lastName"
          value={selectedContact.lastName}
          onChange={onChange}
        />
        <input
          type="text"
          name="email"
          value={selectedContact.email}
          onChange={onChange}
        />
        <input
          type="text"
          name="phone"
          value={selectedContact.phone}
          onChange={onChange}
        />
        <button onClick={onSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
}

export default EditModal;
