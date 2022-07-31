import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Engineering Blogs`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
      "gatsby-plugin-sass",
      {
        // Querying to a SQLite database
        resolve: `gatsby-source-sql`,
        options: {
          typeName: 'Post',
          // This is the field under which the data will be accessible in a future version
          fieldName: 'blogs',
          dbEngine: {
            client: 'sqlite3',
            connection: {
              filename: './test.db',
            },
            useNullAsDefault: true
          },
          queryChain: function (x: any) {
            return x
                .select(
                    "posts.id as ID",
                    "posts.title as Title",
                    "posts.description as Description",
                    "posts.published_at as PublishedAt",
                    "posts.origin_url as OriginURL",
                    "sources.name as SourceName"
                )
                .from("posts")
                .innerJoin("sources", "posts.source_id", "sources.id")
                .orderBy('posts.published_at', 'desc')
          }
        }
      }
  ]
};

export default config;
