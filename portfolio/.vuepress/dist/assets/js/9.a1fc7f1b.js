(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{278:function(t,s,e){},288:function(t,s,e){"use strict";e(278)},297:function(t,s,e){"use strict";e.r(s);e(16),e(25);var r={computed:{posts(){return this.$site.pages.filter(t=>t.path.startsWith("/works/")&&!t.frontmatter.works_index).sort((t,s)=>new Date(s.frontmatter.date)-new Date(t.frontmatter.date))}}},n=(e(288),e(24)),a=Object(n.a)(r,(function(){var t=this,s=t._self._c;return s("div",{staticClass:"project-list"},t._l(t.posts,(function(e){return s("router-link",{key:e.title,staticClass:"post",style:{backgroundImage:`url(${e.frontmatter.thumbnail})`},attrs:{to:e.path,tag:"div"}},[s("div",{staticClass:"info"},[s("h2",[t._v(t._s(e.frontmatter.title))]),t._v(" "),e.frontmatter.description?s("span",[t._v(t._s(e.frontmatter.description))]):t._e()])])})),1)}),[],!1,null,"343d0184",null);s.default=a.exports}}]);