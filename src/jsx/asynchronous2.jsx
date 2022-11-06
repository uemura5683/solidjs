import { createSignal, createResource } from "solid-js";
import { render } from "solid-js/web";
import "../assets/css/styles.css";

/**
 * 
 * @returns
 * https://www.solidjs.com/tutorial/async_resources?solved
 * 
*/
const fetchUser = async (id) =>
  (await fetch(`https://swapi.dev/api/people/${id}/`)).json();

const AsyncHronous2 = () => {
  const [userId, setUserId] = createSignal();
  const [user] = createResource(userId, fetchUser);
  return (
    <>
      <input
        type="number"
        min="1"
        placeholder="Enter Numeric Id"
        onInput={(e) => setUserId(e.currentTarget.value)}
      />
      <span>{user.loading && "Loading..."}</span>
      <div>
        <pre>{JSON.stringify(user(), null, 2)}</pre>
      </div>
    </>
  );
};
render(AsyncHronous2, document.getElementById("root"));