import { Link } from "gatsby";
import React from "react";
// @ts-ignore
import { SitePageContext } from "./../graphql-schema";
import PageButton from "./PageButton";

type Props = {
    pageContext: SitePageContext;
};

class PageButtons extends React.Component<Props> {
    render() {
        const { numPages, currentPage } = this.props.pageContext;
        if (!numPages || !currentPage) return null;

        const isFirst = currentPage === 1;
        const isLast = currentPage === numPages;
        const prev = currentPage === 2 ? "/" : `/page/${currentPage - 1}`;
        const next = currentPage + 1;

        const start = getStart(currentPage, numPages);
        const nums = Array.from({ length: 5 }).map((_, i) => i + start);

        return (
            <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                {
                    isFirst
                        ? <a className="pagination-previous is-disabled">Previous</a>
                        : <Link className="pagination-previous" to={prev} rel="prev">Previous</Link>
                }
                {
                    isLast
                        ? <a className="pagination-next is-disabled">Next</a>
                        : <Link className="pagination-next" to={`/page/${next}`} rel="next">Next</Link>
                }
                <ul className="pagination-list">
                    <li><PageButton currentPage={1} isActive={currentPage === 1} /></li>
                    {
                        currentPage > 5 && (<li><span className="pagination-ellipsis">&hellip;</span></li>)
                    }
                    {
                        nums.map((num) => (
                            <li key={num}><PageButton currentPage={num} isActive={currentPage === num} /></li>
                        ))
                    }
                    {
                        currentPage <= numPages-5 && (<li><span className="pagination-ellipsis">&hellip;</span></li>)
                    }
                    <li><PageButton currentPage={numPages} isActive={currentPage === numPages} /></li>
                </ul>
            </nav>
        );
    }
}

function getStart(currentPage: number, numPages: number): number {
    if (currentPage <= 5) {
        return 2
    } else if (currentPage > numPages - 5) {
        return numPages - 5
    }

    return currentPage - 2
}

export default PageButtons;
