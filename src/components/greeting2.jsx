import { splitProps } from "solid-js";

export default function Greeting(props) {
  const [local, others] = splitProps(props, ["greeting", "name"]);
  return <h4 {...others}>{local.greeting} {local.name}</h4>
}