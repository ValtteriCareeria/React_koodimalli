import './App.css';
import React, {useState} from 'react';

const Laskuri = ({huomio}) => {

const [luku, setLuku] = useState(0)

  return (
    <>
        <h3>{luku}</h3>

        <button onClick={() => setLuku(luku + 1)}>+</button>

        <button onClick={huomio}>huomio</button>
      
    </>
  );
}

export default Laskuri;