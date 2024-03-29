import { useCounter } from "./counter";

export default function Nested() {
  const [count, { increment, decrement }] = useCounter();
  return (
    <>
      <div class="c-count">
        <div>{count()}</div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    </>
  );
};