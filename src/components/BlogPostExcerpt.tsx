import React from "react";

type Props = {
    data: any;
};

export default function BlogPostExcerpt({data}: Props) {
    return (
        <tr>
            <td><a target="_blank" href={data.OriginURL}>{ data.Title }</a></td>
            <td>{ data.PublishedAt }</td>
            <td>{ data.SourceName }</td>
        </tr>
    );
}
