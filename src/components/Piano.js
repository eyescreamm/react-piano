import React, {useState, useEffect, useCallback} from 'react';
import Key from './Key.js';
import _ from 'lodash';
import './Piano.css'; 
import { NOTES } from '../grobal/constants.js';
import { VALID_KEYS } from '../grobal/constants.js';
import { KEY_TO_NOTE } from '../grobal/constants.js';

const Piano = () => {
  const [pressedKeys, setPressedKeys] = useState([]);

  // key down時の処理
  const handleKeyDown = useCallback((event) => {
    if (event.repeat) {
      return;
    }
    const key = event.key;
    var updatedPressedKeys = pressedKeys.slice(0, pressedKeys.length);
    if (!updatedPressedKeys.includes(key) && VALID_KEYS.includes(key)) {
      updatedPressedKeys.push(key);
    }
    setPressedKeys(updatedPressedKeys);
    playNote(KEY_TO_NOTE[key]);
    console.log(updatedPressedKeys)
  }, [pressedKeys])

  // key up時の処理
  const handleKeyUp = useCallback((event) => {
    const index = pressedKeys.indexOf(event.key);
    console.log(index)
    if (index > -1) {
      const newKeys = pressedKeys.slice(0, pressedKeys.length);
      newKeys.splice(index, 1)
      setPressedKeys(newKeys);
    }
  }, [pressedKeys])

  // Run only on first render ([] <- Run only on change)
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    document.addEventListener('keyup', handleKeyUp, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressedKeys, handleKeyDown, handleKeyUp]);

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