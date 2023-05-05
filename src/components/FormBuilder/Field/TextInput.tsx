import { Field } from "../../../types/formTypes";
import { useEffect, useState } from "react";
import { updateLabel } from "../../../utils/apiUtils";

type Props = {
  form_pk: number;
  data: Field;
};

const updateFormLabel = async (form_pk: number, id: number, label: string) => {
  const update = await updateLabel(form_pk, id, label);
  console.log(update);
};

export default function TextInput(props: Props) {
  const [label, setLabel] = useState(props.data.label);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateFormLabel(props.form_pk, props.data.id!, label);
    }, 2500);

    return () => clearTimeout(timer);
  }, [label, props.data.id, props.form_pk]);

  return (
    <div className='flex flex-col p-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 flex-1'>
      <p className='m-2 text-stone-600'>{props.data.kind}</p>
      <input
        value={label}
        onChange={(e) => {
          setLabel(e.target.value);
        }}
        type='text'
        id={props.data.label}
        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
      />
    </div>
  );
}
