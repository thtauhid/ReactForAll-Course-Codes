import { useEffect, useState } from "react";
import { login } from "../utils/apiUtils";

type User = {
  username: string;
  password: string;
};

export default function Login() {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await login(user.username, user.password);

    if (response) {
      localStorage.setItem("token", response.token);
      window.location.reload();
    }

    setUser({ username: "", password: "" });

    window.location.reload();
    return;
  };

  return (
    <>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Username
            </label>
            <div className='mt-2'>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                id='username'
                name='username'
                type='text'
                autoComplete='username'
                required
                className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
            </div>
            <div className='mt-2'>
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
