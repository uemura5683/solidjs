/* @refresh reload */
import { render, Dynamic, Portal } from 'solid-js/web';
import { createSignal, Show, For, Index, Switch, Match, ErrorBoundary} from "solid-js";
import "../assets/css/styles.css";

function FlowIndex() {

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

  return (
    <>
      <h3>制御フロー / SHOW</h3>
      <Show
        when={loggedIn()}
        fallback={() => <button onClick={toggle}>Log in</button>}
      >
        <button onClick={toggle}>Log out</button>
      </Show>      
      <h3>配列 / For</h3>
      <ul>
      <For each={cats()}>{(cat, i) =>
        <li>
          <a target="_blank" href={`https://www.youtube.com/watch?v=${cat.id}`}>
            {i() + 1}: {cat.name}
          </a>
        </li>
      }</For>
      </ul>
      <h3>配列 / Index</h3>
      <ul>
      <Index each={cats()}>{(cat, i) =>
        <li>
          <a target="_blank" href={`https://www.youtube.com/watch?v=${cat().id}`}>
            {i + 1}: {cat().name}
          </a>
        </li>
      }</Index>
      </ul>
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
    </>
  )
}

render(() => <FlowIndex />, document.getElementById('root'))
