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

// add option

// delete option

// update option

type FormActions =
  | Initializer
  | UpdateTitleAction
  | UpdateDescriptionAction
  | CreateFieldAction
  | DeleteFieldAction;

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

    default:
      return state;
  }
};
