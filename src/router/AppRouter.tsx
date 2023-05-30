import React, { Suspense } from "react";
import { useRoutes } from "raviger";

import { UserProfile } from "../types/userTypes";

const Login = React.lazy(() => import("../components/Login"));
const Success = React.lazy(() => import("../components/Success"));
const ErrorPage = React.lazy(() => import("../ErrorPage"));

const Forms = React.lazy(() => import("../Forms"));
const CreateForm = React.lazy(() => import("../components/CreateForm"));
const FormBuilder = React.lazy(() => import("../components/FormBuilder"));
const PreviewForm = React.lazy(() => import("../components/PreviewForm"));

const loading = <div>Loading...</div>;

export default function AppRouter(props: { currentUser: UserProfile }) {
  const routes = {
    "/": () => (
      <Suspense fallback={loading}>
        <Forms />
      </Suspense>
    ),
    "/login": () => (
      <Suspense fallback={loading}>
        <Login />
      </Suspense>
    ),
    "/forms/create": () => (
      <Suspense fallback={loading}>
        <CreateForm currentUser={props.currentUser} />
      </Suspense>
    ),
    "/forms/:formId": ({ formId }: { formId: string }) => (
      <Suspense fallback={loading}>
        <FormBuilder form_pk={Number(formId)} currentUser={props.currentUser} />
      </Suspense>
    ),
    "/preview/:formId": ({ formId }: { formId: string }) => (
      <Suspense fallback={loading}>
        <PreviewForm form_pk={Number(formId)} />
      </Suspense>
    ),
    "/success": () => (
      <Suspense fallback={loading}>
        <Success />
      </Suspense>
    ),
    "/*": () => (
      <Suspense fallback={loading}>
        <ErrorPage />
      </Suspense>
    ),
  };

  let route = useRoutes(routes);

  return route;
}
