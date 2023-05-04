import AppContainer from "./AppContainer";

import Header from "./Header";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <AppContainer>
      <div className='p-4 mx-auto my-10 bg-white shadow-lg rounded-xl min-w-[34%]'>
        <Header />
        <AppRouter />
      </div>
    </AppContainer>
  );
}

export default App;
