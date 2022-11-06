import { render } from "solid-js/web";
import { Suspense } from "solid-js";
import fetchProfileData from "../components/asynchronous/mock-api";
import ProfilePage from "../components/asynchronous/profile"
import "../assets/css/styles.css";

const AsyncHronous4 = () => {
  const { user, posts, trivia } = fetchProfileData();
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ProfilePage user={user()} posts={posts()} trivia={trivia()} />
    </Suspense>
  );
};
render(AsyncHronous4, document.getElementById("root"));