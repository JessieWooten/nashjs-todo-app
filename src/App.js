import React, { useState } from 'react';
import './App.css';
import NativeStorage from './NativeStorage'

import ToDoList from './components/ToDoList';
import AddToDoBar from './components/AddToDo';
import SelectedToDoModal from './components/SelectedToDoModal'
import Loader from './components/Loader'
// import testToDos from './testTodos';

function App() {
  const [toDos, setToDos] = useState(undefined);
  const [selectedToDoIndex, setSelectedToDoIndex] = useState(-1);
  //Set a handler function on the window to accept data from the native wrapper
  window.handleIncomingWrapperMessages = function(str) {
    const data = JSON.parse(str);
    console.log("[handleIncomingWrapperMessages] incoming message: ", data);
    switch(data.type) {
      case 'toDos': 
        const incomingToDos = typeof data.payload === 'string' ? JSON.parse(decodeURIComponent(data.payload)) : data.payload;
        setToDos(Array.isArray(incomingToDos) ? incomingToDos : []);
        break;
      default: 
        console.log('[handleIncomingWrapperMessages] Didnt fit case: ', data);
    }
  }
  //request todos when the app launches
  if(toDos === undefined && window.nativeInterface) NativeStorage.getItem('toDos')

  function addToDo(toDo) {
    const newToDos = [...toDos, { isComplete: false, ...toDo}]
    setToDos(newToDos);
    if(window.nativeInterface) {
      NativeStorage.setItem('toDos', encodeURIComponent(JSON.stringify(newToDos)));
    }
  }
  function updateToDo(updatedToDo) {
    const newToDos = [...toDos];
    newToDos[selectedToDoIndex] = updatedToDo;
    setToDos(newToDos);

    if(window.nativeInterface) NativeStorage.setItem('toDos', encodeURIComponent(JSON.stringify(newToDos)));
  }
  function deleteToDo (index){
    let tempToDos = [...toDos]
    tempToDos.splice(index, 1)
     setToDos(tempToDos)
     if(window.nativeInterface) NativeStorage.setItem('toDos', encodeURIComponent(JSON.stringify(tempToDos)));
  }


  return (
    <div className="App">
      <header>
        <h1 className="teal">NashJS ToDo Tracker</h1>
      </header>
      {
        toDos === undefined ? 
         <Loader /> :
            <ToDoList toDos={toDos} setSelectedToDoIndex={setSelectedToDoIndex}/>
      }
      <AddToDoBar addToDo={addToDo} toDos={toDos} />
      {selectedToDoIndex > -1 && 
        <SelectedToDoModal 
          toDo={toDos[selectedToDoIndex]} 
          close={() => setSelectedToDoIndex(-1)}
          updateToDo={updateToDo}
          deleteToDo={() => deleteToDo(selectedToDoIndex)}
        />}
    </div>
  );
}

export default App;
