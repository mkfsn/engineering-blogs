import React from "react";
import {Link} from "gatsby";

type PageProps = {
    currentPage: number;
    isActive: boolean;
};

class PageButton extends React.Component<PageProps> {
    render() {
        return (
            <Link
                className={"pagination-link" + (this.props.isActive ? " is-current": "") }
                aria-label={`Goto page ${this.props.currentPage}`}
                to={this.props.currentPage === 1 ? "/" : `/page/${this.props.currentPage}`}
                {...(this.props.isActive && { "aria-current": "page" })}
            >
                {this.props.currentPage}
            </Link>
        )
    }
}

export default PageButton;
