import React, {useState, useEffect} from 'react';
import Key from './Key.js';
import _ from 'lodash';
import './Piano.css'; 
import { NOTES } from '../grobal/constants.js';
import { VALID_KEYS } from '../grobal/constants.js';
import { KEY_TO_NOTE } from '../grobal/constants.js';

const Piano = () => {
  const [pressedKeys, setPressedKeys] = useState(() => {
    console.log("init")
    return ["ふざけんなよ！"];
  });
  const [count, setCount] = useState(1);
  
  // Run only on first render ([] <- Run only on change)
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
  }, []);


  console.log("before", pressedKeys)
  // key down時の処理
  const handleKeyDown = (event) => {
    const c = count + 1
    setCount(c)
    // console.log(c)
    //console.log("inner", pressedKeys)
    if (event.repeat) {
      return;
    }
    const key = event.key;
    // var updatedPressedKeys = pressedKeys
    var updatedPressedKeys = pressedKeys.slice(0, pressedKeys.length)
    if (!updatedPressedKeys.includes(key) && VALID_KEYS.includes(key)) {
      updatedPressedKeys.push(key);
      //console.log("update = " + updatedPressedKeys);
    }
    setPressedKeys(updatedPressedKeys);
    playNote(KEY_TO_NOTE[key]);
  }
  //console.log(pressedKeys);

  // key up時の処理
  const handleKeyUp = (event) => {
    const index = pressedKeys.indexOf(event.key);
    if (index > -1) {
      const newKeys = pressedKeys;
      newKeys.splice(index, 1)
      console.log(newKeys)
      setPressedKeys(prevState => newKeys);
      // setPressedKeys(pressedKeys.splice(index, 1));
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
        pressedKeys={[]}
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