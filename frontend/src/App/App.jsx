import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Routes from "../routes";

function App() {
  return (
    <>
      <div className="App">
        {/* <UserProvider> */}
        <ToastContainer
          theme="light"
          style={{ width: "36rem", fontSize: "1.6rem" }}
        />
        <article className="App">
          <Routes />
        </article>
        {/* </UserProvider> */}
      </div>
    </>
  );
}

export default App;
