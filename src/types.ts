export type TextFieldTypes =
  | "text"
  | "email"
  | "date"
  | "tel"
  | "number"
  | "password"
  | "textarea";

export type FieldTypes = TextFieldTypes | "dropdown" | "radio";

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

export type RadioField = {
  kind: "radio";
  id: number;
  label: string;
  options: string[];
  value: string;
};

export type FormField = TextField | DropdownField | RadioField;

export interface Form {
  id: number;
  title: string;
  fields: FormField[];
}

// use for fields like text, email, date, tel, number, password, etc
export type SingleValueResponseField = {
  label: string;
  value: string;
};

// use for fields like dropdown and checkbox
export type MultiValueResponseField = {
  label: string;
  value: string[];
};

export type ResponseField = SingleValueResponseField | MultiValueResponseField;

export type FormResponse = {
  id: number;
  formId: number;
  fields: ResponseField[];
};
