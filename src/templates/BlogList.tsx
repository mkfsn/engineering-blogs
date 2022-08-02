import {graphql, PageProps} from "gatsby";
import React, { useEffect, useState } from "react";
// @ts-ignore
import { BlogPaginatedQuery, SitePageContext } from "../../graphql-schema";
import BlogPostExcerpt from "../components/BlogPostExcerpt";
import Layout from "../components/layout";
import PageButtons from "../components/PageButtons";
// import useJsSearch from "../util/useJsSearch";

type Props = PageProps & {
    data: BlogPaginatedQuery;
    pageContext: SitePageContext;
};

export default function BlogList({ data, pageContext, location }: Props) {
    // const { search } = useJsSearch(pageContext.allBlogs);

    const params = new URLSearchParams(location.search.slice(1));
    const q = params.get("q") ?? "";
    // const results = search(q);
    // const posts = q ? results : data.allMarkdownRemark.nodes;
    const posts = data.allPost.edges;
    const nodes = posts;
    // nodes = posts.filter((n) => new Date(n.frontmatter?.date) < new Date());

    return (
        <Layout>
            <h2 className="is-size-2">Blog Posts</h2>
            <table className="table is-fullwidth">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Publish Date</th>
                    <th>Source Name</th>
                </tr>
                </thead>
                <tbody>
                {
                    // @ts-ignore
                    nodes.map(({node}) => {
                        return  (
                            <BlogPostExcerpt key={ `track-${node.ID}` } data={node} />
                        )
                    }
                    )
                }
                </tbody>
            </table>

            {
                // !initialQuery && <PageButtons pageContext={pageContext} />
                <PageButtons pageContext={pageContext} />
            }
        </Layout>
    );
}

export const pageQuery = graphql`
    query blogPageQuery($skip: Int!, $limit: Int!) {
        allPost(skip: $skip, limit: $limit) {
            edges {
                node {
                    ID
                    Title
                    Description
                    PublishedAt
                    OriginURL
                    SourceName
                }
            }
        }
    }
`;
