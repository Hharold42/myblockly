import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ToolBar from "./components/ToolBar";
import BlockProvider from "./BlocklyContext";
import Canvas from "./components/Canvas";
import Output from "./components/Output";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BlockProvider>
        <div className="flex flex-row h-[100vh] w-[100%]">
          <ToolBar />
          <Canvas />
          <Output />
        </div>
      </BlockProvider>
    </DndProvider>
  );
}

export default App;
