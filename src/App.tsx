import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./layout/layout"
import { IndexPage } from "./pages"
import { GamePage } from "./pages/game"
import { EditPage } from "./pages/edit"
const App = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  )
}

export default App
