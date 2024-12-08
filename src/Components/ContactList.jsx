import ContactItem from "./ContactItem";
import styles from "../Styles/ContactList.module.css";
function ContactList({ contacts, deleteHandler, editChangeHandler }) {
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
