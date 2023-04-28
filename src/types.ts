export type TextFieldTypes =
  | "text"
  | "email"
  | "date"
  | "tel"
  | "number"
  | "password"
  | "textarea";

export type FieldTypes = TextFieldTypes | "dropdown";

export type TextField = {
  kind: "text";
  id: number;
  label: string;
  fieldType: TextFieldTypes;
  value: string;
};

export type DropdownField = {
  kind: "dropdown";
  id: number;
  label: string;
  options: string[];
  value: string[];
};

export type FormField = TextField | DropdownField;

export interface Form {
  id: number;
  title: string;
  fields: FormField[];
}

// Trimmed down to remove irrelevant fields of FormField
export type TextResponseField = {
  label: string;
  value: string;
};

export type DropdownResponseField = {
  label: string;
  value: string[];
};

export type ResponseField = TextResponseField | DropdownResponseField;

export type FormResponse = {
  id: number;
  formId: number;
  fields: ResponseField[];
};
