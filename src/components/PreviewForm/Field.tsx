import Multiselect from "multiselect-react-dropdown";

// import {
//   FormField,
//   ResponseField,
//   Option,
// } from "../../types/oldFormTypes";
import { Field as IField, Submission } from "../../types/formTypes";

type Props = {
  fieldData: IField;
  responseData: Submission["answers"][number];
  updateFieldDataCB: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  updateMultiselectDataCB: (selectedOption: string) => void;
};

export default function Field(props: Props) {
  switch (props.fieldData.kind) {
    case "TEXT":
      return <TextFields {...props} />;
    case "DROPDOWN":
      return <DropdownField {...props} />;
    // case "RADIO":
    //   return <RadioField {...props} />;
    default:
      return <div></div>;
  }
}

const TextFields = (props: Props) => {
  // type cast to TextField

  return (
    <>
      <label htmlFor={props.fieldData.label}>{props.fieldData.label}</label>
      <input
        type='text'
        name={props.fieldData.label}
        id={props.fieldData.label}
        className='mt-2 p-2 border border-stone-500 rounded-md focus:outline-none focus:border-blue-500'
        onChange={props.updateFieldDataCB}
        value={props.responseData.value}
      />
    </>
  );
};

const DropdownField = (props: Props) => {
  type Option = {
    value: string;
  };

  const options = props.fieldData.options?.map((option) => {
    return {
      value: option,
    };
  });

  const handleChange = (_: Option[], selectedOption: Option) => {
    console.log(selectedOption);

    props.updateMultiselectDataCB(selectedOption.value);
  };

  return (
    <>
      <label htmlFor={props.fieldData.label}>{props.fieldData.label}</label>
      <Multiselect
        displayValue='value'
        options={options}
        onSelect={handleChange}
        onRemove={handleChange}
        showArrow
        singleSelect
        emptyRecordMsg='Select Option'
      />
    </>
  );
};

// const RadioField = (props: Props) => {
//   type Option = {
//     value: string;
//   };

//   return (
//     <>
//       <label htmlFor={props.fieldData.label}>{props.fieldData.label}</label>
//       {props.fieldData.options?.map((option: Option) => (
//         <div key={option}>
//           <input
//             type='radio'
//             name={props.fieldData.label}
//             id={option.optionId}
//             value={option.value}
//             className='mr-2'
//             onChange={props.updateFieldDataCB}
//           />
//           <label htmlFor={option.optionId}>{option.value}</label>
//         </div>
//       ))}
//     </>
//   );
// };
