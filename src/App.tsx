import AppContainer from "./AppContainer";
import Header from "./Header";
import Form from "./Form";
function App() {
  return (
    <AppContainer>
      <div className='p-4 mx-auto my-10 bg-white shadow-lg rounded-xl'>
        <Header title='Level 2: React State' />
        <Form />
      </div>
    </AppContainer>
  );
}

export default App;
