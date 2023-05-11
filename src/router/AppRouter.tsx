import { useRoutes } from "raviger";

import Forms from "../Forms";
import ErrorPage from "../ErrorPage";
import Login from "../components/Login";

import FormBuilder from "../components/FormBuilder";
import PreviewForm from "../components/PreviewForm";
import CreateForm from "../components/CreateForm";
import Success from "../components/Success";

const routes = {
  "/": () => <Forms />,
  "/login": () => <Login />,
  "/forms/create": () => <CreateForm />,
  "/forms/:formId": ({ formId }: { formId: string }) => (
    <FormBuilder form_pk={Number(formId)} />
  ),
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <PreviewForm form_pk={Number(formId)} />
  ),
  "/success": () => <Success />,
  "/*": () => <ErrorPage />,
};

export default function AppRouter() {
  let route = useRoutes(routes);

  return route;
}
