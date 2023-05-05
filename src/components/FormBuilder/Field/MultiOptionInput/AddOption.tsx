import { useState } from "react";
import { Field } from "../../../../types/formTypes";
import { addOption } from "../../../../utils/apiUtils";

type Props = {
  data: Field;
};

const addNewOption = async (
  field_pk: number,
  id: number,
  option: Field["options"]
) => {
  const data = await addOption(field_pk, id, option);
  console.log(data);
};

export default function AddOption(props: Props) {
  const [option, setOption] = useState<string>("");

  const handleAddOption = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // add new option in options array
    let updatedOptions;
    if (!props.data.options) {
      updatedOptions = [option];
    } else updatedOptions = [...props.data.options!, option];

    addNewOption(51, props.data.id!, updatedOptions);
  };
  return (
    <form
      className='flex my-2 py-4 border-y-2 border-dashed border-stone-400'
      onSubmit={handleAddOption}
    >
      <input
        type='text'
        value={option}
        onChange={(e) => setOption(e.target.value)}
        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
      />
      <button
        type='submit'
        className='flex-1 ml-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
      >
        Add Option
      </button>
    </form>
  );
}
