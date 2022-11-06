// @ts-nocheck
import { render } from "solid-js/web";
import { For } from "solid-js";
import useRedux from "../components/store2/useRedux";
import reduxStore from "../components/store2/store";
import actions from "../components/store2/actions";
import "../assets/css/styles.css";

/**
 * @returns 
 * https://www.solidjs.com/tutorial/stores_immutable?solved
 */
const Store3 = () => {
  const [store, { addTodo, toggleTodo }] = useRedux(
    reduxStore,
    actions
  );
  let input;
  return (
    <>
    <div class="c-nest-component c-form-component">
      <div class="c-search">
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
      </div>
      <For each={store.todos}>
        {(todo) => {
          const { id, text } = todo;
          console.log("Create", text)
          return <div class="c-checkbox">
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
    </>
  );
};
render(Store3, document.getElementById("app"));