import { useEffect, useState } from "react";
import { Form, ResponseField, FormResponse } from "../types";
import { navigate } from "raviger";
import Field from "./Field";
import { v4 as uuidv4 } from "uuid";

export default function PreviewForm(props: { formId: string }) {
  const [formData, setFormData] = useState<Form>({
    id: props.formId,
    title: "Loading...",
    fields: [],
  }); // contains the form data (title, fields, etc.)
  const [responseData, setResponseData] = useState<ResponseField[]>([]); // contains the response data (label, value)

  const [currentField, setCurrentField] = useState<number>(0); // the current field being displayed

  // Get form data from localstorage
  useEffect(() => {
    // get form data from localstorage
    const data = localStorage.getItem("forms");
    if (!data) return navigate("/404");

    // find the corresponding form of the id
    const dataJSON = JSON.parse(data);
    const form = dataJSON.find((form: Form) => form.id === props.formId);
    if (!form) return navigate("/404");

    // set the form data
    setFormData(form);

    // Prepare the form data for preview (no metadata, just the fields)
    const fieldInitialData: ResponseField[] = form.fields.map(
      (field: ResponseField) => ({
        label: field.label,
        value: "",
      })
    );

    setResponseData(fieldInitialData);
  }, [props.formId]);

  // update field/option data
  const updateFieldDataCB = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // get the current response data
    let newResponseData = [...responseData];

    // update the response data
    newResponseData[currentField] = {
      label: formData.fields[currentField].label,
      value: (event.target as HTMLInputElement).value,
    };

    // set the response data
    setResponseData(newResponseData);

    console.table(newResponseData);
  };

  const updateMultiselectDataCB = (selectedList: string[]) => {
    // get the current response data
    let newResponseData = [...responseData];

    // update the response data
    newResponseData[currentField] = {
      label: formData.fields[currentField].label,
      value: selectedList,
    };

    // set the response data
    setResponseData(newResponseData);

    console.log(newResponseData);
  };

  // next field
  const nextField = () => {
    setCurrentField(currentField + 1);
  };

  // previous field
  const previousField = () => {
    setCurrentField(currentField - 1);
  };

  // submit form
  const submitForm = () => {
    // compile form meta data and response data
    const formResponse: FormResponse = {
      id: uuidv4(),
      formId: formData.id,
      fields: responseData,
    };

    // get form responses from localstorage
    const data = localStorage.getItem("responses");

    // if there are no responses, create a new array
    if (!data) {
      localStorage.setItem("responses", JSON.stringify([formResponse]));
    } else {
      // if there are responses, add the new response to the array
      const dataJSON = JSON.parse(data);
      dataJSON.push(formResponse);
      localStorage.setItem("responses", JSON.stringify(dataJSON));
    }

    // show alert to user
    alert("Form submitted!");

    // redirect to home page on click of ok
    navigate("/");
  };

  // check if all the multiselect fields have at least two option in it
  const checkMultiValueFieldHasAtleastTwoOptions = () => {
    // if there are multiselect fields, check if they have at least two options
    let check = true;
    formData.fields.forEach((field) => {
      if (
        (field.kind === "dropdown" || field.kind === "radio") &&
        field.options.length < 2
      )
        check = false;
    });

    return check;
  };

  if (!checkMultiValueFieldHasAtleastTwoOptions())
    return (
      <div className='text-center'>
        <h1 className='text-3xl font-bold'>Error</h1>
        <div className='my-4 border border-stone-500'></div>
        <div className='text-xl'>
          The form is broken. Please contact the form creator.
        </div>
      </div>
    );

  return (
    <>
      <h1 className='text-center font-bold text-3xl'>{formData.title}</h1>
      <div className='my-4 border border-stone-500'></div>
      <div className='flex flex-col'>
        {responseData.length > 0 ? (
          <Field
            fieldData={formData.fields[currentField]}
            responseData={responseData[currentField]}
            updateFieldDataCB={updateFieldDataCB}
            updateMultiselectDataCB={updateMultiselectDataCB}
          />
        ) : responseData.length === 0 ? (
          <div className='text-center'>No fields found</div>
        ) : (
          <div className='text-center'>Loading...</div>
        )}
      </div>
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
