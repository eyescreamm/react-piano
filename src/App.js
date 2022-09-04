import logo from './logo.svg';
import './App.css';
import Piano from './components/Piano';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Piano />
      </header>
    </div>
  );
}

export default App;
