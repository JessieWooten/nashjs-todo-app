import React, { useState, Fragment } from 'react';

const AddToDo = ({ addToDo, toDos }) => {
    const [isCreatingTodo, setIsCreatingTodo] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(1);
    
    const [startPos, setStartPos] = useState(0);
    const [isDragToCloseTriggered, setIsDragToCloseTriggered] = useState(false);
    const [dragDistance, setDragDistance] = useState(0)

    const dragThreshold = 100;
    function shouldBeOpen() {
        return isCreatingTodo || (toDos && toDos.length === 0);
    }
    function handleNewTodo() {
        if(toDos === undefined) return
        if(isCreatingTodo)  createTodo();
        setIsCreatingTodo(!isCreatingTodo);
    }

    function createTodo() {
        const newToDo = { title, description, priority };
        addToDo( newToDo )
        clearTodo()
    }

    function clearTodo() {
        setTitle('');
        setDescription('');
    }

    function handleDragStart(touches) {
        if(!toDos || toDos.length === 0) return
        const pos = touches.screenY;
        setStartPos(pos)
    }
    function handleDrag(touches) {
        if(!toDos || toDos.length === 0) return
        const pos = touches.screenY;
        setDragDistance(Math.round(pos - startPos))
        if(dragDistance > dragThreshold) {
            if(!isDragToCloseTriggered) setIsDragToCloseTriggered(true);
        } else {
            if(isDragToCloseTriggered) setIsDragToCloseTriggered(false);
        } 
    }
    function handleDragEnd(touches) {
        if(isDragToCloseTriggered) setIsCreatingTodo(false);
        setStartPos(0)
        setDragDistance(0);
        setIsDragToCloseTriggered(false)
    }
    return (
        <Fragment>
            {shouldBeOpen() && <div className="overlay fadeIn"/>}
            <section className={"add-todo-bar" + (shouldBeOpen() ? ' open-drawer' : "")} 
                onTouchStart={(e) => handleDragStart(e.touches[0])}
                onTouchMove={(e) => handleDrag(e.touches[0])}
                onTouchEnd={(e) => handleDragEnd(e.touches[0])}
                style={ dragDistance > 0 ? {height: `calc(80vh - ${dragDistance}px)`, transition: '0ms'} : {} }
            >
                <form onSubmit={(e) => e.preventDefault()}>
                    {shouldBeOpen()  &&
                    <fieldset className={ dragDistance > dragThreshold ? "fadeOut" : "fadeIn delay-400ms"}>
                        <label>New Task</label>  
                        <input  name="title" id="newtodo-title" value={title} placeholder="Name your todo" onChange={(e) => setTitle(e.target.value)} onBlur={window.scrollTo(0,0)}/>
                        {/* onBlur here fixes an issue in iOS13 where the touch targets dont reset properly after the webview moves up for the keyboard and then back down once the keyboard closes. 
                        Manually setting the scroll resets the view and keeps everything touching correctly. */}
                        <label>Description</label>   
                        <textarea name="title" id="newtodo-title" value={description} onChange={(e) => setDescription(e.target.value)} onBlur={window.scrollTo(0,0)}/>
                        <label>Priority</label>
                        <div className="flex-left">
                            <label className="priority">
                                <i className={"fa fa-exclamation-triangle" + (priority === 1 ? ' charcoal' : '')}/> 
                                { priority === 1 && <div className="dot fadeIn"/>}
                                <input type="radio" id="low" name="low" value={1} checked={priority === 1}onChange={() => setPriority(1)}/>
                            </label>
                            <label className="priority">
                                <i className={"fa fa-bolt" + (priority === 2 ? ' charcoal' : '')}/> 
                                { priority === 2 && <div className="dot fadeIn"/>}
                                <input type="radio" id="mid" name="mid" value={1} checked={priority === 2} onChange={() => setPriority(2)}/>
                            </label>
                            <label className="priority">
                                <i className={"fa fa-bomb" + (priority === 3 ? ' charcoal' : '')}/> 
                                { priority === 3 && <div className="dot fadeIn"/>}
                                <input type="radio" id="high" name="high" value={1} checked={priority === 3} onChange={() => setPriority(3)}/>
                            </label>
                        </div>
                    </fieldset> }
                    <button className={'new-todo-btn' + (shouldBeOpen() ? ' create-todo-btn' : "")} onClick={handleNewTodo} disabled={shouldBeOpen() && title.trim() === ''}>
                        {
                        shouldBeOpen() ? 
                        <span className="fadeIn delay-200ms">Create New ToDo!</span> :
                            <i className="fa fa-plus"></i>
                        }
                    </button>  
                </form>
            </section>
        </Fragment>
    )
}

export default AddToDo;