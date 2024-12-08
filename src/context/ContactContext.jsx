import React, { createContext, useReducer } from "react";
import { v4 } from "uuid";

const ContactContext = createContext();

const initialState = {
  contacts: [],
  contact: {
    name: "",
    lastName: "",
    email: "",
    phone: "",
  },
  selectedContacts: [],
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
    case "TOGGLE_CONTACT_SELECTION":
      const id = action.payload;
      const selectedContacts = state.selectedContacts.includes(id)
        ? state.selectedContacts.filter((contactId) => contactId !== id)
        : [...state.selectedContacts, id];
      return { ...state, selectedContacts };

    case "DELETE_SELECTED_CONTACTS":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => !state.selectedContacts.includes(contact.id)
        ),
        selectedContacts: [],
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

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;
