import React from 'react'
import { Link } from 'gatsby'

const navbarStyle = {
    background: 'rebeccapurple',
    marginBottom: '1.45rem',
}

const brandLinkStyle = {
    color: 'white',
    textDecoration: 'none',
}

// @ts-ignore
const Header = ({ siteTitle }) => (
    <nav className="navbar" role="navigation" aria-label="main navigation" style={navbarStyle}>
        <div className="container">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/" style={brandLinkStyle}>
                    <h1 className="is-size-1">{siteTitle}</h1>
                </Link>
            </div>
        </div>
    </nav>
)

export default Header
