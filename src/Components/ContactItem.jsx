import React from "react";
import styles from "../Styles/ContactItem.module.css";

const ContactItem = ({ contact, onEdit, onDelete, onSelect, isSelected }) => {
  return (
    <li className={styles.item}>
      <div>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(contact.id)}
        />
        {contact.name} {contact.lastName} - {contact.email} - {contact.phone}
        <div className={styles.contact_buttons}>
          <button onClick={() => onEdit(contact)}>Edit</button>
          <button onClick={() => onDelete(contact.id)}>Delete</button>
        </div>
      </div>
    </li>
  );
};

export default ContactItem;
