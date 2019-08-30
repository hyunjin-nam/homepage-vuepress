const config = require('../config.json');
module.exports = {
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
  },
 plugins: [
  [
    '@vuepress/google-analytics',
    {
      'ga': 'UA-122674730-1' // UA-122674730-1
    }

  ]
]
};



