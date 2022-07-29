import React from 'react'
import { graphql } from 'gatsby'

// @ts-ignore
import Layout from '../components/layout'

// @ts-ignore
const IndexPage = ({ data }) => (
    <Layout>
      <h2>Blog Posts</h2>
      <table>
        <thead>
        <tr>
          <th>Title</th>
          <th>Publish Date</th>
          <th>Source Name</th>
        </tr>
        </thead>
        <tbody>
        {
            data.allPost.edges.map(
                // @ts-ignore
                ({ node }) => (
                    <tr key={ `track-${node.TrackId}` }>
                        <td><a target="_blank" href={node.OriginURL}>{ node.Title }</a></td>
                        <td>{ node.PublishedAt }</td>
                        <td>{ node.SourceName }</td>
                    </tr>
                )
            )
        }
        </tbody>
      </table>
    </Layout>
)

export default IndexPage

export const query = graphql`
  query {
#    allPost(skip: 0, limit: 50, filter: {SourceName: {eq: "Paypay"}}) {
    allPost(limit: 50) {
      edges {
        node {
          id
          Title
          Description
          PublishedAt
          OriginURL
          SourceName
        }
      }
    }
  }
`
