import comp from '/Users/andrewstacy/Projects/personal/adze/docs/.vuepress/.temp/pages/getting-started/log-class.html.vue';
const data = JSON.parse(
  '{"path":"/getting-started/log-class.html","title":"Adze Class","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"adze","slug":"adze","link":"#adze","children":[]},{"level":2,"title":"seal","slug":"seal","link":"#seal","children":[{"level":3,"title":"Interface","slug":"interface","link":"#interface","children":[]},{"level":3,"title":"Example","slug":"example","link":"#example","children":[]},{"level":3,"title":"Output","slug":"output","link":"#output","children":[]}]}],"git":{"updatedTime":1724360151000,"contributors":[{"name":"Andrew Stacy","email":"astacy@stratacache.com","commits":1}]},"filePathRelative":"getting-started/log-class.md"}'
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
