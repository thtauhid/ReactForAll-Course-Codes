import { useRoutes } from "raviger";

import Forms from "../Forms";
import ErrorPage from "../ErrorPage";
import Login from "../components/Login";

import FormBuilder from "../components/FormBuilder";
import PreviewForm from "../components/PreviewForm";
import CreateForm from "../components/CreateForm";

const routes = {
  "/": () => <Forms />,
  "/login": () => <Login />,
  "/forms/create": () => <CreateForm />,
  "/forms/:formId": ({ formId }: { formId: string }) => (
    <FormBuilder formId={formId} />
  ),
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <PreviewForm formId={formId} />
  ),
  "/*": () => <ErrorPage />,
};

export default function AppRouter() {
  let route = useRoutes(routes);

  return route;
}
