import { useEffect } from "react";
// import { useRoutes, Link, useQueryParams } from "raviger";

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

export default function Home() {
  // if there is no data set some default data
  useEffect(() => {
    const data = localStorage.getItem("forms");
    if (!data) {
      localStorage.setItem("forms", JSON.stringify(sampleFormData));
    }
  }, []);

  return <Forms />;
}
