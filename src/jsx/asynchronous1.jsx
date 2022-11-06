import { render } from "solid-js/web";
import { lazy } from "solid-js";
import "../assets/css/styles.css";

const Greeting = lazy(() => import("../components/asynchronous/greeting"));
/**
 * 
 * @returns
 * https://www.solidjs.com/tutorial/async_lazy 
 * 
*/

function AsyncHronous1() {
  return (
    <>
      <h1>Welcome</h1>
      <Greeting name="Jake" />
    </>
  );
}
render(() => <AsyncHronous1 />, document.getElementById("root"));