import { useState } from "react";

import AppContainer from "./AppContainer";
import Header from "./Header";
import SingleForm from "./SingleForm";
import Forms from "./Forms";
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
