import { useState } from "react";
import { Form } from "./types";

const sampleForm = [
  {
    id: 1,
    title: "A form with 4 fields",
    fields: [
      {
        id: 1,
        label: "First name",
        type: "text",
        value: "",
      },
      {
        id: 2,
        label: "Last name",
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
        label: "Password",
        type: "password",
        value: "",
      },
    ],
  },
  {
    id: 2,
    title: "Personal Data Collection Form",
    fields: [
      {
        id: 1,
        label: "First name",
        type: "text",
        value: "",
      },
      {
        id: 2,
        label: "Last name",
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
        label: "Password",
        type: "password",
        value: "",
      },
    ],
  },
];

export default function Forms(props: { selectFormCB: (id: number) => void }) {
  const [forms, setForms] = useState<Form[]>(sampleForm);

  return (
    <>
      {forms.map((form) => (
        <FormCard
          key={form.id}
          formData={form}
          selectFormCB={props.selectFormCB}
        />
      ))}
    </>
  );
}

function FormCard(props: {
  formData: Form;
  selectFormCB: (id: number) => void;
}) {
  return (
    <div className='flex justify-between items-center p-4 my-2 bg-white rounded-xl border-stone-400 border-2 hover:bg-slate-200'>
      <h2 className='text-xl'>{props.formData.title}</h2>
      <div>
        <button
          className='p-3 bg-blue-500 hover:bg-blue-700 rounded text-white'
          onClick={() => props.selectFormCB(props.formData.id)}
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
              d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
        </button>
        <button className='ml-2 p-3 bg-red-500 hover:bg-red-700 rounded text-white'>
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
              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
