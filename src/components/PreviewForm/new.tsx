import { useEffect, useState } from "react";
import { Pagination } from "../../types/common";
import { Field, Form } from "../../types/formTypes";
import { loadForm, loadFormFields } from "../../utils/apiUtils";

const getForm = async (id: number, setFormCB: (value: Form) => void) => {
  const form: Form = await loadForm(id);
  setFormCB(form);
};

const getFields = async (id: number, setFieldsCB: (value: Field[]) => void) => {
  const fields: Pagination<Field> = await loadFormFields(id);
  console.log(fields);
  setFieldsCB(fields.results);
};

export default function NewPreviewForm(props: { form_pk: number }) {
  const [form, setForm] = useState<Form>();
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    getForm(props.form_pk, setForm);
    getFields(props.form_pk, setFields);
  }, [props.form_pk]);

  return (
    <>
      <h1 className='text-center font-bold text-3xl'>{form?.title}</h1>
      <div className='my-4 border border-stone-500'></div>
    </>
  );
}
