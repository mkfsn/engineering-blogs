import { Link } from "gatsby";
import React from "react";
import "./PageButtons.css";
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
        <div style={{textAlign: 'center'}} >
            <button>
                <Link to="/" rel="first">First</Link>
            </button>
            {!isFirst && (
                <button>
                    <Link to={prev} rel="prev">Previous</Link>
                </button>
            )}
            <span>
                {nums.map((num) => (
                    <button key={num} className={num === currentPage ? "num-active" : ""}>
                        <Link to={num === 1 ? "/" : `/page/${num}`}>{num}</Link>
                    </button>
                ))}
            </span>
            {!isLast && (
                <button>
                     <Link to={`/page/${next}`} rel="next">Next</Link>
                </button>
            )}
            <button>
                <Link to={`/page/${numPages}`} rel="last">Last</Link>
            </button>
        </div>
    );
}

function getStart(currentPage: number, numPages: number): number {
    if (currentPage < 5) {
        return 1
    }

    if (currentPage > numPages - 5) {
        return numPages - 5 + 1
    }

    return currentPage - 1
}
