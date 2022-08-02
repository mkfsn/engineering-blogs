import { Link } from "gatsby";
import React from "react";
import "./PageButtons.css";
// @ts-ignore
import { SitePageContext } from "./../graphql-schema";

type Props = {
    pageContext: SitePageContext;
};

export default function PageButtons({ pageContext }: Props) {
    const { numPages, currentPage } = pageContext;
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
                <li>
                    <Link
                        className={"pagination-link" + (currentPage === 1 ? " is-current": "") }
                        aria-label="Goto page 1"
                        to="/"
                        {...(currentPage === 1 && { "aria-current": "page" })}
                    >
                        1
                    </Link>
                </li>
                {
                    currentPage > 5 && (<li><span className="pagination-ellipsis">&hellip;</span></li>)
                }
                {
                    nums.map((num) => (
                        <li key={num}>
                            <Link
                                className={"pagination-link" + (currentPage === num ? " is-current": "") }
                                to={num === 1 ? "/" : `/page/${num}`}
                                aria-label={`Goto page ${num}`}
                                {...(currentPage === numPages && { "aria-current": "page" })}
                            >
                                {num}
                            </Link>
                        </li>
                    ))
                }
                {
                    currentPage <= numPages-5 && (<li><span className="pagination-ellipsis">&hellip;</span></li>)
                }
                <li>
                    <Link
                        className={"pagination-link" + (currentPage === numPages ? " is-current": "") }
                        to={`/page/${numPages}`}
                        aria-label={`Goto page ${numPages}`}
                        {...(currentPage === numPages && { "aria-current": "page" })}
                    >
                        {numPages}
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

function getStart(currentPage: number, numPages: number): number {
    if (currentPage <= 5) {
        return 2
    } else if (currentPage > numPages - 5) {
        return numPages - 5
    }

    return currentPage - 2
}
