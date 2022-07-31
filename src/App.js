import "./App.scss";
import { useRef, useState } from "react";
import { List } from "./components";
import { Item } from "./components";

function App() {

  const elInput = useRef(null)

  const [todos, setTodos] = useState(JSON.parse(window.localStorage.getItem("todos")) || []);

  let all = todos.length
	let com = todos.filter(el => el.isComplated).length
	let uncom = todos.filter(el => !el.isComplated).length

  const handleInputValue = (evt) => {
    evt.preventDefault()
    const newTodo = {
      id: todos.at(-1)?.id ? todos.at(-1).id + 1 : 1,
      text: elInput.current.value,
      isComplated: false
    };
    setTodos([...todos, newTodo]);
    elInput.current.value = null;
  };



  window.localStorage.setItem("todos", JSON.stringify(todos))

  return (
    <div className="App">
      <div>
        <form onSubmit={handleInputValue}>
        <input ref={elInput} type="text" placeholder="Todo..." />
        <button type="submit">Submit</button>
        </form>
        {todos.length > 0 && <List>
          {todos.map((e) => (
            <Item key={e.id} item={e} todos={todos} setTodos={setTodos} />
          ))}
        </List>}
        <button type="button">All <strong className="all">{all}</strong></button>
        <button type="button">Complate <strong className="com">{com}</strong></button>
        <button type="button">Uncomplate <strong className="uncom">{uncom}</strong></button>
      </div>
    </div>
  );
}

export default App;
