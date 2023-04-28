import { useEffect, useState } from "react";
import Field from "./Field";

import { Form } from "../types";
import { Link, navigate } from "raviger";

const formInitialData: Form = {
  id: Number(new Date()),
  title: "Untitled Form",
  fields: [
    {
      id: 1,
      label: "First Name",
      type: "text",
      value: "",
    },
  ],
};

export default function FormBuilder(props: { formId: number }) {
  // const [forms, setForms] = useState<Form[]>([]);
  const [formData, setFormData] = useState<Form>(formInitialData);

  useEffect(() => {
    const data = localStorage.getItem("forms");
    if (data) {
      const dataJSON = JSON.parse(data);

      // find the corresponding form of the id
      const form = dataJSON.find((form: Form) => form.id === props.formId);
      if (form) {
        setFormData(form);
      } else {
        navigate("/404");
      }
    }
  }, [props.formId]);

  useEffect(() => {
    const data = localStorage.getItem("forms");
    if (data) {
      const dataJSON = JSON.parse(data);
      const newData = dataJSON.map((form: Form) => {
        if (form.id === formData.id) {
          return formData;
        }

        return form;
      });

      localStorage.setItem("forms", JSON.stringify(newData));
    }
  }, [formData]);

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

  const handleFieldChangeCB = (id: number, label: string) => {
    setFormData({
      ...formData,
      fields: formData.fields.map((field) => {
        if (field.id === id) {
          return {
            ...field,
            label,
          };
        }

        return field;
      }),
    });
  };

  const manualSave = () => {
    const data = localStorage.getItem("forms");
    if (data) {
      const dataJSON = JSON.parse(data);
      const newData = dataJSON.map((form: Form) => {
        if (form.id === formData.id) {
          return formData;
        }

        return form;
      });

      localStorage.setItem("forms", JSON.stringify(newData));
    }
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
          className='mr-1 flex-1 p-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'
          onClick={manualSave}
        >
          Save
        </button>

        <Link
          href='/'
          className='ml-1 flex-1 p-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 text-center'
        >
          Close
        </Link>
      </div>
      <div className='flex mt-4'>
        <input
          type='text'
          className='flex-1 ml-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          value={`http://localhost:3000/preview/${formData.id}`}
        />
        <Link
          type='button'
          className='ml-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
          href={`/preview/${formData.id}`}
          target='_blank'
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
              d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
            />
          </svg>
        </Link>
      </div>
    </>
  );
}
