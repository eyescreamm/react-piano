import logo from './logo.svg';
import './App.css';
import Piano from './components/Piano';
import React, {useState, useEffect} from 'react';

function App() {
  const [c, setc] = useState(0)
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = (event) => {
    const count = c + 1
    setc(count)
    console.log(count)
  }

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
