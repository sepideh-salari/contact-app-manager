import { useState } from "react";
import ContactList from "./ContactList";
import inputs from "./constants/inputs";
import { v4 } from "uuid";
import styles from "./Contacts.module.css";
function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({});
  const [search, setSearch] = useState("");
  const changeHandler = (event) => {
    const name = event.target.name;

    const value = event.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
  };
  const addHandler = () => {
    if (
      !contact.name ||
      !contact.email ||
      !contact.phone ||
      !contact.lastName
    ) {
      setAlert("Please Enter Valis Data!");
      return;
    }
    setAlert("");
    const newContact = { ...contact, id: v4() };
    setContacts((contacts) => [...contacts, newContact]);
    setContact({
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };
  const deleteHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  };
  const filteredContacts = contacts.filter((contact) =>
    `${contact.name} ${contact.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        {inputs.map((input, index) => (
          <input
            key={index}
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            value={contact[input.name]}
            onChange={changeHandler}
          />
        ))}

        <button onClick={addHandler}>Add contact</button>
      </div>
      <div>{alert && <p className={styles.alert}>{alert}</p>}</div>
      <input
        type="text"
        placeholder="Search contacts..."
        className={styles.searchBar}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ContactList contacts={filteredContacts} deleteHandler={deleteHandler} />
    </div>
  );
}

export default Contacts;
