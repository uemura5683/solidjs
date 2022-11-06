import { render } from "solid-js/web";
import { lazy, Suspense } from "solid-js";
import "../assets/css/styles.css";

/**
 * 
 * @returns
 * https://www.solidjs.com/tutorial/async_suspense?solved
 * 
*/
const Greeting = lazy(async () => {
  // 遅延をシミュレート
  await new Promise(r => setTimeout(r, 1000))
  return import("../components/asynchronous/greeting")
});

function AsyncHronous3() {
  return (
    <>
      <h1>Welcome</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Greeting name="Jake" />
      </Suspense>
    </>
  );
}
render(AsyncHronous3, document.getElementById("root"));