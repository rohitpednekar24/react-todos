import React, { useState, useEffect } from "react";

import Todos from "./Components/Todos.jsx";
import AddTodo from "./Components/AddTodo.jsx";

function App() {
  return (
    <>
      <AddTodo />
      <Todos />
    </>
  );
}

export default App;
