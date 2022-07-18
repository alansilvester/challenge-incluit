import Navbar from './components/Navbar';
import Home from './components/Home';

import './App.css';

import logo from './basto.png'
import bell from './campana.png'
import closed from './cerrar.png'

function App() {
  return (
    <div className="App">
      <Navbar logo={logo} bell={bell} closed={closed}></Navbar>
      <Home></Home>
    </div>
  );
}

export default App;
