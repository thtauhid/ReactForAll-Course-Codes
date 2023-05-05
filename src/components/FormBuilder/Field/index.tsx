import { Field as IField } from "../../../types/formTypes";
import AddOption from "./AddOption";

type Props = {
  data: IField;
};

export default function Field(props: Props) {
  switch (props.data.kind) {
    case "TEXT":
      return (
        <div className='flex my-8'>
          <RegularInput {...props} />
        </div>
      );
    case "DROPDOWN":
      return (
        <div className='flex my-8'>
          <MultiOptionInput {...props} />
        </div>
      );

    case "RADIO":
      return (
        <div className='flex my-8'>
          <MultiOptionInput {...props} />
        </div>
      );
    default:
      return null;
  }
}

const RegularInput = (props: Props) => {
  return (
    <div className='flex flex-col p-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 flex-1'>
      <p className='m-2 text-stone-600'>{props.data.kind}</p>
      <input
        value={props.data.label}
        type='text'
        id={props.data.label}
        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
      />
    </div>
  );
};

const MultiOptionInput = (props: Props) => {
  return (
    <div className='flex flex-col p-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 flex-1'>
      <p className='m-2 text-stone-600'>{props.data.kind}</p>
      <input
        type='text'
        value={props.data.label}
        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
      />

      {
        /* Check if options is not null */
        props.data.options ? (
          /* Check if options is not empty */
          props.data.options.length > 0 && (
            <b className='m-2 text-stone-600'>Options</b>
          )
        ) : (
          <div className='bg-red-500 text-white p-2 rounded my-4'>
            Options not yet added
          </div>
        )
      }

      {props.data.options?.map((option) => {
        return (
          <div className='flex items-center' key={option}>
            <input
              type='text'
              value={option}
              className='p-2 border border-gray-300 mt-1 rounded-md focus:outline-none focus:border-blue-500 flex-1'
            />
          </div>
        );
      })}

      <AddOption {...props} />
    </div>
  );
};

// // function Textarea(props: Props) {
// //   return (
// //     <>
// //       <label htmlFor={props.label} className='block mt-4'>
// //         {props.label}
// //       </label>
// //       <div className='flex mt-2'>
// //         <textarea
// //           value={props.value}
// //           onChange={(e) => {
// //             props.handleFieldChangeCB(props.id, e.target.value);
// //           }}
// //           id={props.label}
// //           className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
// //         ></textarea>
// //         <DeleteButton {...props} />
// //       </div>
// //     </>
// //   );
// // }

// function DeleteButton(props: {
//   fieldId: string;
//   deleteFieldCB: (fieldId: string) => void;
// }) {
//   return (
//     <button
//       type='button'
//       className='ml-2 p-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'
//       onClick={() => props.deleteFieldCB(props.fieldId)}
//     >
//       <svg
//         xmlns='http://www.w3.org/2000/svg'
//         fill='none'
//         viewBox='0 0 24 24'
//         strokeWidth={1.5}
//         stroke='currentColor'
//         className='w-6 h-6'
//       >
//         <path
//           strokeLinecap='round'
//           strokeLinejoin='round'
//           d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
//         />
//       </svg>
//     </button>
//   );
// }

// const DeleteOptionButton = (props: {
//   fieldId: string;
//   optionId: string;
//   deleteOptionCB: (fieldId: string, optionId: string) => void;
// }) => {
//   return (
//     <button
//       type='button'
//       className='ml-2 p-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'
//       onClick={() => props.deleteOptionCB(props.fieldId, props.optionId)}
//     >
//       <svg
//         xmlns='http://www.w3.org/2000/svg'
//         fill='none'
//         viewBox='0 0 24 24'
//         strokeWidth={1.5}
//         stroke='currentColor'
//         className='w-6 h-6'
//       >
//         <path
//           strokeLinecap='round'
//           strokeLinejoin='round'
//           d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
//         />
//       </svg>
//     </button>
//   );
// };
