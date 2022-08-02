import React from "react";
import BlogPostExcerpt from "./BlogPostExcerpt";

type Props = {
    posts: Array<{node: any}>;
};

class BlogPostList extends React.Component<Props> {
    render() {
        return (
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
                    this.props.posts.map(({node}) => ( <BlogPostExcerpt key={`track-${node.ID}`} data={node} /> ))
                }
                </tbody>
            </table>
        );
    }
}

export default BlogPostList;
