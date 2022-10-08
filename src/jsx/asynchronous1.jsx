import { render } from "solid-js/web";
import { lazy } from "solid-js";

const Greeting = lazy(() => import("../components/asynchronous/greeting"));

/**
 * 
 * @returns
 * https://www.solidjs.com/tutorial/async_lazy 
 * 
*/

function App() {
  return (
    <>
      <h1>Welcome</h1>
      <Greeting name="Jake" />
    </>
  );
}

render(() => <App />, document.getElementById("root"));
