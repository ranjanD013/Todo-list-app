
import './index.css';
import { useState } from 'react';
import EditableTodo from './EditableTodo';

const randomId = () => String(Math.random()).slice(2, 12);

function App() {
  const [value, setValue] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleAddTodo = (e) => {
    e.preventDefault();

    const newTodo = { 
      id: randomId(),
      text: value, 
      completed: false,
      editable: false
    };

    setTodoList(pre => [newTodo, ...pre])
    setValue('');
  }


  const handleRemove = (todo) => {
    const filteredTodos = todoList.filter(item => item.id !== todo.id);
    setTodoList([...filteredTodos]);
    console.log('removed ', filteredTodos)
  }

  const handleChange = (todo) => {
    const filteredTodos = todoList.filter(item => item.id !== todo.id);
    const completedLast = [...filteredTodos, todo].sort((a, b) => {
      return (a.completed === b.completed)? 0 : b.completed? -1 : 1;
    })
    setTodoList([...completedLast]);
  }

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 min-h-screen">
      <div className="sm:container mx-auto px-4" style={{maxWidth: '600px'}}>
        <h1 className="text-4xl text-white py-4">Create your todo list</h1>
        <form className="" onSubmit={handleAddTodo}>
          
          <input type="text" 
            className="block w-full" 
            name="todo" 
            value={value} 
            onChange={e => setValue(e.target.value)}
          />
        </form>

        <ul className="text-white mt-4 text-lg">
          {todoList.map((todo, idx) => (
            <li key={idx} className="py-2">
              <EditableTodo todo={todo} onChange={handleChange} onRemove={handleRemove}/>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <span>Total todo items {todoList.length}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
