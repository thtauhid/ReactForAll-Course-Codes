export default function Field(props: {
  id: number;
  label: string;
  type: string;
}) {
  if (props.type === "submit") {
    return <SubmitButton {...props} />;
  } else {
    return <RegularInput {...props} />;
  }
}

function RegularInput(props: { label: string; type: string }) {
  return (
    <>
      <label htmlFor={props.label} className='block mt-4'>
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.label}
        className='block w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
      />
    </>
  );
}

function SubmitButton(props: { label: string }) {
  return (
    <button
      type='submit'
      className='block w-full p-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
    >
      {props.label}
    </button>
  );
}
