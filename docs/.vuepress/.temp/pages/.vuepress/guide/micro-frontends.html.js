import comp from '/Users/andrewstacy/Projects/personal/adze/docs/.vuepress/.temp/pages/.vuepress/guide/micro-frontends.html.vue';
const data = JSON.parse(
  '{"path":"/.vuepress/guide/micro-frontends.html","title":"Micro-Frontends","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Micro-Frontend Logging","slug":"micro-frontend-logging","link":"#micro-frontend-logging","children":[{"level":3,"title":"Example Architecture","slug":"example-architecture","link":"#example-architecture","children":[]},{"level":3,"title":"Explanation","slug":"explanation","link":"#explanation","children":[]}]},{"level":2,"title":"Best Practices","slug":"best-practices","link":"#best-practices","children":[]}],"git":{"updatedTime":null,"contributors":[]},"filePathRelative":".vuepress/guide/micro-frontends.md"}'
);
export { comp, data };

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data);
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data);
  });
}
