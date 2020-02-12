import React from 'react';

const Modal = ({ toDo, close, updateToDo, deleteToDo }) => {
    const iconClassNames = ['fa fa-exclamation-triangle','fa fa-bolt','fa fa-bomb'];
    function toggleCompleted() {
        const update = {...toDo};
        update.isComplete = !update.isComplete;
        updateToDo(update)
        close()
    }
    function handleDeleteToDo() {
        close()
        deleteToDo(toDo)
    }

    return (
            <div className="overlay fadeIn flex-center" style={{zIndex: 30}} onClick={close}>
                <section className="modal slideIn" onClick={(e) => e.stopPropagation()}>
                    <button className="close-btn" onClick={close}><i className="fa fa-times"/></button>
                    <span className="priority" >
                        <i className={iconClassNames[toDo.priority-1]} style={toDo.isComplete ? {opacity: '.3'} : {}}/>
                    </span>
                    <h3 style={toDo.isComplete ? {textDecoration: 'line-through', opacity: '.3'} : {}}>{toDo.title}</h3>
                    <p style={toDo.isComplete ? {textDecoration: 'line-through', opacity: '.3'} : {}}>{toDo.description}</p>
                    <button className={"btn" + (toDo.isComplete ? '': ' success')} onClick={toggleCompleted}>
                        {toDo.isComplete ? "Unmark Done" : "Mark as Done"}
                        {toDo.isComplete ? <i className="fa fa-undo"/> : <i className="fa fa-check"/>}
                    </button>
                    {toDo.isComplete && <button className="btn delete" onClick={handleDeleteToDo}> Delete <i className="fa fa-trash"/></button>}
                </section>
            </div>
    )
}

export default Modal;