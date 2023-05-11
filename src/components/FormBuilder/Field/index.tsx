import { Field as IField } from "../../../types/formTypes";
import TextInput from "./TextInput";
import MultiOptionInput from "./MultiOptionInput";
import DeleteButton from "./DeleteField";

type Props = {
  form_pk: number;
  data: IField;
  deleteFieldCB: (field_pk: IField["id"]) => void;
};

export default function Field(props: Props) {
  switch (props.data.kind) {
    case "TEXT":
      return (
        <div className='flex my-8'>
          <TextInput {...props} />
          <DeleteButton
            field_pk={props.data.id}
            deleteFieldCB={props.deleteFieldCB}
          />
        </div>
      );
    case "DROPDOWN":
      return (
        <div className='flex my-8'>
          <MultiOptionInput {...props} />
          <DeleteButton
            field_pk={props.data.id}
            deleteFieldCB={props.deleteFieldCB}
          />
        </div>
      );

    case "RADIO":
      return (
        <div className='flex my-8'>
          <MultiOptionInput {...props} />
          <DeleteButton
            field_pk={props.data.id}
            deleteFieldCB={props.deleteFieldCB}
          />
        </div>
      );
    default:
      return null;
  }
}
