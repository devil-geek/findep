module.exports = {
  siteMetadata: {
    title: "Financiera independencia",
    author: "Carlos Ocejo - Common Sense People",
    description:
      "Préstamos personales, tu tienes el plan, nosotros el préstamo que necesitas. En Financiera independencia te ofrecemos créditos sin aval, sin garantías, fácil, rápido y sin tanto rollo.",
    keywords: `Web developer, Web, Developer, CSS, HTML, JS, Javascript, Gatsby, Bulma Developer, CSS3, HTML5, Seo, Starter`,
    siteUrl: "https://www.independencia.com.mx/"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Makefolio",
        short_name: "Makefolio",
        start_url: "/",
        background_color: "#2980b9",
        theme_color: "#2980b9",
        display: "standalone",
        icon: "src/images/gatsby-icon.png",
        orientation: "portrait"
      }
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-XXXXXXXX-X",
        // Setting this parameter is optional (requried for some countries such as Germany)
        anonymize: true
      }
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Open Sans", "Open Sans:bold", "Montserrat"]
        }
      }
    },
    `gatsby-plugin-sitemap`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-TCNRP7G",
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: true
      }
    }
  ]
};
