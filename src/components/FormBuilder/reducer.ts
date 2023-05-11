import { Field, Form } from "../../types/formTypes";

type State = {
  form: Form;
  fields: Field[];
};

type Initializer = {
  type: "INITIALIZE";
  payload: State;
};

// update title
type UpdateTitleAction = {
  type: "UPDATE_TITLE";
  value: string;
};

// update description
type UpdateDescriptionAction = {
  type: "UPDATE_DESCRIPTION";
  value: string;
};

// create field
type CreateFieldAction = {
  type: "CREATE_FIELD";
  field: Field;
};

// delete field
type DeleteFieldAction = {
  type: "DELETE_FIELD";
  id: number;
};

// update label
type UpdateLabelAction = {
  type: "UPDATE_LABEL";
  id: number;
  value: string;
};

// add option
type AddOptionAction = {
  type: "ADD_OPTION";
  id: number;
  value: string;
};

// delete option
type DeleteOptionAction = {
  type: "DELETE_OPTION";
  id: number;
  value: string;
};

// update option
type UpdateOptionAction = {
  type: "UPDATE_OPTION";
  id: number;
  old_value: string;
  value: string;
};

type FormActions =
  | Initializer
  | UpdateTitleAction
  | UpdateDescriptionAction
  | CreateFieldAction
  | DeleteFieldAction
  | UpdateLabelAction
  | AddOptionAction
  | DeleteOptionAction
  | UpdateOptionAction;

export const reducer = (state: State, action: FormActions) => {
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;

    case "UPDATE_TITLE":
      return {
        ...state,
        form: {
          ...state.form,
          title: action.value,
        },
      };

    case "UPDATE_DESCRIPTION":
      return {
        ...state,
        form: {
          ...state.form,
          description: action.value,
        },
      };

    case "CREATE_FIELD":
      return {
        ...state,
        fields: [...state.fields, action.field],
      };

    case "DELETE_FIELD":
      return {
        ...state,
        fields: state.fields.filter((field) => field.id !== action.id),
      };

    case "UPDATE_LABEL":
      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.id === action.id) {
            return {
              ...field,
              label: action.value,
            };
          }
          return field;
        }),
      };

    case "ADD_OPTION":
      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.id === action.id) {
            return {
              ...field,
              options: [...field.options!, action.value],
            };
          }
          return field;
        }),
      };

    case "DELETE_OPTION":
      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.id === action.id) {
            return {
              ...field,
              options: field.options!.filter(
                (option) => option !== action.value
              ),
            };
          }
          return field;
        }),
      };

    case "UPDATE_OPTION":
      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.id === action.id) {
            return {
              ...field,
              options: field.options!.map((option) => {
                if (option === action.old_value) {
                  return action.value;
                }
                return option;
              }),
            };
          }
          return field;
        }),
      };

    default:
      return state;
  }
};
