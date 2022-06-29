/* @refresh reload */
import { render } from 'solid-js/web';
import Nested from './nested';
import { createSignal, createEffect } from "solid-js";

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
   * 導入 / Signal
   * Solid の Signal は、前回の値を使って次の値を設定する関数形式も受け付けています。
   * 最後に、JSX コードで Signal を読み取る必要があります:
   */
  // https://www.solidjs.com/tutorial/introduction_signals?solved
  const [count, setCount] = createSignal(0);

  // Javascript setInterval 関数
  setInterval(() => setCount(count() + 1), 1000);

  /**
   * 導入 / Effect
   * 開発者が createEffect で作成した Effect は、レンダリングが完了した後に実行され、主に DOM と相互作用する更新をスケジューリングするために使用されます。早めに DOM を変更したい場合は createRenderEffect を使用してください。
   */
  // https://www.solidjs.com/tutorial/introduction_effects
  const [clickcount, setclickCount] = createSignal(0);

  createEffect(() => {
    console.log("The count is now", clickcount());
  });

  /**
   * 派生 / Signal doubleCount
   */
   const doubleCount = () => count() * 2;

  /**
   * 導入 / MEMO
   * https://www.solidjs.com/tutorial/introduction_memos
   */


  return (
    <>
      <div>Hello {name}!</div>
      <Nested />
      {svg}
      <h3>導入 / Signal</h3>
      <div>Count: {count()}</div>
      <h3>導入 / Effect</h3>
      <button onClick={() => setclickCount(clickcount() + 1)}>Click Me</button>
      <h3>導入 / 派生 / Signal</h3>
      <div>Count: {doubleCount()}</div>
    </>
  )
}

render(() => <HelloWorld />, document.getElementById('root'))
