import { Routes, Route } from "react-router"
import { lazy, Suspense } from "react"
import Layout from "./components/Layout"

const Dashboard = lazy(() => import("./pages/Dashboard"))
const Markets = lazy(() => import("./pages/Markets"))
const Analytics = lazy(() => import("./pages/Analytics"))
const Returns = lazy(() => import("./pages/Returns"))
const Settings = lazy(() => import("./pages/Settings"))


function App() {
  return (
    <Suspense fallback={<div>Loading page</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App