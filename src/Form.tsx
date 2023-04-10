import { useState } from "react";
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

export default function Form() {
  const [fields, setFields] = useState(formFields);

  const deleteFieldCB = (id: number) => {
    console.log("deleteFieldCB", id);
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <>
      {fields.map((field) => (
        <Field key={field.id} {...field} deleteFieldCB={deleteFieldCB} />
      ))}
    </>
  );
}
