import { useState } from "react";
import { Field } from "../../../../types/formTypes";

type Props = {
  data: Field;
  addOptionCB: (field_pk: Field["id"], option: string) => void;
};

export default function AddOption(props: Props) {
  const [option, setOption] = useState<string>("");

  const handleAddOption = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.addOptionCB(props.data.id!, option);

    setOption("");
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
        placeholder='Enter new option'
      />
      <button
        type='submit'
        className='flex-1 ml-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 focus:outline-1 focus:outline-black'
      >
        Add Option
      </button>
    </form>
  );
}
