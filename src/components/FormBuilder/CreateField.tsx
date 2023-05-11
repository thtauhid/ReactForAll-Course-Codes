import { useState } from "react";
import { Field } from "../../types/formTypes";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function CreateField(props: {
  createFieldCB: (field: Field) => void;
}) {
  const [newField, setNewField] = useState<Field>({
    kind: "TEXT",
    label: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewField({ ...newField, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.createFieldCB(newField);

    setNewField({ kind: "TEXT", label: "" });
  };

  return (
    <form
      className='flex mt-4 py-4 border-y-2 border-dashed border-stone-400'
      onSubmit={handleSubmit}
    >
      <select
        onChange={handleChange}
        value={newField.kind}
        id='kind'
        name='kind'
        className='flex-1 mr-1 p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
      >
        <option value='TEXT'>Text</option>
        <option value='DROPDOWN'>Dropdown</option>
        <option value='RADIO'>Radio</option>
      </select>

      <input
        onChange={handleChange}
        value={newField.label}
        type='text'
        name='label'
        className='flex-1 ml-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
        placeholder='Label'
      />
      <button
        type='submit'
        className='ml-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
      >
        <PlusIcon className='h-6 w-6' aria-hidden='true' />
      </button>
    </form>
  );
}
