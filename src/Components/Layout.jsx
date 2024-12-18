import React from "react";
import styles from "../Styles/Layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>Contact Manager</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>Designed By Sepideh Salari</p>
      </footer>
    </div>
  );
}

export default Layout;
