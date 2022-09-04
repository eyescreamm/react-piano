import React from 'react';
import Key from './Key.js';
import _ from 'lodash';
import './Piano.css'; 
import { NOTES } from '../grobal/constants.js';

const Piano = () => {
  const [pressedKeys, setPressedKeys] = React.useState([]);

  const Keys = _.map(NOTES, (note, index) => {
    return (
      <Key 
        key={index}
        note={note}
        pressedKeys={pressedKeys}
      />
    )
  });

  return(
    <div className="piano">
      {Keys}
    </div>
  );
}

export default Piano;