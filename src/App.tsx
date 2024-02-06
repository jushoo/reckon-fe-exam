import { Log } from "./components/Log";
import { Summary } from "./components/Summary";

function App() {
  return (
    <>
      <div className="flex w-full justify-center min-h-screen py-24">
        <div className="flex-1 px-8">
          <Log />
        </div>
        <div className="flex-1 px-8">
          <Summary />
        </div>
      </div>
    </>
  );
}

export default App;
