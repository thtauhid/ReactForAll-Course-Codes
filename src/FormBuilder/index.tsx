import { useEffect, useReducer, useState } from "react";
import Field from "./Field";

import { Form, FieldTypes, FormField, DropdownField } from "../types/formTypes";
import { Link, navigate } from "raviger";

import { v4 as uuidv4 } from "uuid";

const loadFormData = (formId: string) => {
  const data = localStorage.getItem("forms");
  if (data) {
    const dataJSON = JSON.parse(data);

    // find the corresponding form of the id
    const form = dataJSON.find((form: Form) => form.formId === formId);
    if (form) {
      return form;
    }
  }

  navigate("/404");
};

const saveFormData = (formData: Form) => {
  const data = localStorage.getItem("forms");
  if (data) {
    const dataJSON = JSON.parse(data);
    const newData = dataJSON.map((form: Form) => {
      if (form.formId === formData.formId) {
        return formData;
      }

      return form;
    });

    localStorage.setItem("forms", JSON.stringify(newData));
  }
};

const createFormField = (fieldType: FieldTypes, label: string) => {
  let newField: FormField;

  switch (fieldType) {
    case "dropdown":
      newField = {
        kind: "dropdown",
        fieldId: uuidv4(),
        label,
        options: [
          { optionId: uuidv4(), value: "Option 1" },
          { optionId: uuidv4(), value: "Option 2" },
          { optionId: uuidv4(), value: "Option 3" },
        ],
        value: [],
      };
      break;
    case "radio":
      newField = {
        kind: "radio",
        fieldId: uuidv4(),
        label,
        options: [
          { optionId: uuidv4(), value: "Option 1" },
          { optionId: uuidv4(), value: "Option 2" },
          { optionId: uuidv4(), value: "Option 3" },
        ],
        value: "",
      };
      break;
    default:
      newField = {
        kind: "text",
        fieldId: uuidv4(),
        label,
        fieldType,
        value: "",
      };
  }

  return newField;
};

type UpdateTitleAction = {
  type: "UPDATE_TITLE";
  title: string;
};

type AddFieldAction = {
  type: "ADD_FIELD";
  fieldType: FieldTypes;
  label: string;
};
type RemoveFieldAction = {
  type: "REMOVE_FIELD";
  fieldId: string;
};

type UpdateFieldLabelAction = {
  type: "UPDATE_FIELD_LABEL";
  fieldId: string;
  label: string;
};

type AddOptionAction = {
  type: "ADD_OPTION";
  fieldId: string;
};

type RemoveOptionAction = {
  type: "REMOVE_OPTION";
  fieldId: string;
  optionId: string;
};

type UpdateOptionAction = {
  type: "UPDATE_OPTION";
  fieldId: string;
  optionId: string;
  value: string;
};

type FormAction =
  | UpdateTitleAction
  | AddFieldAction
  | RemoveFieldAction
  | UpdateFieldLabelAction
  | AddOptionAction
  | RemoveOptionAction
  | UpdateOptionAction;

const reducer = (state: Form, action: FormAction) => {
  switch (action.type) {
    case "UPDATE_TITLE": {
      return {
        ...state,
        title: action.title,
      };
    }
    case "ADD_FIELD": {
      const newField = createFormField(action.fieldType, action.label);

      return {
        ...state,
        fields: [...state.fields, newField],
      };
    }
    case "REMOVE_FIELD": {
      return {
        ...state,
        fields: state.fields.filter(
          (field) => field.fieldId !== action.fieldId
        ),
      };
    }
    case "UPDATE_FIELD_LABEL": {
      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.fieldId === action.fieldId) {
            return {
              ...field,
              label: action.label,
            };
          }

          return field;
        }),
      };
    }
    case "ADD_OPTION": {
      let formField: DropdownField = state.fields.find(
        (field) => field.fieldId === action.fieldId
      ) as DropdownField;

      formField.options = [
        ...formField.options,
        { optionId: uuidv4(), value: "New Option" },
      ];

      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.fieldId === action.fieldId) {
            return formField;
          }

          return field;
        }),
      };
    }
    case "REMOVE_OPTION": {
      let formField: DropdownField = state.fields.find(
        (field) => field.fieldId === action.fieldId
      ) as DropdownField;

      formField.options = formField.options.filter(
        (option) => option.optionId !== action.optionId
      );

      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.fieldId === action.fieldId) {
            return formField;
          }

          return field;
        }),
      };
    }
    case "UPDATE_OPTION": {
      let formField: DropdownField = state.fields.find(
        (field) => field.fieldId === action.fieldId
      ) as DropdownField;

      formField.options = formField.options.map((option) => {
        if (option.optionId === action.optionId) {
          return {
            ...option,
            value: action.value,
          };
        }

        return option;
      });

      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.fieldId === action.fieldId) {
            return formField;
          }

          return field;
        }),
      };
    }
    default:
      return state;
  }
};

