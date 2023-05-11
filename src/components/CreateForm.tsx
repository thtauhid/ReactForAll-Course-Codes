import { useState } from "react";
import { Form, validateForm } from "../types/formTypes";
import { createForm } from "../utils/apiUtils";
import { navigate } from "raviger";

export default function CreateForm() {
  const [form, setForm] = useState<Form>({
    title: "",
    description: "",
    is_public: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateForm(form);

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    const response = await createForm(form);

    navigate(`/forms/${response.id}`);
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <h1 className='text-2xl font-bold text-center'>Create Form</h1>
      {
        /* Errors */

        Object.keys(errors).map((key) => (
          <div className='bg-red-500 text-white p-2 rounded m-2' key={key}>
            {errors[key]}
          </div>
        ))
      }
      <div className='flex flex-col p-2 rounded-md focus:outline-none focus:border-blue-500 flex-1'>
        <label htmlFor='title'>Title</label>
        <input
          value={form.title}
          onChange={(e) => {
            setForm({ ...form, title: e.target.value });
          }}
          type='text'
          id='title'
          className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1 mt-1'
        />
      </div>
      <div className='flex flex-col p-2 rounded-md focus:outline-none focus:border-blue-500 flex-1'>
        <label htmlFor='description'>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => {
            setForm({ ...form, description: e.target.value });
          }}
          rows={5}
          id='description'
          className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1 mt-1'
        />
      </div>
      <div className='flex flex-row p-2 rounded-md focus:outline-none focus:border-blue-500 flex-1'>
        <input
          checked={form.is_public}
          onChange={(e) => {
            setForm({ ...form, is_public: e.target.checked });
          }}
          type='checkbox'
          id='is_public'
          className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mr-2'
        />
        <label htmlFor='is_public'>Public</label>
      </div>

      <div className='flex flex-row p-2 rounded-md focus:outline-none focus:border-blue-500 flex-1'>
        <button className='bg-blue-600 p-2 rounded text-white'>
          Create Form
        </button>
      </div>
    </form>
  );
}
