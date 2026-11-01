import { Routes, Route } from "react-router"
import Dashboard from "./pages/Dashboard"
import Markets from "./pages/Markets"
import Analytics from "./pages/Analytics"
import Returns from "./pages/Returns"
import Layout from "./components/Layout"
import Settings from "./pages/Settings"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App