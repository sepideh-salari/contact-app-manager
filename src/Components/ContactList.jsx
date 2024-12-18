import React from "react";
import ContactItem from "./ContactItem";
import styles from "../Styles/ContactList.module.css";

const ContactList = ({
  contacts,
  selectedContacts,
  onEdit,
  onDelete,
  onSelect,
  onDeleteSelected,
}) => {
  return (
    <div className={styles.container}>
      <h3>ContactList</h3>
      {contacts.length > 0 ? (
        <>
          <ul>
            {contacts.map((contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                onEdit={onEdit}
                onDelete={onDelete}
                onSelect={onSelect}
                isSelected={selectedContacts.includes(contact.id)}
              />
            ))}
          </ul>
          {selectedContacts.length > 0 && (
            <button onClick={onDeleteSelected}>Delete Selected</button>
          )}
        </>
      ) : (
        <p>No contacts found.</p>
      )}
    </div>
  );
};

export default ContactList;
