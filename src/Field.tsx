interface Props {
  deleteFieldCB(id: number): void;
  id: number;
  label: string;
  type: string;
  value: string;
}

export default function Field(props: Props) {
  if (props.type === "submit") {
    return <SubmitButton {...props} />;
  } else if (props.type === "textarea") {
    return <Textarea {...props} />;
  } else {
    return <RegularInput {...props} />;
  }
}

function RegularInput(props: Props) {
  return (
    <>
      <label htmlFor={props.label} className='block mt-4'>
        {props.label}
      </label>
      <div className='flex mt-2'>
        <input
          value={props.value}
          type={props.type}
          id={props.label}
          className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
        />
        <DeleteButton {...props} />
      </div>
    </>
  );
}

function SubmitButton(props: Props) {
  return (
    <div className='flex mt-4'>
      <button
        type='submit'
        className='block w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
      >
        {props.label}
      </button>
      <DeleteButton {...props} />
    </div>
  );
}

function Textarea(props: Props) {
  return (
    <>
      <label htmlFor={props.label} className='block mt-4'>
        {props.label}
      </label>
      <div className='flex mt-2'>
        <textarea
          id={props.label}
          className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
        ></textarea>
        <DeleteButton {...props} />
      </div>
    </>
  );
}

function DeleteButton(props: {
  id: number;
  deleteFieldCB: (id: number) => void;
}) {
  return (
    <button
      type='button'
      className='ml-2 p-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'
      onClick={() => props.deleteFieldCB(props.id)}
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
          d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
        />
      </svg>
    </button>
  );
}
