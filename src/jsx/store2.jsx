import { render } from "solid-js/web";
import Nested from "../components/store/nested";
import { CounterProvider } from "../components/store/counter";

/**
 * @returns 
 * 
 * https://www.solidjs.com/tutorial/stores_context
 */

function App() {
  return <>
    <h1>Welcome to Counter App</h1>
    <Nested />
  </>
};

render(() => (
  <CounterProvider count={1}>
    <App />
  </CounterProvider>
), document.getElementById("app"));