import { Map } from "./components/Map/Map";
import { Sidebar } from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center pl-5 dark-bg">
        <h3 className="font-mono text-white py-3 text-2xl">
          Population Counter
        </h3>
      </div>
      <div className="flex flex-row  h-full">
        <Sidebar />
        <div className="w-full h-full flex justify-center items-center">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;
