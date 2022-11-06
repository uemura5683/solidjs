// @ts-nocheck

import { render } from "solid-js/web";
import counter from "../components/store3/counter"
import "../assets/css/styles.css";

/**
 * @returns 
 * https://www.solidjs.com/tutorial/stores_nocontext?solved
 */
function Store4() {
  const { count, doubleCount, increment } = counter;
  return (
    <button type="button" onClick={increment}>
      {count()} {doubleCount()}
    </button>
  );
}
render(() => <Store4 />, document.getElementById("app"));