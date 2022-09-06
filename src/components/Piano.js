import React, {useState, useEffect} from 'react';
import Key from './Key.js';
import _ from 'lodash';
import './Piano.css'; 
import { NOTES } from '../grobal/constants.js';
import { VALID_KEYS } from '../grobal/constants.js';
import { KEY_TO_NOTE } from '../grobal/constants.js';

const Piano = () => {
  const [pressedKeys, setPressedKeys] = useState([]);
  
  // Run only on first render ([] <- Run only on change)
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  }, []);

  // key down時の処理
  const handleKeyDown = (event) => {
    if (event.repeat) {
      return;
    }
    const key = event.key;
    const updatedPressedKeys = pressedKeys;
    if (!updatedPressedKeys.includes(key) && VALID_KEYS.includes(key)) {
      updatedPressedKeys.push(key);
    }
    setPressedKeys(updatedPressedKeys);
    playNote(KEY_TO_NOTE[key]);
    console.log(updatedPressedKeys);
  }

  // key up時の処理
  const handleKeyUp = (event) => {
    const index = pressedKeys.indexOf(event.key);
    if (index > -1) {
      setPressedKeys(pressedKeys.splice(index, 1));
    }
  }

  const playNote = (note) => {
    if (!_.isEmpty(note)) {
      const noteAudio = new Audio(document.getElementById(note).src);
      noteAudio.play();
    }
  }

  const Keys = _.map(NOTES, (note, index) => {
    return (
      <Key 
        key={index}
        note={note}
        pressedKeys={pressedKeys}
      />
    )
  });

  const audioFiles = _.map(NOTES, (note, index) => {
    return (
      <audio 
        id={note}
        key={index}
        src={'../../notes/' + note + '.mp3'}
      />
    )
  });

  return(
    <div>
      <div className="piano">
        {Keys}
      </div>
      <div>
        {audioFiles}
      </div>
    </div>
  );
}

export default Piano;