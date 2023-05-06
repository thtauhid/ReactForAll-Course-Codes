import { useEffect, useState } from "react";
import { Field as IField, Form } from "../../types/formTypes";
import { loadForm, loadFormFields } from "../../utils/apiUtils";
import CreateField from "./CreateField";
import { Pagination } from "../../types/common";
import Field from "./Field";

const getForm = async (id: number, setFormCB: (value: Form) => void) => {
  const form: Form = await loadForm(id);
  setFormCB(form);
};

const getFields = async (
  id: number,
  setFieldsCB: (value: IField[]) => void
) => {
  const fields: Pagination<IField> = await loadFormFields(id);
  console.log(fields);
  setFieldsCB(fields.results);
};

export default function FormBuilder(props: { form_pk: number }) {
  const [form, setForm] = useState<Form>();
  const [fields, setFields] = useState<IField[]>([]);

  useEffect(() => {
    getForm(props.form_pk, setForm);
    getFields(props.form_pk, setFields);
  }, [props.form_pk]);

  return (
    <div>
      <h1 className='text-2xl text-center'>{form?.title}</h1>
      <p className='mt-2 text-justify'>{form?.description}</p>

      <div className='mt-4 border border-stone-500'></div>

      {
        /* Show message if no field are there */

        fields.length === 0 && (
          <div className='flex justify-center items-center h-32'>
            <p className='text-2xl text-gray-500'>No fields added yet</p>
          </div>
        )
      }
      {fields.map((field) => {
        return <Field key={field.id} form_pk={props.form_pk} data={field} />;
      })}
      <div className='mt-4 border border-stone-500'></div>

      <CreateField {...props} />
    </div>
  );
}
