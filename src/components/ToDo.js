import React from 'react';

const ToDo = ({ toDo, setSelectedToDo }) => {
   const iconClassNames = ['fa fa-exclamation-triangle','fa fa-bolt', 'fa fa-bomb'];
    return (
    <li className={"flex-left todo" + (toDo.isComplete ? " completed" : '')}  onClick={() => setSelectedToDo(toDo)} >
        <div className="flex-left">
            <span className={ "icon" } >
                <i className={iconClassNames[toDo.priority-1]}/>
            </span>

            <span className="title">{toDo.title}</span>
        </div>

        <i className="fa fa-ellipsis-h more gray" ></i>
    </li>
    )
}

export default ToDo;