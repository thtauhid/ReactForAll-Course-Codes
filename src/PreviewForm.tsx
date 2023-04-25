import { useEffect, useState } from "react";
import { Form, ResponseField, FormResponse } from "./types";

export default function PreviewForm(props: { formId: number }) {
  const formInitialData: Form = {
    id: props.formId,
    title: "Loading...",
    fields: [],
  };

  const [formData, setFormData] = useState<Form>(formInitialData);
  const [currentField, setCurrentField] = useState<number>(0);
  const [formValues, setFormValues] = useState<ResponseField[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("forms");
    if (data) {
      const dataJSON = JSON.parse(data);

      const form = dataJSON.find((form: Form) => form.id === props.formId);
      if (form) {
        setFormData(form);
        console.log(form);

        // set initial form values to empty strings
        const initialFormValues = form.fields.map((field: ResponseField) => ({
          label: field.label,
          value: "",
        }));

        setFormValues(initialFormValues);
      }
    }
  }, [props.formId]);

  const previousField = () => {
    setCurrentField(currentField - 1);
  };

  const nextField = () => {
    setCurrentField(currentField + 1);
  };

  const updateFormFieldData = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    let newFormValues = [...formValues];

    newFormValues[currentField] = {
      label: formData.fields[currentField].label,
      value: e.target.value,
    };

    setFormValues(newFormValues);

    console.table(newFormValues);
  };
  const submitForm = () => {
    const formResponse: FormResponse = {
      id: Number(new Date()),
      formId: formData.id,
      fields: formValues,
    };

    const data = localStorage.getItem("responses");
    if (data) {
      const dataJSON = JSON.parse(data);
      dataJSON.push(formResponse);
      localStorage.setItem("responses", JSON.stringify(dataJSON));
    } else {
      localStorage.setItem("responses", JSON.stringify([formResponse]));
    }

    alert("Form submitted successfully!");
    // clear form values
    const initialFormValues = formValues.map((field: ResponseField) => ({
      label: field.label,
      value: "",
    }));
    setFormValues(initialFormValues);
    setCurrentField(0);
  };

  return (
    <>
      <h1 className='text-center font-bold text-3xl'>{formData.title}</h1>
      <div className='my-4 border border-stone-500'></div>

      {formData.fields.map((field, index) => (
        <div
          key={field.id}
          className={`${
            index === currentField ? "block" : "hidden"
          } flex flex-col`}
        >
          <label htmlFor={field.label}>{field.label}</label>
          {field.kind === "text" ? (
            <>
              {field.fieldType === "textarea" ? (
                <textarea
                  name={field.label}
                  id={field.label}
                  className='mt-2 p-2 border border-stone-500 rounded-md focus:outline-none focus:border-blue-500'
                  onChange={updateFormFieldData}
                  value={formValues[currentField].value}
                />
              ) : (
                <input
                  type={field.fieldType}
                  name={field.label}
                  id={field.label}
                  className='mt-2 p-2 border border-stone-500 rounded-md focus:outline-none focus:border-blue-500'
                  onChange={updateFormFieldData}
                  value={formValues[currentField].value}
                />
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      ))}

      <div className='my-4 border border-stone-500'></div>
      <div className='flex items-center justify-between'>
        {currentField === 0 ? (
          <div></div>
        ) : (
          <button
            onClick={previousField}
            className='p-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 text-center'
          >
            Previous
          </button>
        )}

        {currentField < formData.fields.length - 1 ? (
          <button
            onClick={nextField}
            className='p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-center'
          >
            Next
          </button>
        ) : currentField === formData.fields.length - 1 ? (
          <button
            onClick={submitForm}
            className='p-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 text-center'
          >
            Submit
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
