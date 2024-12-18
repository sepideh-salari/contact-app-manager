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
      return {
        ...state,
        contacts: [...state.contacts, { ...action.payload, id: v4() }],
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
          contact.id === action.payload.id ? action.payload : contact
        ),
        isModalOpen: false,
      };
    default:
      return state;
  }
};

const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

export { ContactContext, ContactProvider };
