import React, {use, useState} from 'react';
import './App.css';
import Laskuri from './Laskuri';
import Viesti from './Viesti';
import Posts from './Posts';
import CustomerList from './CustomerList';

const App = () => {

const [showLaskuri, setShowLaskuri] = useState(false)

const [showPosts, setShowPosts] = useState(false)


const huomio = () => {
  alert("Huomio!")
} 
  return (
    <div className="App">
      <h1>Hello from React!</h1>

      <CustomerList/>

        
        {showPosts && <Posts/>}
        {showPosts && <button onClick={() => setShowPosts(!showPosts)}>Piilota tiedot</button>}
        {!showPosts && <button onClick={() => setShowPosts(!showPosts)}>Näytä tiedot</button>}
      
        {showLaskuri && <Laskuri huomio={huomio} />}
        {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota Laskuri</button>}
        {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>}

        <Viesti  teksti ="tervehdys app komponentistä"/>

    </div>
  );
}

export default App;
