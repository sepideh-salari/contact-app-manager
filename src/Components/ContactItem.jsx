import styles from "../Styles/ContactItem.module.css";

function ContactItem({
  data: { id, name, lastName, email, phone },
  deleteHandler,
  editChangeHandler,
}) {
  return (
    <li className={styles.item} key={id}>
      <p>
        {name} {lastName}
      </p>
      <p>{email}</p>
      <p>{phone}</p>
      <div className={styles.contact_buttons}>
        <button onClick={() => deleteHandler(id)}>Delete</button>
        <button
          onClick={() =>
            editChangeHandler({ id, name, lastName, email, phone })
          }
        >
          Edit
        </button>{" "}
      </div>
    </li>
  );
}

export default ContactItem;
