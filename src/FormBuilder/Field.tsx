import { FormField, TextField, RadioField, DropdownField } from "../types";

type Props = {
  deleteFieldCB(id: string): void;
  handleTitleChangeCB(id: string, label: string): void;
  handleOptionValueChangeCB(
    id: string,
    optionIndex: number,
    value: string
  ): void;
  addOptionCB(id: string): void;
  deleteOptionCB(id: string, optionIndex: number): void;
};

export default function Field(props: { data: FormField; cb: Props }) {
  switch (props.data.kind) {
    case "text":
      return (
        <div className='flex my-8'>
          <RegularInput data={props.data} cb={props.cb} />
          <DeleteButton
            id={props.data.id}
            deleteFieldCB={props.cb.deleteFieldCB}
          />
        </div>
      );
    case "dropdown":
      return (
        <div className='flex my-8'>
          <MultiOptionInput data={props.data} cb={props.cb} />
          <DeleteButton
            id={props.data.id}
            deleteFieldCB={props.cb.deleteFieldCB}
          />
        </div>
      );

    case "radio":
      return (
        <div className='flex my-8'>
          <MultiOptionInput data={props.data} cb={props.cb} />
          <DeleteButton
            id={props.data.id}
            deleteFieldCB={props.cb.deleteFieldCB}
          />
        </div>
      );
    default:
      return null;
  }
}

// Use this for text, email, number, etc. fields that don't have options
const RegularInput = (props: { data: TextField; cb: Props }) => {
  return (
    <div className='flex flex-col p-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 flex-1'>
      <p className='m-2 text-stone-600'>{props.data.fieldType}</p>
      <input
        value={props.data.label}
        onChange={(e) => {
          props.cb.handleTitleChangeCB(props.data.id, e.target.value);
        }}
        type='text'
        id={props.data.label}
        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
      />
    </div>
  );
};

// Use this for radio, dropdown and silimar fields that have options
const MultiOptionInput = (props: {
  data: DropdownField | RadioField;
  cb: Props;
}) => {
  return (
    <div className='flex flex-col p-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 flex-1'>
      <p className='m-2 text-stone-600'>{props.data.kind}</p>
      <input
        type='text'
        value={props.data.label}
        onChange={(e) => {
          props.cb.handleTitleChangeCB(props.data.id, e.target.value);
        }}
        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
      />

      {props.data.options.length > 0 && (
        <b className='m-2 text-stone-600'>Options</b>
      )}

      {props.data.options.map((option) => {
        return (
          <div
            className='flex items-center'
            key={props.data.options.indexOf(option)}
          >
            <input
              type='text'
              value={option}
              onChange={(e) => {
                props.cb.handleOptionValueChangeCB(
                  props.data.id,
                  props.data.options.indexOf(option),
                  e.target.value
                );
              }}
              className='p-2 border border-gray-300 mt-1 rounded-md focus:outline-none focus:border-blue-500 flex-1'
            />
            <DeleteOptionButton
              id={props.data.id}
              optionIndex={props.data.options.indexOf(option)}
              deleteOptionCB={props.cb.deleteOptionCB}
            />
          </div>
        );
      })}

      {props.data.options.length < 2 && (
        <div className='bg-red-500 text-white p-2 rounded my-2'>
          Minimum of 2 options required
        </div>
      )}

      <AddOptionButton id={props.data.id} addOptionCB={props.cb.addOptionCB} />
    </div>
  );
};

// function Textarea(props: Props) {
//   return (
//     <>
//       <label htmlFor={props.label} className='block mt-4'>
//         {props.label}
//       </label>
//       <div className='flex mt-2'>
//         <textarea
//           value={props.value}
//           onChange={(e) => {
//             props.handleFieldChangeCB(props.id, e.target.value);
//           }}
//           id={props.label}
//           className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
//         ></textarea>
//         <DeleteButton {...props} />
//       </div>
//     </>
//   );
// }

function DeleteButton(props: {
  id: string;
  deleteFieldCB: (id: string) => void;
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

const AddOptionButton = (props: {
  id: string;
  addOptionCB: (id: string) => void;
}) => {
  return (
    <div className='flex mt-4 py-4 border-y-2 border-dashed border-stone-400'>
      <button
        type='button'
        className='flex-1 ml-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
        onClick={() => props.addOptionCB(props.id)}
      >
        New Option
      </button>
    </div>
  );
};

const DeleteOptionButton = (props: {
  id: string;
  optionIndex: number;
  deleteOptionCB: (id: string, index: number) => void;
}) => {
  return (
    <button
      type='button'
      className='ml-2 p-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'
      onClick={() => props.deleteOptionCB(props.id, props.optionIndex)}
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
};
