import React from "react";
import AppContainer from "./AppContainer";
import Header from "./Header";
import Field from "./Field";

const formFields = [
  {
    id: 1,
    label: "First Name",
    type: "text",
  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
  },
  {
    id: 3,
    label: "Email",
    type: "email",
  },
  {
    id: 4,
    label: "Date of Birth",
    type: "date",
  },
  {
    id: 5,
    label: "Phone Number",
    type: "tel",
  },
  {
    id: 6,
    label: "Submit",
    type: "submit",
  },
];

function App() {
  return (
    <AppContainer>
      <div className='p-4 mx-auto bg-white shadow-lg rounded-xl'>
        <Header title='Level 1: Getting Started' />
        {formFields.map((field) => (
          <Field key={field.id} {...field} />
        ))}
      </div>
    </AppContainer>
  );
}

export default App;
