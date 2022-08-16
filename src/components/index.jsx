/* @refresh reload */
import { render, Dynamic, Portal } from 'solid-js/web';
import Nested from './nested';
import { createSignal, createEffect, createMemo, Show, For, Index, Switch, Match, onMount, ErrorBoundary, onCleanup} from "solid-js";
import "./styles.css";
import clickOutside from "./click-outside";
import Info from './info';

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

  /**************************
  * 制御フロー
  **************************/


  /**
  * 制御フロー SHOW
  **/
  const [loggedIn, setLoggedIn] = createSignal(false);
  const toggle = () => setLoggedIn(!loggedIn())

  /**
  * 制御フロー For
  * https://www.solidjs.com/tutorial/flow_for
  * For コンポーネントは、オブジェクトの配列をループするための最良の方法です。
  * 配列が変更されると、ForはDOMの内のアイテムを再作成するものではなく、更新したり移動したりします。
  *
  *<For each={cats()}>{(cat, i) =>
  *  <li>
  *    <a target="_blank" href={`https://www.youtube.com/watch?v=${cat.id}`}>
  *      {i() + 1}: {cat.name}
  *    </a>
  *  </li>
  *}</For>
  */

  /**
  * https://www.solidjs.com/tutorial/flow_index
  * 制御フロー / index
  * Solid でリストをレンダリングするには <For> を使用しますが、Solid には <Index>
  * コンポーネントもあり、特定の状況下で再レンダリングを少なくできます。
  * 
  * <Index each={cats()}>{(cat, i) =>
  *   <li>
  *     <a target="_blank" href={`https://www.youtube.com/watch?v=${cat().id}`}>
  *       {i + 1}: {cat().name}
  *     </a>
  *   </li>
  * }</Index>
  * */

  const [cats, setCats] = createSignal([
    { id: 'J---aiyznGQ', name: 'Keyboard Cat' },
    { id: 'z_AbfPXTKms', name: 'Maru' },
    { id: 'z_AbfPXTKms', name: 'Maru The Existential Cat' },
    { id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' },
    { id: 'OUtn3pvWmpg', name: 'Henri' }
  ]);

  /**
  * https://www.solidjs.com/tutorial/flow_switch
  * 制御フロー / Switch
  * 場合によっては、2 つ以上の排他的な結果を持つ条件式を扱う必要があります。
  * このような場合には、JavaScript の switch/case を大まかにモデル化した <Switch> と <Match> のコンポーネントを用意しました。
  * 
  * <Switch fallback={<p>{x()} is between 5 and 10</p>}>
  *  <Match when={x() > 10}>
  *    <p>{x()} is greater than 10</p>
  *  </Match>
  *  <Match when={5 > x()}>
  *    <p>{x()} is less than 5</p>
  *  </Match>
  * </Switch>
  * 
  * */

  const [switchx] = createSignal(4);

  /**
  * https://www.solidjs.com/tutorial/flow_dynamic
  * 制御フロー / Dynamic
  * <Dynamic> タグは、データを元にレンダリングするときに便利です。
  * ネイティブ要素を表す文字列やコンポーネント関数を渡すと、提供された残りの props でレンダリングできます。
  * <Switch fallback={<BlueThing />}>
  *   <Match when={selected() === 'red'}><RedThing /></Match>
  *   <Match when={selected() === 'green'}><GreenThing /></Match>
  * </Switch>
  **/

  const RedThing = () => <strong style="color: red">Red Thing</strong>;
  const GreenThing = () => <strong style="color: green">Green Thing</strong>;
  const BlueThing = () => <strong style="color: blue">Blue Thing</strong>;

  const options = {
    red: RedThing,
    green: GreenThing,
    blue: BlueThing
  }
  const [selected, setSelected] = createSignal("red");

  /**
  * https://www.solidjs.com/tutorial/flow_portal
  * 制御フロー / Portal
  * アプリの通常のフローの外に要素を挿入することが有益な場合があります。モーダルのようなフローティング要素のレンダリングコンテキストを処理するには、z-index では不十分な場合があります。
  * 
  * Solid には <Portal> コンポーネントがあり、その子コンテンツは選択した場所に挿入されます。デフォルトでは、その要素は document.body 内の <div> にレンダリングされます。
  **/


  /**
  * https://www.solidjs.com/tutorial/flow_error_boundary
  * 制御フロー / Error Boundary
  * UI で発生した JavaScript エラーがアプリ全体を壊してはいけません。ErrorBoundary は、子コンポーネントツリーの任意の場所で JavaScript エラーをキャッチし、それらのエラーをログに記録し、クラッシュしたコンポーネントツリーの代わりにフォールバックの UI を表示するコンポーネントです。
  * <ErrorBoundary fallback={err => err}>
  *  <Broken />
  * </ErrorBoundary>
  **/

  const Broken = (props) => {
    throw new Error("Oh No");
    return <>ここには到達しない</>
  }

  /**************************
  * ライフサイクル
  **************************/

  /**
   * https://www.solidjs.com/tutorial/lifecycles_onmount
   * ライフサイクル / onMount
   * olid では、すべてがリアクティブシステムによって左右されるため、
   * ライフサイクルがほとんどありません。リアクティブシステムは同期的に作成・更新されるため、
   * 唯一のスケジューリングは、更新の最後にプッシュされる Effect になります。
   * 
   * 単純な作業をしている開発者はこのような考え方をしないことが多いので、少しでも簡単にするために、
   * 非追跡な（再実行されない） createEffect の呼び出しを onMount でエイリアス化しました。
   * これは単なる Effect の呼び出しですが、最初のレンダリングがすべて完了した後、
   * コンポーネントに対して一度だけ実行されることを確信して使用できます。
   * 
   * onMount(async () => {
   *   const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
   *   setPhotos(await res.json());
   * });
   *
   */

  const [photos, setPhotos] = createSignal([]);

  onMount(async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
    setPhotos(await res.json());
  });

  /**
   * https://www.solidjs.com/tutorial/lifecycles_oncleanup
   * 
   * ライフサイクル / onCleanup
   * フレームワークの中には、クリーンアップメソッドを副作用やライフサイクルメソッドの戻り値として組み合わせているものもあります。
   * Solid のレンダーツリー内のすべてのものは、
   * （おそらく不活性な）Effect の中に存在し、ネストできるので、
   * onCleanup をファーストクラスのメソッドにしました。
   * 任意のスコープでこのメソッドを呼び出すことができ、
   * そのスコープが再評価のトリガーを受けたときや、
   * 最終的に廃棄されたときに実行されます。
   * 
   * const timer = setInterval(() => setCount(count() + 1), 1000);
   * onCleanup(() => clearInterval(timer));
   */

  const [cleanupcount, setCleanupCount] = createSignal(0);
  const cleanuptimer = setInterval(() => setCleanupCount(cleanupcount() + 1), 1000);
  onCleanup(() => clearInterval(cleanuptimer));

  /**
    * バインディング / イベント
    * https://www.solidjs.com/tutorial/bindings_events
    * 
    *  例：
    *  const handler = (data, event) => //
    *  <button onClick={[handler, data]}>Click Me</button>
    * 
    *  例：
    *  <div onMouseMove={handleMouseMove}>
    *    The mouse position is {pos().x} x {pos().y}
    *  </div>
    */

  const [eventpos, seteventPos] = createSignal({x: 0, y: 0});

  function handleMouseMove(handleMouseMoveevent) {
    seteventPos({
      x: handleMouseMoveevent.clientX,
      y: handleMouseMoveevent.clientY
    });
  }
  /**
    * バインディング / style
    * https://www.solidjs.com/tutorial/bindings_style?solved
    * 
    *  例：
    *   <div style={{
    *     color: `rgb(${num()}, 180, ${num()})`,
    *     "font-weight": 800,
    *     "font-size": `${num()}px`}}
    *   >
    *     Some Text
    *   </div>
    */

  /**
   * 
   * https://www.solidjs.com/tutorial/bindings_classlist
   * 
   * バインディング / classList
   * 例：
   * <button
   *  class={current() === 'foo' ? 'selected' : ''}
   *  onClick={() => setCurrent('foo')}
   *  >foo</button>
   *  こう置き換えることができます:
   * 
   *  <button
   *    classList={{selected: current() === 'foo'}}
   *    onClick={() => setCurrent('foo')}
   *  >foo</button>
   * 
   */
  const [current, setCurrent] = createSignal("foo");

  /**
   * https://www.solidjs.com/tutorial/bindings_spreads
   * 
   * バインディング / スプレッド演算子
   * コンポーネントや要素が不定の数の属性を受け入れる場合、
   * それらを個別に渡すのではなく、オブジェクトとして渡す方が理にかなっている場合があります。
   * これは、DOM 要素をコンポーネントでラップする場合に特に当てはまり、デザインシステムを作る際にはよくあることです。
   * 
   * これには、スプレッド演算子 ... を使用します。
   * 
   * 不定の数のプロパティを持つオブジェクトを渡すことができます:
   * 
   * <Info {...pkg} />
   */
  const pkg = {
    name: "solid-js",
    version: 1,
    speed: "⚡️",
    website: "https://solidjs.com",
  };  

  /**
    * https://www.solidjs.com/tutorial/bindings_directives
    * 
    * バインディング / ディレクティブ
    * Solid は use: 名前空間を通じてカスタムディレクティブをサポートしています。
    * これは単なる ref のシンタックスシュガーですが、典型的なバインディングに似ており、
    * 同じ要素に複数のバインディングがあっても衝突しないという点で有用です。
    * これにより、再利用可能な DOM 要素の動作のための優れたツールになります。
    * 
    * カスタムディレクティブは、単に (element, valueAccesor) という引数をとる関数で、
    * element は use: 属性を持つ DOM 要素で、valueAccessor は属性に割り当てられた値のゲッター関数です。
    * この関数がスコープ内にインポートされる限り、use: で使用できます。
    * 
    * 重要: use: は変換されるコンパイラによって検出され、関数はスコープ内にあることが要求されるため、
    * スプレッドの一部にしたり、コンポーネントに適用することはできません。
    * 
    * この例では、ポップアップやモーダルを閉じるための「外側をクリックした時の動作」のシンプルなラッパーを作成しています。
    * まず、要素に clickOutside ディレクティブをインポートして使用する必要があります:
    */
  const [shows, setShows] = createSignal(false);

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
      <h3>制御フロー / SHOW</h3>
      <Show
        when={loggedIn()}
        fallback={() => <button onClick={toggle}>Log in</button>}
      >
        <button onClick={toggle}>Log out</button>
      </Show>      
      <h3>配列 / For</h3>
      <For each={cats()}>{(cat, i) =>
        <li>
          <a target="_blank" href={`https://www.youtube.com/watch?v=${cat.id}`}>
            {i() + 1}: {cat.name}
          </a>
        </li>
      }</For>
      <h3>配列 / Index</h3>
      <Index each={cats()}>{(cat, i) =>
        <li>
          <a target="_blank" href={`https://www.youtube.com/watch?v=${cat().id}`}>
            {i + 1}: {cat().name}
          </a>
        </li>
      }</Index>
      <h3>Switch文 / Switch</h3>
      <Switch fallback={<p>{switchx()} is between 5 and 10</p>}>
        <Match when={switchx() > 10}>
          <p>{switchx()} is greater than 10</p>
        </Match>
        <Match when={5 > switchx()}>
          <p>{switchx()} is less than 5</p>
        </Match>
      </Switch>
      <h3>Dynamic</h3>
      <select value={selected()} onInput={e => setSelected(e.currentTarget.value)}>
        <For each={Object.keys(options)}>{
          color => <option value={color}>{color}</option>
        }</For>
      </select>
      <Dynamic component={options[selected()]} />
      <h3>Portal</h3>
      <div class="app-container">
        <p>サイズが制限されている div の中にあるテキスト</p>
        <Portal>
          <div class="popup" style="display: none;">
            <h1>Popup</h1>
            <p>何かの時に必要になるかもしれないテキスト</p>
          </div>
        </Portal>
      </div>
      <h3>Error Boundary</h3>
      <div>Before</div>
      <ErrorBoundary fallback={err => err}>
        <Broken />
      </ErrorBoundary>
      <div>After</div>
      <h3>Photo album</h3>
      <div class="photos">
        <For each={photos()} fallback={<p>Loading...</p>}>{ photo =>
          <figure>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <figcaption>{photo.title}</figcaption>
          </figure>
        }</For>
      </div>
      <h3>onCleanup</h3>
      <div>onCleanup Count: {cleanupcount()}</div>
      <h3>バインディング / イベント</h3>
      <div onMouseMove={handleMouseMove}>The mouse position is {eventpos().x} x {eventpos().y}</div>      
      <h3>style</h3>
      <div style={{
          color: `rgb(0, 180, 0)`,
          "font-weight": 800,
          "font-size": `12px`}}
        >
        Some Text
      </div>
      <h3>classList</h3>
      <div class="classlist">
        <button
          classList={{selected: current() === 'foo'}}
          onClick={() => setCurrent('foo')}
        >foo</button>
        <button
          classList={{selected: current() === 'bar'}}
          onClick={() => setCurrent('bar')}
        >bar</button>
        <button
          classList={{selected: current() === 'baz'}}
          onClick={() => setCurrent('baz')}
        >baz</button>
      </div>
      <h3>スプレッド演算子</h3>
      <Info {...pkg} />
      <h3>ディレクティブ</h3>
      <Show
        when={shows()}
        fallback={<button onClick={(e) => setShows(true)}>Open Modal</button>}
      >
        <div class="modal" use:clickOutside={() => setShows(false)}>
          Some Modal
        </div>
      </Show>
    </>
  )
}

render(() => <HelloWorld />, document.getElementById('root'))
