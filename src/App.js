import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ToolBar from "./components/ToolBar";
import BlockProvider from "./BlocklyContext";
import Canvas from "./components/Canvas";
import NewOutput from "./components/NewOutput";

//Главный компонент, который добавляется в root.
// DndProvider - это контекст, который используется для передачи данных при перемещении блоков. Поставляется библиотекой react-dnd
// HTML5Backend - бэкенд позволяющий перемещать блоки из компонента-родителя во внешние компоненты
// BlockProvider - кастомный контекст, написанный для упрощения работы с состояниями страницы и глобального хранения данных, без утечек
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BlockProvider>
        <div className="flex flex-row h-[100vh] w-[100%]">
          <ToolBar />
          <Canvas />
          <NewOutput />
        </div>
      </BlockProvider>
    </DndProvider>
  );
}

export default App;
