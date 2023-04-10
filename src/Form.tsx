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
    setFields(fields.filter((field) => field.id !== id));
  };

  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");

  const handleSubmit = () => {
    setFields([
      ...fields,
      {
        id: Number(new Date()),
        label: newFieldLabel,
        type: newFieldType,
      },
    ]);

    setNewFieldLabel("");
    setNewFieldType("text");
  };

  return (
    <>
      {fields.map((field) => (
        <Field key={field.id} {...field} deleteFieldCB={deleteFieldCB} />
      ))}

      <div className='mt-4 border border-stone-500'></div>

      <div className='mt-4'>
        <select
          id='type'
          className='p-2 w-full border bg-white border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          value={newFieldType}
          onChange={(e) => setNewFieldType(e.target.value)}
        >
          <option value='text'>Text</option>
          <option value='email'>Email</option>
          <option value='date'>Date</option>
          <option value='tel'>Phone</option>
          <option value='number'>Number</option>
          <option value='password'>Password</option>
          <option value='textarea'>Textarea</option>
          <option value='submit'>Submit</option>
        </select>
      </div>

      <div className='flex mt-4'>
        <input
          type='text'
          className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
          placeholder='Label'
          value={newFieldLabel}
          onChange={(e) => setNewFieldLabel(e.target.value)}
        />
        <button
          type='button'
          className='ml-2 p-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'
          onClick={handleSubmit}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
        </button>
      </div>
    </>
  );
}
