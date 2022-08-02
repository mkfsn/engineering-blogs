import {graphql, PageProps} from "gatsby";
import React, { useEffect, useState } from "react";
// @ts-ignore
import { BlogPaginatedQuery, SitePageContext } from "../../graphql-schema";
import BlogPostExcerpt from "../components/BlogPostExcerpt";
import Layout from "../components/Layout";
import PageButtonList from "../components/PageButtonList";
import BlogPostList from "../components/BlogPostList";
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

    return (
        <Layout>
            <h2 className="is-size-2">Blog Posts</h2>
            <BlogPostList posts={posts}/>
            {/*!initialQuery && <PageButtons pageContext={pageContext} />*/}
            <PageButtonList pageContext={pageContext} />
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
