import React from "react";
import { ContactProvider } from "./context/ContactContext";
import Header from "./Components/Header";
import Contacts from "./Components/Contacts";

function App() {
  return (
    <ContactProvider>
      <Header />
      <Contacts />
    </ContactProvider>
  );
}

export default App;
