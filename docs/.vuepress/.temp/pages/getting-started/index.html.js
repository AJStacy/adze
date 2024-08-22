import comp from '/Users/andrewstacy/Projects/personal/adze/docs/.vuepress/.temp/pages/getting-started/index.html.vue';
const data = JSON.parse(
  '{"path":"/getting-started/","title":"Introduction","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Why is this named Adze?","slug":"why-is-this-named-adze","link":"#why-is-this-named-adze","children":[]},{"level":2,"title":"Adze Demo","slug":"adze-demo","link":"#adze-demo","children":[]},{"level":2,"title":"Why should I use Adze?","slug":"why-should-i-use-adze","link":"#why-should-i-use-adze","children":[{"level":3,"title":"Here is a simple preview","slug":"here-is-a-simple-preview","link":"#here-is-a-simple-preview","children":[]}]},{"level":2,"title":"What does the API look like?","slug":"what-does-the-api-look-like","link":"#what-does-the-api-look-like","children":[{"level":3,"title":"What about child loggers?","slug":"what-about-child-loggers","link":"#what-about-child-loggers","children":[]}]}],"git":{"updatedTime":null,"contributors":[]},"filePathRelative":"getting-started/README.md"}'
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
