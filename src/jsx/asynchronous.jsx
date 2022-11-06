import { render } from "solid-js/web";
import "../assets/css/styles.css";

function AsyncHronous() {
  return (
    <>
      <h3>非同期 / 遅延コンポーネント</h3>
      <a href="/asynchronous1.html" target="_blank">非同期 / 遅延コンポーネント</a>
      <h3>非同期 / Resource</h3>
      <a href="/asynchronous2.html" target="_blank">非同期 / Resource</a>
      <h3>非同期 / Suspense</h3>
      <a href="/asynchronous3.html" target="_blank">非同期 / Suspense</a>
      <h3>非同期 / SuspenseList</h3>
      <a href="/asynchronous4.html" target="_blank">非同期 / SuspenseList</a>
      <h3>非同期 / トランジション</h3>
      <a href="/asynchronous5.html" target="_blank">非同期 / トランジション</a>
    </>
  );
}
render(() => <AsyncHronous />, document.getElementById("root"));