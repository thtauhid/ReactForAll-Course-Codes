import { TrashIcon } from "@heroicons/react/24/outline";
import { Field } from "../../../../types/formTypes";
import AddOption from "./AddOption";

type Props = {
  data: Field;
  updateLabelCB: (id: number, label: string) => void;
  addOptionCB: (field_pk: Field["id"], option: string) => void;
  deleteOptionCB: (field_pk: number, option: string) => void;
  updateOptionCB: (
    field_pk: Field["id"],
    old_value: string,
    new_value: string
  ) => void;
};

export default function MultiOptionInput(props: Props) {
  return (
    <div className='flex flex-col p-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 flex-1'>
      <p className='m-2 text-stone-600'>{props.data.kind}</p>
      <input
        type='text'
        value={props.data.label}
        onChange={(e) => {
          props.updateLabelCB(props.data.id!, e.target.value);
        }}
        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
      />

      {
        /* Check if options is not null */
        props.data.options && <b className='my-2 text-stone-600'>Options</b>
      }

      {props.data.options?.map((option, idx) => {
        return (
          <div className='flex items-center' key={idx}>
            <input
              type='text'
              value={option}
              onChange={(e) => {
                props.updateOptionCB(props.data.id!, option, e.target.value);
              }}
              className='p-2 border border-gray-300 mt-1 rounded-md focus:outline-none focus:border-blue-500 flex-1'
            />

            <DeleteOptionButton
              field={props}
              option={option}
              deleteOptionCB={props.deleteOptionCB}
            />
          </div>
        );
      })}

      {
        /* Check if options is not null */
        props.data.options ? (
          props.data.options.length < 2 && (
            <span className='bg-red-500 text-sm text-white p-2 rounded my-2'>
              Minimum 2 options required
            </span>
          )
        ) : (
          <span className='bg-red-500 text-sm text-white p-2 rounded my-2'>
            Minimum 2 options required
          </span>
        )
      }

      <AddOption {...props} />
    </div>
  );
}

const DeleteOptionButton = (props: {
  field: Props;
  option: string;
  deleteOptionCB: (field_pk: number, option: string) => void;
}) => {
  const handleDelete = async () => {
    props.deleteOptionCB(props.field.data.id!, props.option);
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
};
