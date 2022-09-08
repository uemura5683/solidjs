/* @refresh reload */
import { render } from "solid-js/web";
import { For, createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";
import "../assets/css/styles.css";

function Nest() {

  /**
   * https://www.solidjs.com/tutorial/stores_nested_reactivity
   * ストア / ネストしたリアクティビティ
   */
  const [todos, setTodos] = createSignal([])
  let input;
  let todoId = 0;

  const addTodo = (text) => {
    const [completed, setCompleted] = createSignal(false);
    setTodos([...todos(), { id: ++todoId, text, completed, setCompleted }]);
  };
  const toggleTodo = (id) => {
    const index = todos().findIndex((t) => t.id === id);
    const todo = todos()[index];
    if (todo) todo.setCompleted(!todo.completed())
  }

  /**
   * https://www.solidjs.com/tutorial/stores_createstore
   * ストア / ストアの作成
   */
  let storeinput;
  let storetodoId = 0;

  const [store, setStore] = createStore({ todos: [] })
  const storeaddTodo = (text) => {
    setStore("todos", todos => [...todos, { id: ++storetodoId, text, completed: false }]);
  }
  const storetoggleTodo = (id) => {
    setStore("todos", todo => todo.id === id, "completed", completed => !completed);
  }

  /**
   * https://www.solidjs.com/tutorial/stores_mutation
   * ストア / ミューテーション
   */
  let myuinput;
  let myutodoId = 0;
  const [myu, setmyu] = createStore({ todos: [] })
  const myuaddTodo = (text) => {
    setmyu(
      'todos',
      produce((todos) => {
        todos.push({ id: ++myutodoId, text, completed: false });
      }),
    );
  };
  const myutoggleTodo = (id) => {
    setmyu(
      'todos',
      todo => todo.id === id,
      produce((todo) => (todo.completed = !todo.completed)),
    );
  };

  return (
    <>
      <h3>ストア / ネストしたリアクティビティ</h3>
      <div class="c-nest-component c-form-component">
        <input ref={input} />
        <button
          onClick={(e) => {
            if (!input.value.trim()) return;
            addTodo(input.value);
            input.value = "";
          }}
        >
          Add Todo
        </button>
        <For each={todos()}>
          {(todo) => {
            const { id, text } = todo;
            console.log(`Creating ${text}`)
            return <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onchange={[toggleTodo, id]}
              />
              <span
                style={{ "text-decoration": todo.completed ? "line-through" : "none"}}
              >{text}</span>
            </div>
          }}
        </For>
      </div>
      <h3>ストア / ストアの作成</h3>
      <div class="c-nest-component c-form-component">
        <input ref={storeinput} />
        <button
          onClick={(e) => {
            if (!storeinput.value.trim()) return;
            storeaddTodo(storeinput.value);
            storeinput.value = "";
          }}
        >
          Add Todo
        </button>
        <For each={store.todos}>
          {(todo) => {
            const { id, text } = todo;
            console.log(`Creating ${text}`)
            return <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onchange={[storetoggleTodo, id]}
              />
              <span
                style={{ "text-decoration": todo.completed ? "line-through" : "none" }}
              >{text}</span>
            </div>
          }}
        </For>
      </div>
      <h3>ストア / ミューテーション</h3>
      <div class="c-nest-component c-form-component">
        <input ref={myuinput} />
        <button
          onClick={(e) => {
            if (!myuinput.value.trim()) return;
            myuaddTodo(myuinput.value);
            myuinput.value = "";
          }}
        >
          Add Todo
        </button>
        <For each={myu.todos}>
          {(todo) => {
            const { id, text } = todo;
            console.log(`Creating ${text}`)
            return <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onchange={[myutoggleTodo, id]}
              />
              <span
                style={{ "text-decoration": todo.completed ? "line-through" : "none" }}
              >{text}</span>
            </div>
          }}
        </For>
      </div>
      <h3>ストア / コンテキスト</h3>
      <a href="/store2.html" target="_blank">ストア / コンテキスト</a>
      <h3>ストア / イミューダブルなストア</h3>
      <a href="/store3.html" target="_blank">ストア / イミューダブルなストア</a>
      <h3>ストア / コンテキストを使わない場合</h3>
      <a href="/store4.html" target="_blank">ストア / コンテキストを使わない場合</a>
    </>
  )
}

render(() => <Nest />, document.getElementById('root'))
