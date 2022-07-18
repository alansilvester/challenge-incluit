import Navbar from "./components/Navbar";
import Home from "./screens/home/Index";

import "./App.css";

import logo from "./basto.png";
import bell from "./campana.png";
import closed from "./cerrar.png";

function App() {
  return (
    <>
      <Navbar logo={logo} bell={bell} closed={closed}></Navbar>
      <Home></Home>
    </>
  );
}

export default App;
