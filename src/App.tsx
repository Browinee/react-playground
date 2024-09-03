import Playground from "./module/Playground";
import "./App.scss";
import { PlaygroundProvider } from "./store/PlaygroundProvider";
function App() {
  return (
    <PlaygroundProvider>
      <Playground />
    </PlaygroundProvider>
  );
}

export default App;
