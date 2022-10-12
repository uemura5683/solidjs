import { render } from "solid-js/web";
import { lazy, Suspense } from "solid-js";

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

function App() {
  return (
    <>
      <h1>Welcome</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Greeting name="Jake" />
      </Suspense>
    </>
  );
}

render(App, document.getElementById("root"));
