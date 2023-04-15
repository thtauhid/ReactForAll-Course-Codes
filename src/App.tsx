import { useRoutes } from "raviger";

import SingleForm from "./SingleForm";
import AppContainer from "./AppContainer";
import Header from "./Header";
import Forms from "./Forms";

const routes = {
  "/": () => <Forms />,
  "/forms/:formId": ({ formId }: { formId: string }) => (
    <SingleForm formId={Number(formId)} />
  ),
};

function App() {
  let route = useRoutes(routes);

  return (
    <AppContainer>
      <div className='p-4 mx-auto my-10 bg-white shadow-lg rounded-xl min-w-[34%]'>
        <Header title='Level 4: Routing' />
        {route}
      </div>
    </AppContainer>
  );
}

export default App;
