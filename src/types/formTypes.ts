export type Form = {
  id?: number;
  title: string;
  description?: string;
  is_public?: boolean;
};

export type Field = {
  id?: number;
  label: string;
  kind: "TEXT" | "DROPDOWN" | "RADIO";
  options?: string[];
  value?: string;
};

export type Answer = {
  id?: number;
  form_field: number;
  value: string;
};

export type Submission = {
  answers: Answer[];
  form: Form;
};

export type Error<T> = Partial<Record<keyof T, string>>;

export const validateForm = (form: Form) => {
  const errors: Error<Form> = {};

  if (form.title.length < 1) {
    errors.title = "Title is required";
  }

  if (form.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }

  return errors;
};
