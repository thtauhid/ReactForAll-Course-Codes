export type TextFieldTypes =
  | "text"
  | "email"
  | "date"
  | "tel"
  | "number"
  | "password"
  | "textarea";

export type FieldTypes = TextFieldTypes | "dropdown" | "radio";

export type Option = {
  optionId: string;
  value: string;
};

export type TextField = {
  kind: "text";
  fieldId: string;
  label: string;
  fieldType: TextFieldTypes;
  value: string;
};

export type DropdownField = {
  kind: "dropdown";
  fieldId: string;
  label: string;
  options: Option[];
  value: string[];
};

export type RadioField = {
  kind: "radio";
  fieldId: string;
  label: string;
  options: Option[];
  value: string;
};

export type FormField = TextField | DropdownField | RadioField;

export interface Form {
  formId: string;
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
  responseId: string;
  formId: string;
  fields: ResponseField[];
};
