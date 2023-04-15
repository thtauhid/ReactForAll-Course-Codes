export interface FormField {
    id: number;
    label: string;
    type: string;
    value: string;
}

export interface Form {
    id: number;
    title: string,
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