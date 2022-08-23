import { mergeProps } from "solid-js";

export default function Greeting(props) {
  const merged = mergeProps({ greeting: "Hi", name: "John" }, props);
  return <h4>{props.greeting || "Hi"} {props.name || "John"}</h4>
}