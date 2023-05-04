import { useReducer } from "react";
import { Form, ResponseField, FormResponse } from "../types/formTypes";
import { navigate } from "raviger";
import Field from "./Field";
import { v4 as uuidv4 } from "uuid";

const loadFormFromLocalStorage = (formId: string) => {
  const data = localStorage.getItem("forms");
  if (!data) return navigate("/404");

  // find the corresponding form of the id
  const dataJSON = JSON.parse(data);
  const form = dataJSON.find((form: Form) => form.formId === formId);
  if (!form) return navigate("/404");

  return form;
};

const loadInitialState = (formId: string) => {
  const form = loadFormFromLocalStorage(formId);
  return {
    currentField: 0,
    formData: form,
    responseData: form.fields.map((field: ResponseField) => ({
      label: field.label,
      value: "",
    })),
  };
};

const saveFormResponseToLocalStorage = (state: Prop) => {
  try {
    // compile form meta data and response data
    const formResponse: FormResponse = {
      responseId: uuidv4(),
      formId: state.formData.formId,
      fields: state.responseData,
    };

    // get form responses from localstorage
    const data = localStorage.getItem("responses");

    // if there are no responses, create a new array
    if (!data) {
      localStorage.setItem("responses", JSON.stringify([formResponse]));
    } else {
      // if there are responses, add the new response to the array
      const dataJSON = JSON.parse(data);
      dataJSON.push(formResponse);
      localStorage.setItem("responses", JSON.stringify(dataJSON));
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

type Prop = {
  currentField: number;
  formData: Form;
  responseData: ResponseField[];
};

type UpdateFieldAction = {
  type: "UPDATE_FIELD";
  // label: string;
  value: string;
};

type UpdateMultiselectFieldAction = {
  type: "UPDATE_MULTISELECT_FIELD";
  selectedList: string[];
};

type NextFieldAction = {
  type: "NEXT_FIELD";
};

type PreviousFieldAction = {
  type: "PREVIOUS_FIELD";
};

type FormAction =
  | UpdateFieldAction
  | UpdateMultiselectFieldAction
  | NextFieldAction
  | PreviousFieldAction;

const reducer = (state: Prop, action: FormAction) => {
  switch (action.type) {
    case "UPDATE_FIELD": {
      let newResponseData = [...state.responseData];

      // update the response data
      newResponseData[state.currentField] = {
        label: state.formData.fields[state.currentField].label,
        value: action.value,
      };

      return {
        ...state,
        responseData: newResponseData,
      };
    }
    case "UPDATE_MULTISELECT_FIELD": {
      let newResponseData = [...state.responseData];

      // update the response data
      newResponseData[state.currentField] = {
        label: state.formData.fields[state.currentField].label,
        value: action.selectedList,
      };

      return {
        ...state,
        responseData: newResponseData,
      };
    }
    case "NEXT_FIELD": {
      return {
        ...state,
        currentField: state.currentField + 1,
      };
    }
    case "PREVIOUS_FIELD": {
      return {
        ...state,
        currentField: state.currentField - 1,
      };
    }
    default:
      return state;
  }
};

export default function PreviewForm(props: { formId: string }) {
  const [state, dispatch] = useReducer(reducer, null, () =>
    loadInitialState(props.formId)
  );

  // submit form
  const submitForm = () => {
    const isFormSaved = saveFormResponseToLocalStorage(state);

    if (isFormSaved) {
      alert("Form submitted!");
      navigate("/");
    } else {
      alert("Error submitting form!");
    }
  };

  // check if all the multiselect fields have at least two option in it
  const checkMultiValueFieldHasAtleastTwoOptions = () => {
    // if there are multiselect fields, check if they have at least two options
    let check = true;
    state.formData.fields.forEach((field) => {
      if (
        (field.kind === "dropdown" || field.kind === "radio") &&
        field.options.length < 2
      )
        check = false;
    });

    return check;
  };

  if (!checkMultiValueFieldHasAtleastTwoOptions())
    return (
      <div className='text-center'>
        <h1 className='text-3xl font-bold'>Error</h1>
        <div className='my-4 border border-stone-500'></div>
        <div className='text-xl'>
          The form is broken. Please contact the form creator.
        </div>
      </div>
    );

  return (
    <>
      <h1 className='text-center font-bold text-3xl'>{state.formData.title}</h1>
      <div className='my-4 border border-stone-500'></div>
      <div className='flex flex-col'>
        {state.responseData.length > 0 ? (
          <Field
            fieldData={state.formData.fields[state.currentField]}
            responseData={state.responseData[state.currentField]}
            updateFieldDataCB={(
              event:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement>
            ) => {
              dispatch({
                type: "UPDATE_FIELD",
                value: (event.target as HTMLInputElement).value,
              });
            }}
            updateMultiselectDataCB={(selectedList: string[]) => {
              dispatch({
                type: "UPDATE_MULTISELECT_FIELD",
                selectedList: selectedList,
              });
            }}
          />
        ) : state.responseData.length === 0 ? (
          <div className='text-center'>No fields found</div>
        ) : (
          <div className='text-center'>Loading...</div>
        )}
      </div>
      <div className='my-4 border border-stone-500'></div>
      <div className='flex items-center justify-between'>
        {state.currentField === 0 ? (
          <div></div>
        ) : (
          <button
            onClick={() => {
              dispatch({ type: "PREVIOUS_FIELD" });
            }}
            className='p-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 text-center'
          >
            Previous
          </button>
        )}

        {state.currentField < state.formData.fields.length - 1 ? (
          <button
            onClick={() => {
              dispatch({ type: "NEXT_FIELD" });
            }}
            className='p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-center'
          >
            Next
          </button>
        ) : state.currentField === state.formData.fields.length - 1 ? (
          <button
            onClick={submitForm}
            className='p-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 text-center'
          >
            Submit
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
