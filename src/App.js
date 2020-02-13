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
  //SET A HNDLER FUNCTION ON THE WINDOW TO ACCEPT MESSAGES FROM THE WRAPPER
  if(window.handleIncomingWrapperMessages === undefined) {
    window.handleIncomingWrapperMessages = function(str) {
    const data = JSON.parse(str);
    console.log("%c[handleIncomingWrapperMessages] <- incoming message: ", 'color: darkcyan;', data);
    switch(data.type) {
      case 'toDos': 
        const incomingToDos = typeof data.payload === 'string' ? JSON.parse(decodeURIComponent(data.payload)) : data.payload;
        setToDos(Array.isArray(incomingToDos) ? incomingToDos : []);
        break;
      default: 
        console.log('%c[handleIncomingWrapperMessages] Didnt fit case: ', 'background: red; color: white;', data);
    }
  }
}
  //REQUEST TODOS FROM THE WRAPPER WHEN JS APP LAUNCHES
  if(toDos === undefined && window.nativeInterface) NativeStorage.getItem('toDos')

  function addToDo(toDo) {
    const newToDos = [...toDos, { isComplete: false, ...toDo}]
    setToDos(newToDos);
    // SAVE UPDATED TODOS TO THE WRAPPER
    if(window.nativeInterface) {
      NativeStorage.setItem('toDos', encodeURIComponent(JSON.stringify(newToDos)));
    }
  }
  function updateToDo(updatedToDo) {
    const newToDos = [...toDos];
    newToDos[selectedToDoIndex] = updatedToDo;
    setToDos(newToDos);
    // SAVE UPDATED TODOS TO THE WRAPPER
    if(window.nativeInterface) NativeStorage.setItem('toDos', encodeURIComponent(JSON.stringify(newToDos)));
  }
  function deleteToDo (index){
    let tempToDos = [...toDos]
    tempToDos.splice(index, 1)
     setToDos(tempToDos)
     // SAVE UPDATED TODOS TO THE WRAPPER
     if(window.nativeInterface) NativeStorage.setItem('toDos', encodeURIComponent(JSON.stringify(tempToDos.length ? tempToDos : [])));
  }


  return (
    <div className="App">
      <header>
        <h1 className="teal">NashJS ToDo Tracker</h1>
      </header>
      {/* TODO LIST OR LOADER */}
      { Array.isArray(toDos) ? <ToDoList toDos={toDos} setSelectedToDoIndex={setSelectedToDoIndex}/> : <Loader /> }

      {/* NEW TODO COMPONENT */}
      <AddToDoBar addToDo={addToDo} toDos={toDos} />

      {/* TODO MODAL */}
      {selectedToDoIndex > -1 && <SelectedToDoModal 
          toDo={toDos[selectedToDoIndex]} 
          close={() => setSelectedToDoIndex(-1)}
          updateToDo={updateToDo}
          deleteToDo={() => deleteToDo(selectedToDoIndex)}
        />}
    </div>
  );
}

export default App;
