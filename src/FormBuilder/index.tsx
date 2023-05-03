import { useEffect, useState } from "react";
import Field from "./Field";

import { Form, FieldTypes, FormField, DropdownField } from "../types/formTypes";
import { Link } from "raviger";

import { v4 as uuidv4 } from "uuid";

const formInitialData: Form = {
  formId: uuidv4(),
  title: "Untitled Form",
  fields: [
    {
      kind: "text",
      fieldId: uuidv4(),
      label: "First Name",
      fieldType: "text",
      value: "",
    },
  ],
};

const loadFormData = (formId: string) => {
  const data = localStorage.getItem("forms");
  if (data) {
    const dataJSON = JSON.parse(data);

    // find the corresponding form of the id
    const form = dataJSON.find((form: Form) => form.formId === formId);
    if (form) {
      return form;
    }
  }
};

const saveFormData = (formData: Form) => {
  const data = localStorage.getItem("forms");
  if (data) {
    const dataJSON = JSON.parse(data);
    const newData = dataJSON.map((form: Form) => {
      if (form.formId === formData.formId) {
        return formData;
      }

      return form;
    });

    localStorage.setItem("forms", JSON.stringify(newData));
  }
};

export default function FormBuilder(props: { formId: string }) {
  const [formData, setFormData] = useState<Form>(formInitialData);

  useEffect(() => {
    const form = loadFormData(props.formId);
    setFormData(form);
  }, [props.formId]);

  // auto save form data
  useEffect(() => {
    saveFormData(formData);
  }, [formData]);

  // manually save form data
  const manualSave = () => {
    saveFormData(formData);
  };

  const deleteFieldCB = (id: string) => {
    setFormData({
      ...formData,
      fields: formData.fields.filter((field) => field.fieldId !== id),
    });
  };

  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState<FieldTypes>("text");

  const addFormField = () => {
    let newField: FormField;

    switch (newFieldType) {
      case "dropdown":
        newField = {
          kind: "dropdown",
          fieldId: uuidv4(),
          label: newFieldLabel,
          options: [
            { optionId: uuidv4(), value: "Option 1" },
            { optionId: uuidv4(), value: "Option 2" },
            { optionId: uuidv4(), value: "Option 3" },
          ],
          value: [],
        };
        break;
      case "radio":
        newField = {
          kind: "radio",
          fieldId: uuidv4(),
          label: newFieldLabel,
          options: [
            { optionId: uuidv4(), value: "Option 1" },
            { optionId: uuidv4(), value: "Option 2" },
            { optionId: uuidv4(), value: "Option 3" },
          ],
          value: "",
        };
        break;
      default:
        newField = {
          kind: "text",
          fieldId: uuidv4(),
          label: newFieldLabel,
          fieldType: newFieldType,
          value: "",
        };
    }

    const newFieldData: Form = {
      ...formData,
      fields: [...formData.fields, newField],
    };

    setFormData(newFieldData);

    setNewFieldLabel("");
    setNewFieldType("text");
  };

  const handleTitleChangeCB = (id: string, label: string) => {
    setFormData({
      ...formData,
      fields: formData.fields.map((field) => {
        if (field.fieldId === id) {
          return {
            ...field,
            label,
          };
        }

        return field;
      }),
    });
  };

  const handleOptionValueChangeCB = (
    fieldid: string,
    optionId: string,
    value: string
  ) => {
    let formField: DropdownField = formData.fields.find(
      (field) => field.fieldId === fieldid
    ) as DropdownField;

    // formField.options[optionIndex] = value;
    formField.options = formField.options.map((option) => {
      if (option.optionId === optionId) {
        return {
          ...option,
          value,
        };
      }

      return option;
    });

    setFormData({
      ...formData,
      fields: formData.fields.map((field) => {
        if (field.fieldId === fieldid) {
          return formField;
        }

        return field;
      }),
    });
  };

  const handleFieldTypeChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setNewFieldType(e.currentTarget.value as FieldTypes);
  };

  const addOptionCB = (fieldId: string) => {
    let formField: DropdownField = formData.fields.find(
      (field) => field.fieldId === fieldId
    ) as DropdownField;

    // formField.options.push(`Option ${formField.options.length + 1}`);
    formField.options.push({
      optionId: uuidv4(),
      value: "New Option",
    });

    setFormData({
      ...formData,
      fields: formData.fields.map((field) => {
        if (field.fieldId === fieldId) {
          return formField;
        }

        return field;
      }),
    });
  };

  const deleteOptionCB = (fieldId: string, optionId: string) => {
    let formField: DropdownField = formData.fields.find(
      (field) => field.fieldId === fieldId
    ) as DropdownField;

    formField.options = formField.options.filter(
      (option) => option.optionId !== optionId
    );

    setFormData({
      ...formData,
      fields: formData.fields.map((field) => {
        if (field.fieldId === fieldId) {
          return formField;
        }

        return field;
      }),
    });
  };

  return (
    <>
      <input
        type='text'
        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full text-3xl '
        placeholder='Form Title'
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <div className='mt-4 border border-stone-500'></div>

      {formData.fields.map((field) => {
        return (
          <Field
            key={field.fieldId}
            data={field}
            cb={{
              deleteFieldCB,
              handleTitleChangeCB,
              handleOptionValueChangeCB,
              addOptionCB,
              deleteOptionCB,
            }}
          />
        );
      })}
      <div className='flex mt-4 py-4 border-y-2 border-dashed border-stone-400'>
        <select
          id='type'
          className='flex-1 mr-1 p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          value={newFieldType}
          onChange={handleFieldTypeChange}
        >
          <option value='text'>Text</option>
          <option value='email'>Email</option>
          <option value='date'>Date</option>
          <option value='tel'>Phone</option>
          <option value='number'>Number</option>
          <option value='password'>Password</option>
          <option value='textarea'>Textarea</option>
          <option value='dropdown'>Dropdown</option>
          <option value='radio'>Radio</option>
        </select>

        <input
          type='text'
          className='flex-1 ml-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          placeholder='Label'
          value={newFieldLabel}
          onChange={(e) => setNewFieldLabel(e.target.value)}
        />
        <button
          type='button'
          className='ml-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
          onClick={addFormField}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
        </button>
      </div>

      <div className='mt-4 border border-stone-500'></div>

      <div className='flex mt-4'>
        <button
          className='mr-1 flex-1 p-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'
          onClick={manualSave}
        >
          Save
        </button>

        <Link
          href='/'
          className='ml-1 flex-1 p-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 text-center'
        >
          Close
        </Link>
      </div>
      <div className='flex mt-4'>
        <input
          type='text'
          className='flex-1 ml-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          value={`http://localhost:3000/preview/${formData.formId}`}
          readOnly
        />
        <Link
          type='button'
          className='ml-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
          href={`/preview/${formData.formId}`}
          target='_blank'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
            />
          </svg>
        </Link>
      </div>
    </>
  );
}
