import { useRoutes } from "raviger";

import Forms from "../Forms";
import ErrorPage from "../ErrorPage";
import Login from "../components/Login";

import FormBuilder from "../components/FormBuilder";
import PreviewForm from "../components/PreviewForm";
import CreateForm from "../components/CreateForm";
import NewPreviewForm from "../components/PreviewForm/new";

const routes = {
  "/": () => <Forms />,
  "/login": () => <Login />,
  "/forms/create": () => <CreateForm />,
  "/forms/:formId": ({ formId }: { formId: string }) => (
    <FormBuilder form_pk={Number(formId)} />
  ),
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <PreviewForm formId={formId} />
  ),
  "/view/:formId": ({ formId }: { formId: string }) => (
    <NewPreviewForm form_pk={Number(formId)} />
  ),
  "/*": () => <ErrorPage />,
};

export default function AppRouter() {
  let route = useRoutes(routes);

  return route;
}
