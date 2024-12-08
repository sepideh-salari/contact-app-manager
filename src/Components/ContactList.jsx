import ContactItem from "./ContactItem";
import styles from "../Styles/ContactList.module.css";
import ContactContext from "../context/ContactContext";
import React, { useContext } from "react";
function ContactList() {
  const { state, dispatch } = useContext(ContactContext);
  const { contacts, selectedContacts } = state;
  const deleteHandler = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };
  const editChangeHandler = (contact) => {
    dispatch({ type: "OPEN_MODAL", payload: contact });
  };
  const toggleSelection = (id) => {
    dispatch({ type: "TOGGLE_CONTACT_SELECTION", payload: id });
  };
  return (
    <div className={styles.container}>
      <h3>ContactList</h3>
      {contacts.length ? (
        <ul>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              data={contact}
              deleteHandler={deleteHandler}
              editChangeHandler={editChangeHandler}
              toggleSelection={toggleSelection}
            />
          ))}
        </ul>
      ) : (
        <p>No contacts yet!</p>
      )}
    </div>
  );
}

export default ContactList;
