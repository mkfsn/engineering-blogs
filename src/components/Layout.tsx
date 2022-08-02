import React from 'react'
import PropTypes from 'prop-types'
// @ts-ignore
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './Header'
import './Layout.scss'

// @ts-ignore
const Layout = ({ children }) => {
    const siteQuery = graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `
    return (
        <StaticQuery
            query={siteQuery}
            render={data => (
                <>
                    <Helmet
                        title={data.site.siteMetadata.title}
                        meta={[
                            { name: 'description', content: 'Sample' },
                            { name: 'keywords', content: 'sample, something' },
                        ]}
                    >
                        <html lang="en" />
                    </Helmet>
                    <Header siteTitle={data.site.siteMetadata.title} />
                    <div className="container mb-5 pb-5">
                        {children}
                    </div>
                </>
            )}
        />
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
