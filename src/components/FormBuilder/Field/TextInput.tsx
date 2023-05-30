import { Field } from "../../../types/formTypes";

type Props = {
  data: Field;
  updateLabelCB: (id: number, label: string) => void;
};

export default function TextInput(props: Props) {
  return (
    <div className='flex flex-col p-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 flex-1'>
      <p className='m-2 text-stone-600'>{props.data.kind}</p>
      <input
        value={props.data.label}
        onChange={(e) => {
          props.updateLabelCB(props.data.id!, e.target.value);
        }}
        type='text'
        id={props.data.label}
        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
      />
    </div>
  );
}
