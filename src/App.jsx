import { useState } from "react";

import Home from "./pages/Home";

import Preloader from "./components/preloader/Preloader";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {!loading && <Home />}
    </>
  );
};

export default App;
