import React from "react";
import ContactForm from "./ContactForm";
import styles from "../Styles/EditModal.module.css";

const EditModal = ({ contact, onSave, onClose }) => {
  const handleSubmit = (values) => {
    const updatedContact = {
      ...values,
      id: contact.id,
    };
    onSave(updatedContact);
    onClose();
  };

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>

      <div className={styles.modal}>
        <h2>Edit Contact</h2>

        <ContactForm
          initialValues={{
            name: contact?.name || "",
            lastName: contact?.lastName || "",
            email: contact?.email || "",
            phone: contact?.phone || "",
          }}
          onSubmit={handleSubmit}
          buttonLabel="Save"
        />

        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
};

export default EditModal;
