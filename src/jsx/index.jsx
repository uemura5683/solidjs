/* @refresh reload */
import { render, Dynamic, Portal } from 'solid-js/web';
import "../assets/css/styles.css";
import "../assets/css/top.css";

function TopIndex() {
  const name = "Solid";

  return (
    <>
      <div class="toppage">
        <ul>
          <li><a href="/basic.html" target="_blank">基本</a></li>
          <li><a href="/flow.html" target="_blank">制御フロー</a></li>
          <li><a href="/circle.html" target="_blank">サイクル</a></li>
          <li><a href="/binding.html" target="_blank">バインディング</a></li>
        </ul>
      </div>
    </>
  )
}

render(() => <TopIndex />, document.getElementById('root'))
