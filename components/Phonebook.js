
import Wrapper from "./Wrapper";
import { style } from "./style";
import { useContext, useState } from "react";
import ContactContextProvider, { ContactContext } from "./ContactContext";


const PhoneBookForm = () => {
  const { contactList, setContactList } = useContext(ContactContext);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const isDuplicateEntry = () => {
    return contactList.reduce((res, contact) => {
      return (
        res || contact.name === name || contact.mobileNumber === mobileNumber
      );
    }, false);
  };

  const addRecord = (e) => {
    e.preventDefault();
    if (isDuplicateEntry()) {
      alert("Entry already exists. Please try again...");
      return;
    }
    setContactList((prevContactList) => {
      const updatedContactList = [...prevContactList, { name, mobileNumber }];
      sessionStorage.setItem("contactList", JSON.stringify(updatedContactList));
      return updatedContactList;
    });
    setName("");
    setMobileNumber("");
  };

  return (
    <form autoComplete="off" onSubmit={addRecord} style={style.form.container}>
      <label>Name:</label>
      <br />
      <input
        style={style.form.inputs}
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        required
        name="n"
        type="text"
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        name="p"
        onChange={(e) => {
          setMobileNumber(e.target.value);
        }}
        value={mobileNumber}
        type="tel"
        required
        placeholder="9987654210"
        pattern="[6-9]{1}[0-9]{9}"
      />
      <br />
      <input style={style.form.submitBtn} type="submit" value="Add User" />
    </form>
  );
};

const InformationTable = () => {
  const { contactList } = useContext(ContactContext);
  if (contactList.length <= 0) return;
  const getSortedContactList = (contactList) => {
    return contactList.sort((contact1, contact2) => {
      if (contact1.name < contact2.name) {
        return -1;
      } else if (contact1.name > contact2.name) {
        return 1;
      } else return 0;
    });
  };
  const sortedContactList = getSortedContactList([...contactList]);
  return (
    <table style={style.table}>
      <thead>
        <tr>
          <th style={style.tableCell}>Name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {sortedContactList.map(({ name, mobileNumber }) => (
          <tr key={mobileNumber}>
            <td style={style.tableCell}>{name}</td>
            <td style={style.tableCell}>{mobileNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Message = () => {
  const { contactList } = useContext(ContactContext);
  return (
    <div style={style.msg}>
      <h4>Total Number of Contacts</h4>
      <h1>{contactList.length}</h1>
    </div>
  );
};

const FormWrapper = () => (
  <Wrapper stack>
    <PhoneBookForm />
    <Message />
  </Wrapper>
);
const InfoWrapper = () => (
  <Wrapper>
    <InformationTable />
  </Wrapper>
);
export default () => {
  return (
    <ContactContextProvider>
      <FormWrapper />
      <br />
      {<InfoWrapper />}
    </ContactContextProvider>
  );
};
