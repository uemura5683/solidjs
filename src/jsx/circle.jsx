/* @refresh reload */
import { render } from 'solid-js/web';
import { createSignal, For, onMount, onCleanup} from "solid-js";
import "../assets/css/styles.css";

function CircleIndex() {

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

  return (
    <>
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
    </>
  )
}
render(() => <CircleIndex />, document.getElementById('root'))