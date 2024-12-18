import React from "react";
import { ContactProvider } from "./context/ContactContext";
import Layout from "./Components/Layout";
import ContactManager from "./Components/ContactManager";

function App() {
  return (
    <ContactProvider>
      <Layout>
        <ContactManager />
      </Layout>
    </ContactProvider>
  );
}

export default App;
