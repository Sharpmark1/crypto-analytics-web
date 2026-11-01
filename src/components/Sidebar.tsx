import { NavLink } from "react-router"

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

function Sidebar({isOpen, onClose} : SidebarProps) {
    return (
        <aside  className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
            <section className="profile">
                <img src="./public/favicon.svg" alt="profile picture" />
                <p>User</p>
            </section>
            <nav className="nav">
                <NavLink onClick={onClose} to="/" className={({ isActive }) => isActive? "nav-link active" : "nav-link"}>Dashboard</NavLink>
                <NavLink onClick={onClose} to="/markets" className={({ isActive }) => isActive? "nav-link active" : "nav-link"}>Markets</NavLink>
                <NavLink onClick={onClose} to="/analytics" className={({ isActive }) => isActive? "nav-link active" : "nav-link"}>Analytics</NavLink>
                <NavLink onClick={onClose} to="/returns" className={({ isActive }) => isActive? "nav-link active" : "nav-link"}>Returns</NavLink>
                <NavLink onClick={onClose} to="/settings" className={({ isActive }) => isActive? "nav-link active" : "nav-link"}>Settings</NavLink>
            </nav>
            <section className="logout">
               <p>logout</p>
            </section>
        </aside>
    )
}

export default Sidebar