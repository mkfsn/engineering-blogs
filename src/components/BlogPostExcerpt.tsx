import React from "react";
import {Link} from "gatsby";
import {normalizeSource} from "../utils/strings";

type Props = {
    data: any;
};

export default function BlogPostExcerpt({data}: Props) {
    return (
        <tr>
            <td><a target="_blank" href={data.OriginURL}>{ data.Title }</a></td>
            <td>{ data.PublishedAt }</td>
            <td>
                <Link to={`/source/${normalizeSource(data.SourceName)}`}>
                    { data.SourceName }
                </Link>
            </td>
        </tr>
    );
}
