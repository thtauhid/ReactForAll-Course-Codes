import { useEffect, useState } from "react";
import { Form } from "../../types/formTypes";
import { loadForm } from "../../utils/apiUtils";

const getForm = async (id: number, setFormCB: (value: Form) => void) => {
  const form = await loadForm(id);
  setFormCB(form);
};

export default function NewFormBuilder(props: { form_pk: number }) {
  const [form, setForm] = useState<Form>();

  useEffect(() => {
    getForm(props.form_pk, setForm);
  }, [props.form_pk]);

  return (
    <div>
      <h1 className='text-2xl text-center'>{form?.title}</h1>
      <p className='mt-2 text-justify'>{form?.description}</p>

      <div className='mt-4 border border-stone-500'></div>
    </div>
  );
}
