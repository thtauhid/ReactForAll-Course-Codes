import { useEffect, useReducer } from "react";
import { Pagination } from "../../types/common";
import { Field, Form, Submission } from "../../types/formTypes";
import { loadForm, loadFormFields } from "../../utils/apiUtils";

type State = {
  form: Form;
  fields: Field[];
  submission: Submission;
  currentField: number;
};

type Initializer = {
  type: "INITIALIZE";
  payload: State;
};

type UpdateFieldAction = {
  type: "UPDATE_FIELD";
  value: string;
};

// type UpdateMultiselectFieldAction = {
//   type: "UPDATE_MULTISELECT_FIELD";
//   selectedList: string[];
// };

type NextFieldAction = {
  type: "NEXT_FIELD";
};

type PreviousFieldAction = {
  type: "PREVIOUS_FIELD";
};

type FormAction =
  | Initializer
  | UpdateFieldAction
  // | UpdateMultiselectFieldAction
  | NextFieldAction
  | PreviousFieldAction;

const reducer = (state: State, action: FormAction) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        ...action.payload,
      };

    case "UPDATE_FIELD": {
      let updatedAnswers = [...state.submission.answers];

      // update the response data
      updatedAnswers[state.currentField] = {
        form_field: state.fields[state.currentField].id!,
        value: action.value,
      };

      return {
        ...state,
        submission: {
          ...state.submission,
          answers: updatedAnswers,
        },
      };
    }
    // case "UPDATE_MULTISELECT_FIELD": {
    //   let newResponseData = [...state.responseData];

    //   // update the response data
    //   newResponseData[state.currentField] = {
    //     label: state.formData.fields[state.currentField].label,
    //     value: action.selectedList,
    //   };

    //   return {
    //     ...state,
    //     responseData: newResponseData,
    //   };
    // }
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

const getForm = async (id: number) => {
  const form: Form = await loadForm(id);
  return form;
};

const getFields = async (id: number) => {
  const fields: Pagination<Field> = await loadFormFields(id);
  return fields.results;
};

const prepareSubmission = (form: Form, fields: Field[]) => {
  const submission: Submission = {
    form: form,
    answers: fields.map((field) => {
      return {
        form_field: field.id!,
        value: "",
      };
    }),
  };
  return submission;
};

const loadInitialState = async (form_pk: number) => {
  const form = await getForm(form_pk);
  const fields = await getFields(form_pk);
  const submission = prepareSubmission(form, fields);

  return {
    form,
    fields,
    submission,
    currentField: 0,
  };
};

export default function NewPreviewForm(props: { form_pk: number }) {
  const [state, dispatch] = useReducer(reducer, {
    form: {} as Form,
    fields: [] as Field[],
    submission: {} as Submission,
    currentField: 0,
  });

  useEffect(() => {
    loadInitialState(props.form_pk).then((initialState) => {
      dispatch({ type: "INITIALIZE", payload: initialState });
    });
  }, [props.form_pk]);

  return (
    <>
      <h1 className='text-center font-bold text-3xl'>{state.form.title}</h1>
      <p className='text-justify mt-2'>{state.form.description}</p>
      <div className='my-4 border border-stone-500'></div>
      <div className='flex flex-col'>
        {state.fields.length > 0 ? (
          // <Field
          //   fieldData={state.formData.fields[state.currentField]}
          //   responseData={state.responseData[state.currentField]}
          //   updateFieldDataCB={(
          //     event:
          //       | React.ChangeEvent<HTMLInputElement>
          //       | React.ChangeEvent<HTMLTextAreaElement>
          //   ) => {
          //     dispatch({
          //       type: "UPDATE_FIELD",
          //       value: (event.target as HTMLInputElement).value,
          //     });
          //   }}
          //   updateMultiselectDataCB={(selectedList: string[]) => {
          //     dispatch({
          //       type: "UPDATE_MULTISELECT_FIELD",
          //       selectedList: selectedList,
          //     });
          //   }}
          // />
          "Field Data"
        ) : state.fields.length === 0 ? (
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

        {state.currentField < state.fields.length - 1 ? (
          <button
            onClick={() => {
              dispatch({ type: "NEXT_FIELD" });
            }}
            className='p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-center'
          >
            Next
          </button>
        ) : state.currentField === state.fields.length - 1 ? (
          <button
            // onClick={submitForm}
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