import { Field as IField } from "../../../types/formTypes";
import TextInput from "./TextInput";
import MultiOptionInput from "./MultiOptionInput";
import DeleteButton from "./DeleteField";

type Props = {
  data: IField;
  deleteFieldCB: (field_pk: IField["id"]) => void;
  updateLabelCB: (field_pk: IField["id"], value: string) => void;
  addOptionCB: (field_pk: IField["id"], option: string) => void;
  deleteOptionCB: (field_pk: IField["id"], option: string) => void;
  updateOptionCB: (
    field_pk: IField["id"],
    old_value: string,
    new_value: string
  ) => void;
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
