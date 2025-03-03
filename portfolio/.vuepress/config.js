const config = require('../config.json');

module.exports = {
  plugins: {
    'clean-urls': {
      normalSuffix: '',
      indexSuffix: '',
    },
  },
  title: config.title,
  description: config.description,
  base: "/",
  themeConfig: {
    logo: config.logo,
    footer: config.footer,
    nav: config.navigation,
  },
  head: [
    ['link', { rel: "icon", href: config.favicon }]
  ],
  markdown: {
    anchor: {
      permalink: false
    },
    extendMarkdown: md => {
      md.use(require('markdown-it-imsize'))
    }
  },
  enhanceAppFiles: [
    require.resolve('./styles/index.css'),  // Ensure the path to your custom index.scss is correct
  ],
};
