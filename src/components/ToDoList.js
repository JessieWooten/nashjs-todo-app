import React from 'react';
import ToDo from './ToDo';


const List = ({ toDos, setSelectedToDoIndex }) => {

    return (
        <ul className="todo-list slideIn">
            {
                toDos.length ? 
                toDos.map((toDo, i) => <ToDo toDo={toDo}  key={i} setSelectedToDo={() => setSelectedToDoIndex(i)}/>) :
                <h2 className="default white" style={{textAlign:'center'}}>You dont have any tasks!</h2>
            }
        </ul>
    )
}

export default List;