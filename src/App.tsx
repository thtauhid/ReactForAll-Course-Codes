import { useRoutes } from "raviger";

import FormBuilder from "./FormBuilder";
import PreviewForm from "./PreviewForm";

import AppContainer from "./AppContainer";
import Header from "./Header";
import Forms from "./Forms";
import ErrorPage from "./ErrorPage";

const routes = {
  "/": () => <Forms />,
  "/forms/:formId": ({ formId }: { formId: string }) => (
    <FormBuilder formId={Number(formId)} />
  ),
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <PreviewForm formId={Number(formId)} />
  ),
  "/*": () => <ErrorPage />,
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
