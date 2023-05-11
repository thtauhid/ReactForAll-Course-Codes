import { TrashIcon } from "@heroicons/react/24/outline";
import { Field } from "../../../types/formTypes";

type Props = {
  field_pk: Field["id"];
  deleteFieldCB: (field_pk: Field["id"]) => void;
};

export default function DeleteButton(props: Props) {
  const handleDelete = async () => {
    props.deleteFieldCB(props.field_pk);
  };

  return (
    <button
      type='button'
      className='ml-2 p-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'
      onClick={handleDelete}
    >
      <TrashIcon className='h-6 w-6' aria-hidden='true' />
    </button>
  );
}
