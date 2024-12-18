import React, { useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import ContactForm from "./ContactForm";
import EditModal from "./EditModal";
import ContactList from "./ContactList";
import styles from "../Styles/ContactManager.module.css";

const ContactManager = () => {
  const { state, dispatch } = useContext(ContactContext);
  const filteredContacts = state.contacts.filter((contact) =>
    `${contact.name} ${contact.lastName} ${contact.email} ${contact.phone}`
      .toLowerCase()
      .includes(state.search.toLowerCase())
  );

  const handleSubmit = (values) => {
    dispatch({ type: "ADD_CONTACT", payload: values });
  };

  const handleEditContact = (contact) => {
    dispatch({ type: "OPEN_MODAL", payload: contact });
  };

  const handleSaveContact = (updatedContact) => {
    dispatch({ type: "SAVE_CONTACT", payload: updatedContact });
  };

  const handleDeleteContact = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  const handleSelectContact = (id) => {
    dispatch({ type: "TOGGLE_CONTACT_SELECTION", payload: id });
  };

  const handleDeleteSelectedContacts = () => {
    dispatch({ type: "DELETE_SELECTED_CONTACTS" });
  };

  const handleCloseModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <div className={styles.container}>
      <ContactForm
        initialValues={{
          name: "",
          lastName: "",
          email: "",
          phone: "",
        }}
        onSubmit={handleSubmit}
        buttonLabel="Add Contact"
      />
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
          selectedContacts={state.selectedContacts}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
          onSelect={handleSelectContact}
          onDeleteSelected={handleDeleteSelectedContacts}
        />
      )}

      {state.isModalOpen && state.selectedContact && (
        <EditModal
          contact={state.selectedContact}
          onSave={handleSaveContact}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ContactManager;
