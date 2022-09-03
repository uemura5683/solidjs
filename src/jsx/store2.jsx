import { render } from "solid-js/web";
import Nested from "../components/store/nested";
import { CounterProvider } from "../components/store/counter";

/**
 * Solid は、props を経由せずにデータを渡すための Context API を提供しています。
 * これは、Signal やストアを共有するのに便利です。
 * コンテキストを使うと、リアクティブシステムの一部として作成され、それによって管理されるという利点があります。
 * 
 * コンテキストを使用するには、
 * まず App コンポーネントをラップしてグローバルに提供します。
 * ラップされた CounterProvider を使用します。この場合、初期カウントを 1 にしましょう。
 * 
 *    render(() => (
 *      <CounterProvider count={1}>
 *        <App />
 *      </CounterProvider>
 *    ), document.getElementById("app"));
 *    次に、カウンターのコンテキストを nested.tsx コンポーネントで利用する必要があります。これにはラップされた useCounter を使って行います。
 * 
 *    const [count, { increment, decrement }] = useCounter();
 *    return (
 *      <>
 *        <div>{count()}</div>
 *        <button onClick={increment}>+</button>
 *        <button onClick={decrement}>-</button>
 *      </>
 *    );
 */

function App() {
  return <>
    <h1>Welcome to Counter App</h1>
    <Nested />
  </>
};

render(() => (
  <CounterProvider count={1}>
    <App />
  </CounterProvider>
), document.getElementById("app"));