export default function FormBuilder(props: { formId: string }) {
  const [state, dispatch] = useReducer(reducer, null, () =>
    loadFormData(props.formId)
  );

  // auto save form data
  useEffect(() => {
    saveFormData(state);
  }, [state]);

  // manually save form data
  const manualSave = () => {
    saveFormData(state);
  };

  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState<FieldTypes>("text");

  const handleFieldTypeChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setNewFieldType(e.currentTarget.value as FieldTypes);
  };

  return (
    <>
      <input
        type='text'
        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full text-3xl '
        placeholder='Form Title'
        value={state.title}
        onChange={(e) =>
          dispatch({ type: "UPDATE_TITLE", title: e.target.value })
        }
      />

      <div className='mt-4 border border-stone-500'></div>

      {state.fields.map((field) => {
        return (
          <Field
            key={field.fieldId}
            data={field}
            cb={{
              changeLabelCB: (fieldId: string, label: string) => {
                dispatch({
                  type: "UPDATE_FIELD_LABEL",
                  fieldId,
                  label,
                });
              },
              deleteFieldCB: (fieldId: string) => {
                dispatch({ type: "REMOVE_FIELD", fieldId });
              },
              addOptionCB: (fieldId: string) => {
                dispatch({ type: "ADD_OPTION", fieldId });
              },

              deleteOptionCB: (fieldId: string, optionId: string) => {
                dispatch({
                  type: "REMOVE_OPTION",
                  fieldId,
                  optionId,
                });
              },
              changeOptionValueCB: (
                fieldId: string,
                optionId: string,
                value: string
              ) => {
                dispatch({
                  type: "UPDATE_OPTION",
                  fieldId,
                  optionId,
                  value,
                });
              },
            }}
          />
        );
      })}
      <div className='flex mt-4 py-4 border-y-2 border-dashed border-stone-400'>
        <select
          id='type'
          className='flex-1 mr-1 p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          value={newFieldType}
          onChange={handleFieldTypeChange}
        >
          <option value='text'>Text</option>
          <option value='email'>Email</option>
          <option value='date'>Date</option>
          <option value='tel'>Phone</option>
          <option value='number'>Number</option>
          <option value='password'>Password</option>
          <option value='textarea'>Textarea</option>
          <option value='dropdown'>Dropdown</option>
          <option value='radio'>Radio</option>
        </select>

        <input
          type='text'
          className='flex-1 ml-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          placeholder='Label'
          value={newFieldLabel}
          onChange={(e) => setNewFieldLabel(e.target.value)}
        />
        <button
          type='button'
          className='ml-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
          onClick={() =>
            dispatch({
              type: "ADD_FIELD",
              fieldType: newFieldType,
              label: newFieldLabel,
            })
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
        </button>
      </div>

      <div className='mt-4 border border-stone-500'></div>

      <div className='flex mt-4'>
        <button
          className='mr-1 flex-1 p-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'
          onClick={manualSave}
        >
          Save
        </button>

        <Link
          href='/'
          className='ml-1 flex-1 p-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 text-center'
        >
          Close
        </Link>
      </div>
      <div className='flex mt-4'>
        <input
          type='text'
          className='flex-1 ml-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          value={`http://localhost:3000/preview/${state.formId}`}
          readOnly
        />
        <Link
          type='button'
          className='ml-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
          href={`/preview/${state.formId}`}
          target='_blank'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
            />
          </svg>
        </Link>
      </div>
    </>
  );
}
