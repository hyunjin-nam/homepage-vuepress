const config = require('../config.json');
module.exports = {
  plugins: {
    'sitemap': {
      hostname: 'https://pake.web.id',
      urls:
        type: array
        required: false
        default: [],
        description: custom urls to append
        example: [
          { url: '/place', changefreq: 'montly'}
                  ]
    },
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
    }
  }
};



