/* @refresh reload */
import { render } from 'solid-js/web';
import { createSignal, For } from "solid-js";
import Greeting from "../components/greeting";
import Greeting2 from "../components/greeting2";
import ColoredList from "../components/colored-list";
import "../assets/css/styles.css";

/**
 * 
 * props とは、実行時にコンポーネント関数に渡されるオブジェクトのことで、
 * JSX にバインドされたすべての属性を表します。
 * props オブジェクトは読み取り専用で、Object ゲッターでラップされたリアクティブなプロパティを持っています。
 * これにより、呼び出し元が Signal や Signal 式を使用しているかどうか、
 * あるいは単純な値や静的な値を使用しているかどうかに関わらず、
 * 一貫した形式を持つことができます。props.propName でアクセスするだけです。
 * 
 * @returns https://www.solidjs.com/tutorial/props_defaults?solved
 * 
 * const merged = mergeProps({ greeting: "Hi", name: "John" }, props);
 * 
 * return <h3>{merged.greeting} {merged.name}</h3>
 * 
 */

/**
 * 
 * 私達にできる操作は props をマージするだけではありません。
 * 分割代入を使い、一部の props は現在のコンポーネントで使用し、
 * 他の props を分割して子コンポーネントに渡すことがよくあります。
 * 
 * この目的のために、Solid には splitProps があります。
 * これは、props オブジェクトと、独自の props オブジェクトに抽出したいキーの配列を 1 つまたは複数受け取ります。
 * props オブジェクトの配列を返します。指定されたキーの配列ごとに 1 つずつの props オブジェクトと、
 * 残余引数と同じように残りのキーを含む 1 つの props オブジェクトが入っています。返されたオブジェクトはすべてリアクティビティを保ちます。
 * 
 * @returns https://www.solidjs.com/tutorial/props_split
 * 
 * export default function Greeting(props) {
 *  const { greeting, name, ...others } = props;
 *  return <h3 {...others}>{greeting} {name}</h3>
 * }
 * 
 * 代わりに splitProps でリアクティビティを維持できます:
 * 
 * export default function Greeting(props) {
 *  const [local, others] = splitProps(props, ["greeting", "name"]);
 *  return <h3 {...others}>{local.greeting} {local.name}</h3>
 * }
 * 
 */

/**
 * @returns https://www.solidjs.com/tutorial/props_children
 * 
 * そのため、Solid には children ヘルパーが用意されています。
 * このメソッドは、children プロパティを囲む Memo を作成し、
 * ネストした子のリアクティブな参照を解決して、子を直接操作できるようにします。
 * 
 * この例では、動的なリストがあり、アイテムの color スタイルプロパティを設定したいとします。
 * もし props.children を直接操作してしまうと、ノードを何度も作成しなければならないだけでなく、
 * props.children も関数であり、<For> から返された Memo であることが分かります。
 * 
 */


function PropsIndex() {
  const [name, setName] = createSignal();

  const [name2, setName2] = createSignal("Jakob");

  const [color, setColor] = createSignal("purple");
  return (
    <>
      <h3>Props / イベント</h3>
      <div class="classlist">
        <div class="props">
          <Greeting greeting="Hello" />
          <Greeting name="Jeremy" />
          <Greeting name={name()} />
          <button onClick={() => setName("Jarod")}>Set Name</button>
        </div>
      </div>
      <h3>Props / 分割</h3>
      <div class="classlist">
        <div class="props">
          <Greeting2 greeting="Yo" name={name2()} style="color: teal;" />
          <button onClick={() => setName2("Jarod")}>Set Name</button>
        </div>
      </div>
      <h3>Props / children</h3>
      <div class="classlist">
        <div class="props">
          <ColoredList color={color()}>
            <For each={["Most", "Interesting", "Thing"]}>{item => <div>{item}</div>}</For>
          </ColoredList>
          <button onClick={() => setColor("teal")}>Set Color</button>
        </div>
      </div>
    </>
  )
}

render(() => <PropsIndex />, document.getElementById('root'))
