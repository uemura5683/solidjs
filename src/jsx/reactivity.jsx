/* @refresh reload */
import { render } from "solid-js/web";
import { createSignal, batch } from "solid-js";
import "../assets/css/styles.css";

const App = () => {

  /**
   * https://www.solidjs.com/tutorial/reactivity_batch
   * リアクティビティ / バッチ更新
   */
   const [firstName, setFirstName] = createSignal("John");
   const [lastName, setLastName] = createSignal("Smith");
   const fullName = () => {
     console.log("Running FullName");
     return `${firstName()} ${lastName()}`
   } 
   const updateNames = () => {
     console.log("Button Clicked");
     batch(() => {
      setFirstName(firstName() + "n");
      setLastName(lastName() + "!");
    })
   }


  return (
    <>
      <h3>リアクティビティ</h3>
      <button onClick={updateNames}>My name is {fullName()}</button>

    </>
  )
}

render(() => <App />, document.getElementById('root'))
