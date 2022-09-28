/* @refresh reload */
import { render } from "solid-js/web";
import { createSignal, batch, createEffect, untrack, on } from "solid-js";
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

  /**
   * https://www.solidjs.com/tutorial/reactivity_untrack
   * リアクティビティ / untrack
   */
  const [a, setA] = createSignal(1);
  const [b, setB] = createSignal(1);

  createEffect(() => {
    console.log(a(), untrack(b));
  });

  /**
   * https://www.solidjs.com/tutorial/reactivity_on
   * リアクティビティ / on
   */
  const [ona, onsetA] = createSignal(1);
  const [onb, onsetB] = createSignal(1);

  createEffect(on(ona, (ona) => {
    console.log(ona, onb());
  }, { defer: true }));

  return (
    <>
      <h3>リアクティビティ / Batch</h3>
      <button onClick={updateNames}>My name is {fullName()}</button>
      <h3>リアクティビティ / untrack</h3>
      <button onClick={() => setA(a() + 1)}>Increment A</button>
      <button onClick={() => setB(b() + 1)}>Increment B</button>
      <h3>リアクティビティ / on</h3>
      <button onClick={() => onsetA(ona() + 1)}>Increment A</button>
      <button onClick={() => onsetB(onb() + 1)}>Increment B</button>
    </>
  )
}

render(() => <App />, document.getElementById('root'))
