import { useRoutes } from "raviger";

import Forms from "../Forms";
import ErrorPage from "../ErrorPage";
import Login from "../components/Login";

import FormBuilder from "../components/FormBuilder";
import PreviewForm from "../components/PreviewForm";
import CreateForm from "../components/CreateForm";
import Success from "../components/Success";
import { UserProfile } from "../types/userTypes";

export default function AppRouter(props: { currentUser: UserProfile }) {
  const routes = {
    "/": () => <Forms />,
    "/login": () => <Login />,
    "/forms/create": () => <CreateForm currentUser={props.currentUser} />,
    "/forms/:formId": ({ formId }: { formId: string }) => (
      <FormBuilder form_pk={Number(formId)} currentUser={props.currentUser} />
    ),
    "/preview/:formId": ({ formId }: { formId: string }) => (
      <PreviewForm form_pk={Number(formId)} />
    ),
    "/success": () => <Success />,
    "/*": () => <ErrorPage />,
  };

  let route = useRoutes(routes);

  return route;
}
