import { Routes, Route } from "react-router"
import Dashboard from "./pages/Dashboard"
import Markets from "./pages/Markets"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/markets" element={<Markets />} />
    </Routes>
  )
}

export default App