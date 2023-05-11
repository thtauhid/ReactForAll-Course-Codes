import { useEffect, useState } from "react";
import { Form } from "./types/formTypes";
import { Link } from "raviger";
import { listForms } from "./utils/apiUtils";
import { Pagination } from "./types/common";

const getForms = async (setFormsCB: (value: Form[]) => void) => {
  const data: Pagination<Form> = await listForms({ limit: 10, offset: 0 });

  setFormsCB(data.results);
};

export default function Forms() {
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    getForms(setForms);
  }, []);

  return (
    <>
      <div className='flex justify-end my-4'>
        <Link
          className='flex justify-center items-center p-3 bg-blue-500 rounded text-white'
          href='/forms/create'
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
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>{" "}
          Create Form
        </Link>
      </div>

      {forms.map((form) => (
        <FormCard key={form.id} formData={form} />
      ))}
    </>
  );
}

function FormCard(props: { formData: Form }) {
  return (
    <div className='flex justify-between items-center p-4 my-2 bg-white rounded-xl border-stone-400 border-2 hover:bg-slate-200'>
      <h2 className='text-xl'>{props.formData.title}</h2>
      <div className='flex'>
        <Link
          className='p-3 bg-blue-500 hover:bg-blue-700 rounded text-white button inline-block'
          href={`/forms/${props.formData.id}`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-6 h-6'
          >
            <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z' />
            <path d='M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z' />
          </svg>
        </Link>
        <Link
          href={`/preview/${props.formData.id}`}
          target='_blank'
          className='ml-2 p-3 bg-blue-500 hover:bg-blue-700 rounded text-white'
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
        </Link>
      </div>
    </div>
  );
}
