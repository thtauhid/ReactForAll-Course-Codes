import { useState } from "react";
import Field from "./Field";

import { FormFields, FormValues } from "./types";

const formInitialData: FormValues = {
  id: Number(new Date()),
  title: "Untitled Form",
  fields: [
    {
      id: 1,
      label: "First Name",
      type: "text",
      value: "",
    },
    {
      id: 2,
      label: "Last Name",
      type: "text",
      value: "",
    },
    {
      id: 3,
      label: "Email",
      type: "email",
      value: "",
    },
    {
      id: 4,
      label: "Date of Birth",
      type: "date",
      value: "",
    },
    {
      id: 5,
      label: "Phone Number",
      type: "tel",
      value: "",
    },
  ],
};

export default function Form() {
  const [formData, setFormData] = useState<FormValues>(formInitialData);

  const deleteFieldCB = (id: number) => {
    setFormData({
      ...formData,
      fields: formData.fields.filter((field) => field.id !== id),
    });
  };

  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");

  const addFormField = () => {
    setFormData({
      ...formData,
      fields: [
        ...formData.fields,
        {
          id: formData.fields.length + 1,
          label: newFieldLabel,
          type: newFieldType,
          value: "",
        },
      ],
    });

    setNewFieldLabel("");
    setNewFieldType("text");
  };

  const handleFieldChangeCB = (id: number, value: string) => {
    setFormData({
      ...formData,
      fields: formData.fields.map((field) => {
        if (field.id === id) {
          return {
            ...field,
            value,
          };
        }

        return field;
      }),
    });
  };

  const clearFields = () => {
    setFormData({
      ...formData,
      fields: formData.fields.map((field) => ({
        ...field,
        value: "",
      })),
    });
  };

  return (
    <>
      <input
        type='text'
        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full text-3xl '
        placeholder='Form Title'
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <div className='mt-4 border border-stone-500'></div>

      {formData.fields.map((field) => (
        <Field
          key={field.id}
          {...field}
          deleteFieldCB={deleteFieldCB}
          handleFieldChangeCB={handleFieldChangeCB}
        />
      ))}
      <div className='flex mt-4 py-4 border-y-2 border-dashed border-stone-400'>
        <select
          id='type'
          className='flex-1 mr-1 p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
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
        </select>

        <input
          type='text'
          className='flex-1 ml-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          placeholder='Label'
          value={newFieldLabel}
          onChange={(e) => setNewFieldLabel(e.target.value)}
        />
        <button
          type='button'
          className='ml-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
          onClick={addFormField}
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

      <div className='mt-4 border border-stone-500'></div>

      <div className='flex mt-4'>
        <button
          type='submit'
          className='flex-1 mr-1 p-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'
        >
          Save
        </button>

        <button
          type='button'
          className='flex-1 ml-1 p-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600'
          onClick={clearFields}
        >
          Clear Fields
        </button>
      </div>
    </>
  );
}
