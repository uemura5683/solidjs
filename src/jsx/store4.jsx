// @ts-nocheck

import { render } from "solid-js/web";
import counter from "../components/store3/counter"

/**
 * @returns 
 * https://www.solidjs.com/tutorial/stores_nocontext?solved
 */

function Counter() {
  const { count, doubleCount, increment } = counter;

  return (
    <button type="button" onClick={increment}>
      {count()} {doubleCount()}
    </button>
  );
}

render(() => <Counter />, document.getElementById("app"));
