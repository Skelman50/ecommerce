import React, { useState, useEffect } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    document.title = `Clecked ${count}`;
  });

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>click</button>
    </div>
  );
};

export default App;
