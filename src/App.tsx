import AppContainer from "./AppContainer";
import Header from "./Header";
import Form from "./Form";
import Forms from "./Forms";
function App() {
  return (
    <AppContainer>
      <div className='p-4 mx-auto my-10 bg-white shadow-lg rounded-xl min-w-[34%]'>
        <Header title='Level 3: Hooks' />
        {/* <Forms /> */}
        <Form />
      </div>
    </AppContainer>
  );
}

export default App;
