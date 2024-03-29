/* @refresh reload */
import logo from './../logo.svg';
import styles from './../App.module.css';
import { render } from 'solid-js/web';
import "../assets/css/styles.css";
import "../assets/css/top.css";

function TopIndex() {
  return (
    <>
      <div class="toppage">
        <div class="toppage_inner">
          <img src={logo} class={styles.logo} alt="logo" />
          <ul>
            <li><a href="/basic.html" target="_blank">基本</a></li>
            <li><a href="/flow.html" target="_blank">制御フロー</a></li>
            <li><a href="/circle.html" target="_blank">サイクル</a></li>
            <li><a href="/binding.html" target="_blank">バインディング</a></li>
            <li><a href="/props.html" target="_blank">Props</a></li>
            <li><a href="/store.html" target="_blank">ストア</a></li>
            <li><a href="/reactivity.html" target="_blank">リアクティビティ</a></li>
            <li><a href="/asynchronous.html" target="_blank">非同期</a></li>
            <li><a href="https://www.solidjs.com/" target="_blank">Solidjs</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}
render(() => <TopIndex />, document.getElementById('root'))