import { useRoutes } from "raviger";

import Home from "./Home";

const routes = {
  "/": () => <Home />,
  // "/about": () => <About />,
  // "/users/:userId": ({ userId }) => <Users id={userId} />,
};

function App() {
  const route = useRoutes(routes);

  return route;
}

export default App;
