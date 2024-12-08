import styles from "../Styles/EditModal.module.css";
function EditModal({ isOpen, contact, onClose, onSave, onChange }) {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.modal}>
        <input
          type="text"
          name="name"
          value={contact.name}
          onChange={onChange}
        />
        <input
          type="text"
          name="lastName"
          value={contact.lastName}
          onChange={onChange}
        />
        <input
          type="text"
          name="email"
          value={contact.email}
          onChange={onChange}
        />
        <input
          type="text"
          name="phone"
          value={contact.phone}
          onChange={onChange}
        />
        <button onClick={onSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
}

export default EditModal;
