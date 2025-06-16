import React, {use, useState} from 'react';
import './App.css';
import Laskuri from './Laskuri';
import Viesti from './Viesti';
import Posts from './Posts';

const App = () => {

const [showLaskuri, setShowLaskuri] = useState(false)

const huomio = () => {
  alert("Huomio!")
} 
  return (
    <div className="App">
      <h1>Hello from React!</h1>

        <Posts/>
      
        {showLaskuri && <Laskuri huomio={huomio} />}
        {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota Laskuri</button>}
        {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>}

        <Viesti  teksti ="tervehdys app komponentistä"/>

    </div>
  );
}

export default App;
