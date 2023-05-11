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

// delete field

// update label

// add option

// delete option

// update option

type FormActions = Initializer | UpdateTitleAction | UpdateDescriptionAction;

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

    default:
      return state;
  }
};
