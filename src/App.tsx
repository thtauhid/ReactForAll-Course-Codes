import { useEffect, useState } from "react";

import AppContainer from "./AppContainer";
import Header from "./Header";
import SingleForm from "./SingleForm";
import Forms from "./Forms";

const sampleFormData = [
  {
    id: 1,
    title: "New Form",
    fields: [
      {
        id: 1,
        label: "First name",
        type: "text",
        value: "",
      },
      {
        id: 2,
        label: "Last name",
        type: "text",
        value: "",
      },
      {
        id: 3,
        label: "Email",
        type: "email",
        value: "",
      },
      {
        id: 4,
        label: "Password",
        type: "password",
        value: "",
      },
    ],
  },
  {
    id: 2,
    title: "Personal Data Collection Form",
    fields: [
      {
        id: 1,
        label: "Full name",
        type: "text",
        value: "",
      },
      {
        id: 2,
        label: "Fathers name",
        type: "text",
        value: "",
      },
      {
        id: 3,
        label: "Mothers Name",
        type: "text",
        value: "",
      },
      {
        id: 4,
        label: "Email",
        type: "email",
        value: "",
      },
    ],
  },
];

function App() {
  const [currentForm, setCurrentForm] = useState(0);

  const selectFormCB = (id: number) => {
    console.log("Setting current form id to: ", id);
    setCurrentForm(id);
  };

  const closeFormCB = () => {
    console.log("Closing form");
    console.log("Setting current form id to: ", 0);
    setCurrentForm(0);
  };

  // if there is no data set some default data
  useEffect(() => {
    const data = localStorage.getItem("forms");
    if (!data) {
      localStorage.setItem("forms", JSON.stringify(sampleFormData));
    }
  }, []);

  return (
    <AppContainer>
      <div className='p-4 mx-auto my-10 bg-white shadow-lg rounded-xl min-w-[34%]'>
        <Header title='Level 3: Hooks' />
        {currentForm === 0 ? (
          <Forms selectFormCB={selectFormCB} />
        ) : (
          <SingleForm id={currentForm} closeFormCB={closeFormCB} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
