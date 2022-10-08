import { render } from "solid-js/web";
import { lazy } from "solid-js";
import "../assets/css/styles.css";

function App() {
  return (
    <>
      <h3>非同期 / 遅延コンポーネント</h3>
      <a href="/asynchronous1.html" target="_blank">非同期 / 遅延コンポーネント</a>
      <h3>非同期 / Resource</h3>
      <a href="/asynchronous2.html" target="_blank">非同期 / Resource</a>
    </>
  );
}

render(() => <App />, document.getElementById("root"));
