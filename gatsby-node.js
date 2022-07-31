const path = require("path")
// const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(
        `
            {
                allPost(
                    sort: { fields: [PublishedAt], order: DESC }
                ) {
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
    `
    )

    const posts = result.data.allPost.edges;
    // [Create each blog post page]

    // Create paginated blog list pages
    const postsPerPage = 30;
    const numPages = Math.ceil(posts.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
        const firstPage = i === 0;
        const currentPage = i + 1;
        createPage({
            path: firstPage ? "/" : `/page/${currentPage}`,
            component: path.resolve("./src/templates/BlogList.tsx"),
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage,
            },
        });
    });
};
