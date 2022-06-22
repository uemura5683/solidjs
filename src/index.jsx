/* @refresh reload */
import { render } from 'solid-js/web';
import Nested from './nested';
import { createSignal } from "solid-js";

function HelloWorld() {
  const name = "Solid";
  const svg = (
    <svg height="300" width="400">
      <defs>
        <linearGradient id="gr1" x1="0%" y1="60%" x2="100%" y2="0%">
          <stop offset="5%" style="stop-color:rgb(255,255,3);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
        </linearGradient>
      </defs>
      <ellipse cx="125" cy="150" rx="100" ry="60" fill="url(#gr1)" />
      Sorry but this browser does not support inline SVG.
    </svg>
  )

  /**
   * 時間
   */
  // https://www.solidjs.com/tutorial/introduction_signals?solved
  const [count, setCount] = createSignal(0);

  // Javascript setInterval 関数
  setInterval(() => setCount(count() + 1), 1000);

  /**
   * 導入 / Effect
   */
  // https://www.solidjs.com/tutorial/introduction_effects

  return (
    <>
      <div>Hello {name}!</div>
      <Nested />
      {svg}
      <div>Count: {count()}</div>
    </>
  )
}

render(() => <HelloWorld />, document.getElementById('root'))
