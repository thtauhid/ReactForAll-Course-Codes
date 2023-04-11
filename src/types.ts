export interface FormFields {
    id: number;
    label: string;
    type: string;
    value: string;
}

export interface FormValues {
    id: number;
    title: string,
    fields: FormFields[];
}
