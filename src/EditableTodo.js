
import { DeleteIcon, EditIcon, SaveIcon } from './icons';
import clsx from 'clsx';
import { useState, useEffect, useCallback } from 'react';

const EditableTodo = ({ todo, onChange, onRemove }) => {
  const [state, setState] = useState(todo);

  const handleCompleted = (e) => {
    e.preventDefault();
    const theTodo = {...state, completed: !state.completed};
    setState(theTodo);
    onChange(theTodo);
  }

  const handleEdit = () => {
    setState({...state, editable: true });
  }

  const handleSave = () => {
    setState({...state, editable: false });
  }

  const handleEditInput = useCallback((e) => {
    setState({...state, text: e.target.value })
  })

  const handleRemove = (e) => {
    e.preventDefault();
    console.log('remove ', state)
    onRemove(state);
  }

  useEffect(() => setState(todo), [todo])

  return ( 
    <div className="flex justify-between">
      <div className="">
        <input type="checkbox" 
          name="completed" 
          checked={state.completed}
          onChange={handleCompleted}
        />
        <span className="ml-2">
          {
            state.editable
              ? (
                <input type="text" 
                  className="text-gray-600" 
                  value={state.text} 
                  onBlur={() => onChange(state)}
                  onChange={handleEditInput}
                />
              )
              : <span className={clsx({ 'line-through': state.completed })}>{state.text}</span>
          }
        </span>
      </div>
      <div className="flex">
        <span className="cursor-pointer mr-2" onClick={handleRemove}>
          <DeleteIcon />
        </span>

        {
          state.editable
            ? (
              <span className="cursor-pointer" onClick={handleSave}>  
                <SaveIcon/>
              </span>
            ) : (
              <span className="cursor-pointer" onClick={handleEdit}>
                <EditIcon/>
              </span>
            )
        }
                          
      </div>
    </div>
  );
}
 
export default EditableTodo;