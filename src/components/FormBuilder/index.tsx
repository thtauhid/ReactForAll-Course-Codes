import { useEffect, useReducer } from "react";
import { Field as IField, Form } from "../../types/formTypes";
import { loadForm, loadFormFields } from "../../utils/apiUtils";
import CreateField from "./CreateField";
import { Pagination } from "../../types/common";
import Field from "./Field";
import ShareLink from "./ShareLink";
import { reducer } from "./reducer";

const loadInitialState = async (form_pk: number) => {
  const form: Form = await loadForm(form_pk);
  const fields: Pagination<IField> = await loadFormFields(form_pk);

  return {
    form,
    fields: fields.results,
  };
};

export default function FormBuilder(props: { form_pk: number }) {
  const [state, dispatch] = useReducer(reducer, {
    form: {} as Form,
    fields: [] as IField[],
  });

  useEffect(() => {
    loadInitialState(props.form_pk).then((initialState) => {
      dispatch({ type: "INITIALIZE", payload: initialState });
    });
  }, [props.form_pk]);

  return (
    <div>
      <input
        value={state.form.title}
        onChange={(e) => {
          dispatch({
            type: "UPDATE_TITLE",
            value: e.target.value,
          });
        }}
        placeholder='Title'
        type='text'
        className='text-2xl p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
      />
      <p className='mt-2 text-justify'>{state.form.description}</p>

      <div className='mt-4 border border-stone-500'></div>

      {
        /* Show message if no field are there */

        state.fields.length === 0 && (
          <div className='flex justify-center items-center h-32'>
            <p className='text-2xl text-gray-500'>No fields added yet</p>
          </div>
        )
      }
      {state.fields.map((field) => {
        return <Field key={field.id} form_pk={props.form_pk} data={field} />;
      })}

      <CreateField {...props} />

      <div className='mt-4 border border-stone-500'></div>

      <ShareLink id={props.form_pk} />
    </div>
  );
}
