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
  values: string[];
};

export type FormField = TextField | DropdownField;

export interface Form {
  id: number;
  title: string;
  fields: FormField[];
}

// Trimmed down to remove irrelevant fields of FormField
export interface ResponseField {
  label: string;
  value: string;
}
export interface FormResponse {
  id: number;
  formId: number;
  fields: ResponseField[];
}
