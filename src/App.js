import "./App.css";
import ImageSelect from "./components/imageSelect/ImageSelect";

import Navbar from "./components/navbar/Navbar";
import Maps from "./components/maps/Maps";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <ImageSelect /> */}
      <Maps />
    </div>
  );
}

export default App;
