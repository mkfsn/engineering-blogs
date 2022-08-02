import React from 'react'
import { Link } from 'gatsby'
import {FaGithub} from "react-icons/all";

const navbarStyle = {
    background: 'rebeccapurple',
}

const brandLinkStyle = {
    color: 'white',
    textDecoration: 'none',
}

type Props = {
    siteTitle: any;
}

class Header extends React.Component<Props> {
    render() {
        return (
            <nav className="navbar mb-5" role="navigation" aria-label="main navigation" style={navbarStyle}>
                <div className="container">
                    <div className="navbar-brand">
                        <Link className="navbar-item" to="/" style={brandLinkStyle}>
                            <h1 className="is-size-1">{this.props.siteTitle}</h1>
                        </Link>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <a className="is-size-3" target="_blank" href="https://github.com/mkfsn/engineering-blogs">
                                        <FaGithub color="white"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header
