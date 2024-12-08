import ContactList from "../Components/ContactList";
import EditModal from "./EditModal";
import inputs from "../constants/inputs";
import styles from "../Styles/Contacts.module.css";
import React, { useContext } from "react";
import ContactContext from "../context/ContactContext";

function Contacts() {
  const { state, dispatch } = useContext(ContactContext);
  const openEditModal = (contact) => {
    dispatch({ type: "OPEN_MODAL", payload: contact });
  };
  const closeEditModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  const saveEditedContact = () => {
    dispatch({ type: "SAVE_CONTACT" });
  };
  const editChangeHandler = (e) => {
    dispatch({
      type: "EDIT_CONTACT_FIELD",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const changeHandler = (event) => {
    dispatch({
      type: "SET_CONTACT_FIELD",
      payload: { name: event.target.name, value: event.target.value },
    });
  };

  const addHandler = () => {
    dispatch({ type: "ADD_CONTACT" });
  };

  const deleteHandler = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  const filteredContacts = state.contacts.filter((contact) =>
    `${contact.name} ${contact.lastName} ${contact.email} ${contact.phone}`
      .toLowerCase()
      .includes(state.search.toLowerCase())
  );
  const deleteSelectedContacts = () => {
    dispatch({ type: "DELETE_SELECTED_CONTACTS" });
  };

  const toggleContactSelection = (id) => {
    dispatch({ type: "TOGGLE_CONTACT_SELECTION", payload: id });
  };
  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        {inputs.map((input, index) => (
          <input
            key={index}
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            value={state.contact[input.name]}
            onChange={changeHandler}
            className={
              state.isSubmitted && !state.contact[input.name]
                ? styles.error
                : ""
            }
          />
        ))}

        <button onClick={addHandler}>Add contact</button>
        <button
          onClick={deleteSelectedContacts}
          disabled={!state.selectedContacts.length}
        >
          Delete Selected
        </button>
      </div>
      <div>{state.alert && <p className={styles.alert}>{state.alert}</p>}</div>
      <input
        type="text"
        placeholder="Search contacts..."
        className={styles.searchBar}
        value={state.search}
        onChange={(e) =>
          dispatch({ type: "SET_SEARCH", payload: e.target.value })
        }
      />
      {filteredContacts.length === 0 ? (
        <p className={styles.noContacts}>No contacts found.</p>
      ) : (
        <ContactList
          contacts={filteredContacts}
          deleteHandler={deleteHandler}
          editChangeHandler={openEditModal}
          toggleSelection={toggleContactSelection}
        />
      )}
      <EditModal
        isOpen={state.isModalOpen}
        contact={state.selectedContact || {}}
        onClose={closeEditModal}
        onSave={saveEditedContact}
        onChange={editChangeHandler}
      />
    </div>
  );
}

export default Contacts;
