/* @refresh reload */
import { render } from 'solid-js/web';
import { createSignal, Show, } from "solid-js";
import "../assets/css/styles.css";
import Info from '../components/info';

function BingingIndex() {

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

render(() => <BingingIndex />, document.getElementById('root'))
