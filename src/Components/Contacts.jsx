import { useReducer } from "react";
import ContactList from "../Components/ContactList";
import EditModal from "./EditModal";
import inputs from "../constants/inputs";
import { v4 } from "uuid";
import styles from "../Styles/Contacts.module.css";

const initialState = {
  contacts: [],
  contact: {
    name: "",
    lastName: "",
    email: "",
    phone: "",
  },
  alert: "",
  search: "",
  isSubmitted: false,
  isModalOpen: false,
  selectedContact: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACT_FIELD":
      return {
        ...state,
        contact: {
          ...state.contact,
          [action.payload.name]: action.payload.value,
        },
      };
    case "ADD_CONTACT":
      if (
        !state.contact.name ||
        !state.contact.lastName ||
        !state.contact.email ||
        !state.contact.phone
      ) {
        const missingFields = [];
        if (!state.contact.name) missingFields.push("Name");
        if (!state.contact.lastName) missingFields.push("Last Name");
        if (!state.contact.email) missingFields.push("Email");
        if (!state.contact.phone) missingFields.push("Phone");
        setTimeout(() => dispatch({ type: "CLEAR_ALERT" }), 3000);
        return {
          ...state,
          alert: `Missing fields: ${missingFields.join(", ")}`,
          isSubmitted: true,
        };
      }
      return {
        ...state,
        contacts: [...state.contacts, { ...state.contact, id: v4() }],
        contact: { name: "", lastName: "", email: "", phone: "" },
        alert: "",
        isSubmitted: false,
      };
    case "CLEAR_ALERT":
      return { ...state, alert: "" };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    case "SET_SEARCH":
      return { ...state, search: action.payload };

    case "OPEN_MODAL":
      return {
        ...state,
        isModalOpen: true,
        selectedContact: action.payload,
      };
    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false, selectedContact: null };
    case "EDIT_CONTACT_FIELD":
      return {
        ...state,
        selectedContact: {
          ...state.selectedContact,
          [action.payload.name]: action.payload.value,
        },
      };
    case "SAVE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === state.selectedContact.id
            ? state.selectedContact
            : contact
        ),
        isModalOpen: false,
        selectedContact: null,
      };
    default:
      return state;
  }
};

function Contacts() {
  const [state, dispatch] = useReducer(reducer, initialState);
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
