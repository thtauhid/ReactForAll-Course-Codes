import { useEffect, useState } from "react";
import AppContainer from "./AppContainer";

import Header from "./Header";
import AppRouter from "./router/AppRouter";
import { me } from "./utils/apiUtils";
import { User } from "./types/userTypes";

const getCurrentUser = async (setCurrentUserCB: (value: User) => void) => {
  const currentUser = await me();
  setCurrentUserCB(currentUser);
};

function App() {
  const [currentUser, setCurrentUser] = useState<User>({
    username: "",
    url: null,
  });

  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <AppContainer>
      <div className='p-4 mx-auto my-10 bg-white shadow-lg rounded-xl w-[50%]'>
        <Header currentUser={currentUser} />
        <AppRouter currentUser={currentUser} />
      </div>
    </AppContainer>
  );
}

export default App;
