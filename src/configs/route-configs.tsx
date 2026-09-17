import { Route, Routes } from "react-router";
import App from "../App";

export default function RouterConfig() {
  return (
    <>
      <Routes>
        <Route path="" element={<App />}></Route>
      </Routes>

      <Routes>
        <Route path="" element=""></Route>
      </Routes>
    </>
  );
}
