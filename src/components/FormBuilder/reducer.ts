import { Field, Form } from "../../types/formTypes";
import { updateTitle } from "../../utils/apiUtils";

type State = {
  form: Form;
  fields: Field[];
};

type Initializer = {
  type: "INITIALIZE";
  payload: State;
};

type UpdateTitleAction = {
  type: "UPDATE_TITLE";
  value: string;
};

type FormActions = Initializer | UpdateTitleAction;

export const reducer = (state: State, action: FormActions) => {
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;
    case "UPDATE_TITLE":
      updateTitle(state.form.id!, action.value).catch((err) => {
        console.log(err);
      });

      return {
        ...state,
        form: {
          ...state.form,
          title: action.value,
        },
      };
    default:
      return state;
  }
};
