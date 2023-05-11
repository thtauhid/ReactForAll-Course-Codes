import { useEffect, useReducer } from "react";
import { Field as IField, Form } from "../../types/formTypes";
import { loadForm, loadFormFields } from "../../utils/apiUtils";
import CreateField from "./CreateField";
import { Pagination } from "../../types/common";
import Field from "./Field";
import ShareLink from "./ShareLink";
import { reducer } from "./reducer";
import {
  updateTitle,
  updateDescription,
  createNewField,
  deleteField,
  updateLabel,
  updateOptions,
} from "../../utils/apiUtils";

type State = {
  form: Form;
  fields: IField[];
};

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

  const updateTitleCB = (state: State, value: string) => {
    // update in state
    dispatch({
      type: "UPDATE_TITLE",
      value,
    });

    // update in backend
    updateTitle(state.form.id!, value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateDescriptionCB = (state: State, value: string) => {
    // update in state
    dispatch({
      type: "UPDATE_DESCRIPTION",
      value,
    });

    // update in backend
    updateDescription(state.form.id!, value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createFieldCB = (state: State, field: IField) => {
    // update in state
    dispatch({
      type: "CREATE_FIELD",
      field,
    });

    // update in backend
    createNewField(state.form.id!, field)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFieldCB = (state: State, id: IField["id"]) => {
    // update in state
    dispatch({
      type: "DELETE_FIELD",
      id: id!,
    });

    // update in backend
    deleteField(state.form.id!, id!)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateLabelCB = (state: State, id: IField["id"], value: string) => {
    // update in state
    dispatch({
      type: "UPDATE_LABEL",
      id: id!,
      value,
    });

    // update in backend
    updateLabel(state.form.id!, id!, value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addOptionCB = (state: State, id: IField["id"], option: string) => {
    // update in state
    dispatch({
      type: "ADD_OPTION",
      id: id!,
      value: option,
    });

    // add the option in options array
    const field = state.fields.find((field) => field.id === id);

    let options: IField["options"];

    // check if options is null
    if (field!.options === null) {
      options = [option];
    } else {
      options = [...field!.options!, option];
    }

    // update in backend
    updateOptions(state.form.id!, id!, options);
  };

  const deleteOptionCB = (state: State, id: IField["id"], option: string) => {
    // update in state
    dispatch({
      type: "DELETE_OPTION",
      id: id!,
      value: option,
    });

    // remove the option from options array
    const field = state.fields.find((field) => field.id === id);
    const options = field!.options!.filter((opt) => opt !== option);

    // update in backend
    updateOptions(state.form.id!, id!, options);
  };

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
          updateTitleCB(state, e.target.value);
        }}
        placeholder='Title'
        type='text'
        className='text-2xl p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
      />
      <p className='mt-2 text-justify'>
        <textarea
          rows={5}
          value={state.form.description}
          onChange={(e) => {
            updateDescriptionCB(state, e.target.value);
          }}
          className='p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1'
        />
      </p>

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
        return (
          <Field
            key={field.id}
            data={field}
            deleteFieldCB={(id: IField["id"]) => {
              deleteFieldCB(state, id);
            }}
            updateLabelCB={(id: IField["id"], value: string) => {
              updateLabelCB(state, id, value);
            }}
            addOptionCB={(id: IField["id"], option: string) => {
              addOptionCB(state, id, option);
            }}
            deleteOptionCB={(id: IField["id"], option: string) => {
              deleteOptionCB(state, id, option);
            }}
          />
        );
      })}

      <CreateField
        createFieldCB={(field: IField) => {
          createFieldCB(state, field);
        }}
      />

      <div className='mt-4 border border-stone-500'></div>

      <ShareLink id={props.form_pk} />
    </div>
  );
}
