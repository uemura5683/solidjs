import { render } from "solid-js/web";
import Nested from "../components/store/nested";
import { CounterProvider } from "../components/store/counter";
import "../assets/css/styles.css";

/**
 * @returns 
 * 
 * https://www.solidjs.com/tutorial/stores_context
 */
function Store2() {
  return <>
    <h1>Welcome to Counter App</h1>
    <Nested />
  </>
};
render(() => (
  <CounterProvider count={1}>
    <Store2 />
  </CounterProvider>
), document.getElementById("app"));