type HeaderProps = {
    onMenuClick: () => void
    search: string
    onSearchChange: (value: string) => void
}

function Header({onMenuClick, search, onSearchChange}: HeaderProps) {
    return (
        <header className="header">
            <button
                type="button"
                className="menu-toggle"
                onClick={onMenuClick}
                aria-label="Open navigation"
                >
                ☰
            </button>
            <h1>Crypto Market Analytics</h1>
            <div className="search">
                <img src="./public/favicon.svg" alt="search" className="search-icon" />
                <input
                    type="text"
                    placeholder="Search coins"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                />
            </div>
        </header>
    )
}

export default Header