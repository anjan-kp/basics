import { createContext, useState } from "react";

export const ContactContext = createContext();

const ContactContextProvider = ({ children }) => {
  const storedContactList = JSON.parse(sessionStorage.getItem("contactList"));
  const [contactList, setContactList] = useState(storedContactList || []);
  return (
    <ContactContext.Provider value={{ contactList, setContactList }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;
