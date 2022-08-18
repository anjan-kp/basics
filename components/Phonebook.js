
import Wrapper from "./Wrapper";
import { style } from "./style";

const PhoneBook = () => {
  const addRecord = (e) => {
    e.preventDefault();
  };

  return (
    <form autoComplete="off" onSubmit={addRecord} style={style.form.container}>
      <label>Name:</label>
      <br />
      <input style={style.form.inputs} name="n" type="text" />
      <br />
      <label>Phone:</label>
      <br />
      <input style={style.form.inputs} name="p" type="text" />
      <br />
      <input style={style.form.submitBtn} type="submit" value="Add User" />
    </form>
  );
};

const InformationTable = () => {
  return (
    <table style={style.table}>
      <thead>
        <tr>
          <th style={style.tableCell}>Name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
    </table>
  );
};

const Message = () => (
  <div style={style.msg}>
    <h4>Total Number of Contacts</h4>
    <h1>0</h1>
  </div>
);

const FormWrapper = () => (
  <Wrapper stack>
    <PhoneBook />
    <Message />
  </Wrapper>
);
const InfoWrapper = () => (
  <Wrapper>
    <InformationTable />
  </Wrapper>
);
const PhoneBookForm =  () => (
  <>
    <FormWrapper />
    <br />
    <InfoWrapper />
  </>
);

export default PhoneBookForm;