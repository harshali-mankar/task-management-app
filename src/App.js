// App CSS
import "./App.scss";
import Container from "react-bootstrap/Container";
import Task from "./components/Task";

function App() {
  return (
    <>
      <Container fluid="md">
        <div className="task-management-app">
          <fieldset className="border rounded-3 p-3">
            <legend className="float-none w-auto px-3">
              <h1 className="text-primary text-center">Task Management App</h1>
            </legend>

            {/* Task component */}
            <Task />
          </fieldset>
        </div>
      </Container>
    </>
  );
}

export default App;
