import Select, { MultiValue, Options } from "react-select";
import {
  FormField,
  ResponseField,
  TextField,
  TextResponseField,
  DropdownField as IDropdownField,
} from "../types";
import { useState } from "react";

type Props = {
  fieldData: FormField;
  responseData: ResponseField;
  updateFieldDataCB: (
    e: React.ChangeEventHandler<HTMLInputElement> | any
  ) => void;
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
  // type cast to DropdownField
  const fieldData = props.fieldData as IDropdownField;

  const [selectedOptions, setSelectedOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const handleOptionUpdate = (options: Options) => {
    setSelectedOptions(options as { label: string; value: string }[]);
  };

  return (
    <>
      <label htmlFor={fieldData.label}>{fieldData.label}</label>
      <Select
        options={fieldData.options.map((option: string) => ({
          label: option,
          value: option,
        }))}
        isMulti
        className='mt-2'
        onChange={handleOptionUpdate}
      />
    </>
  );
};
