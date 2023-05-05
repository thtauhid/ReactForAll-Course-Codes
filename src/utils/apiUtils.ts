import { Form } from "../types/formFields";

const BASE_URL = "https://tsapi.coronasafe.live/api/";

type RequestMethods = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export const request = async (
  endpoint: string,
  method: RequestMethods = "GET",
  payload: any = {}
) => {
  let url;

  if (method === "GET") {
    const requestParams = payload
      ? `${Object.keys(payload)
          .map((key) => `${key}=${payload[key]}`)
          .join("&")}`
      : "";

    url = `${BASE_URL}${endpoint}?${requestParams}`;
  } else {
    url = `${BASE_URL}${endpoint}`;
  }

  const token = localStorage.getItem("token");
  const auth = token ? `Token ${token}` : "";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" ? JSON.stringify(payload) : undefined,
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
};

export const me = async () => {
  return await request("users/me/", "GET");
};

export const login = async (username: string, password: string) => {
  return await request("auth-token/", "POST", { username, password });
};

export const createForm = async (form: Form) => {
  return await request("forms/", "POST", form);
};
