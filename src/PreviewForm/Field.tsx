import Multiselect from "multiselect-react-dropdown";

import {
  FormField,
  ResponseField,
  TextField,
  DropdownField as IDropdownField,
} from "../types";

type Props = {
  fieldData: FormField;
  responseData: ResponseField;
  updateFieldDataCB: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  updateMultiselectDataCB: (selectedList: any) => void;
};

export default function Field(props: Props) {
  switch (props.fieldData.kind) {
    case "text":
      return <TextFields {...props} />;
    case "dropdown":
      return <DropdownField {...props} />;
    default:
      return <div></div>;
  }
}

const TextFields = (props: Props) => {
  // type cast to TextField
  const fieldData = props.fieldData as TextField;

  switch (fieldData.fieldType) {
    case "textarea":
      return <TextAreaField {...props} />;
    default:
      return (
        <>
          <label htmlFor={fieldData.label}>{fieldData.label}</label>
          <input
            type={fieldData.fieldType}
            name={fieldData.label}
            id={fieldData.label}
            className='mt-2 p-2 border border-stone-500 rounded-md focus:outline-none focus:border-blue-500'
            onChange={props.updateFieldDataCB}
            value={props.responseData.value}
          />
        </>
      );
  }
};

const TextAreaField = (props: Props) => {
  return (
    <>
      <label htmlFor={props.fieldData.label}>{props.fieldData.label}</label>
      <textarea
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
  const fieldData = props.fieldData as IDropdownField;

  type Option = {
    value: string;
  };

  const options = fieldData.options.map((value: string) => ({
    value,
  }));

  const handleChange = (selectedList: Option[]) => {
    const selectedOptions = selectedList.map((option: Option) => option.value);
    console.log(selectedOptions);

    props.updateMultiselectDataCB(selectedOptions);
  };

  return (
    <>
      <label htmlFor={fieldData.label}>{fieldData.label}</label>
      <Multiselect
        displayValue='value'
        options={options}
        showCheckbox
        onSelect={handleChange}
        onRemove={handleChange}
        showArrow
      />
    </>
  );
};