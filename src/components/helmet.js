import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import favicon from "../images/favicon.ico";

export default () => (
  <StaticQuery
    query={graphql`
      query helmetQuery {
        site {
          siteMetadata {
            title
            author
            description
            keywords
          }
        }
      }
    `}
    render={data => (
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=0"
        />
        <meta name="description" content={data.site.siteMetadata.description} />
        <meta name="keywords" content={data.site.siteMetadata.keywords} />
        <title>{data.site.siteMetadata.title}</title>
        <html lang="es" />
        {/* Google / Search Engine Meta Tags */}
        <meta itemprop="name" content={data.site.siteMetadata.author} /> />
        <meta
          itemprop="description"
          content={data.site.siteMetadata.description}
        />
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>
    )}
  />
);
