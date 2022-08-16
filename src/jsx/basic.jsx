/* @refresh reload */
import { render } from 'solid-js/web';
import Nested from '../components/nested';
import { createSignal, createEffect, createMemo} from "solid-js";
import "../assets/css/styles.css";

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

  /**************************
  * 基本
  **************************/

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
   * Memo は Effect のようなオブザーバーであると同時に、読み取り専用の Signal でもあります。
   * Memo の作成は、solid-js からインポートできる createMemo に関数を渡すだけで簡単です。この例では、クリックするたびに値を再計算するコストが高くなっていきます。これを createMemo でラップすると、1 回のクリックで 1 回だけ再計算されます:
   */

  function fibonacci(num) {
    if (num <= 1) return 1;
    console.log("Calculating Fibonacci");
    return fibonacci(num - 1) + fibonacci(num - 2);
  }

  function Counter() {
    const [count, setCount] = createSignal(10);
    const fib = createMemo(() => fibonacci(count()));

    return (
      <>
        <div style="margin: 0 0 20px;">
        <button onClick={() => setCount(count() + 1)}>Count: {count()}</button>
        <div>1. {fib()} {fib()} {fib()} {fib()} {fib()}</div>
        <div>2. {fib()} {fib()} {fib()} {fib()} {fib()}</div>
        <div>3. {fib()} {fib()} {fib()} {fib()} {fib()}</div>
        <div>4. {fib()} {fib()} {fib()} {fib()} {fib()}</div>
        <div>5. {fib()} {fib()} {fib()} {fib()} {fib()}</div>
        <div>6. {fib()} {fib()} {fib()} {fib()} {fib()}</div>
        <div>7. {fib()} {fib()} {fib()} {fib()} {fib()}</div>
        <div>8. {fib()} {fib()} {fib()} {fib()} {fib()}</div>
        <div>9. {fib()} {fib()} {fib()} {fib()} {fib()}</div>
        <div>10. {fib()} {fib()} {fib()} {fib()} {fib()}</div>
        </div>
      </>
    );
  }


  return (
    <>
      <div>Hello {name}!</div>
      <Nested />
      {svg}
      <h3>導入 / Signal</h3>
      <div style="margin: 0 0 20px;">Count: {count()}</div>
      <h3>導入 / Effect</h3>
      <button onClick={() => setclickCount(clickcount() + 1)}>Click Me</button>
      <h3>導入 / 派生 / Signal</h3>
      <div style="margin: 0 0 20px;">Count: {doubleCount()}</div>
      <h3>導入 / MEMO</h3>
      <Counter />
    </>
  )
}

render(() => <HelloWorld />, document.getElementById('root'))
