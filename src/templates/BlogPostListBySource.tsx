import {graphql, PageProps} from "gatsby";
import React, { useEffect, useState } from "react";
// @ts-ignore
import { bySourceQuery, SitePageContext } from "../../graphql-schema";
import BlogPostExcerpt from "../components/BlogPostExcerpt";
import Layout from "../components/Layout";
import PageButtonList from "../components/PageButtonList";
import BlogPostList from "../components/BlogPostList";
// import useJsSearch from "../util/useJsSearch";

type Props = PageProps & {
    data: bySourceQuery;
    pageContext: any;
};

export default function BlogList({ data, pageContext, location }: Props) {
    const posts = data.allPost.edges;

    return (
        <Layout>
            <h2 className="is-size-2">{pageContext.source}</h2>
            <BlogPostList posts={posts}/>
        </Layout>
    );
}

export const pageQuery = graphql`
    query bySource($source: String!) {
        allPost( filter: {SourceName: {eq: $source}} ) {
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
