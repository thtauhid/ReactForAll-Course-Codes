import { useRoutes } from "raviger";

import FormBuilder from "./components/FormBuilder";
import PreviewForm from "./components/PreviewForm";

import AppContainer from "./AppContainer";
import Header from "./Header";
import Forms from "./Forms";
import ErrorPage from "./ErrorPage";
import Login from "./components/Login";

// TODO: move route handling to router
const routes = {
  "/": () => <Forms />,
  "/login": () => <Login />,
  "/forms/:formId": ({ formId }: { formId: string }) => (
    <FormBuilder formId={formId} />
  ),
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <PreviewForm formId={formId} />
  ),
  "/*": () => <ErrorPage />,
};

function App() {
  let route = useRoutes(routes);

  return (
    <AppContainer>
      <div className='p-4 mx-auto my-10 bg-white shadow-lg rounded-xl min-w-[34%]'>
        <Header title='Level 6: Managing Complex States' />
        {route}
      </div>
    </AppContainer>
  );
}

export default App;
