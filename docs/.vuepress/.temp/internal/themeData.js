export const themeData = JSON.parse(
  '{"logo":"https://vuejs.press/images/hero.png","navbar":["/",{"text":"Getting Started","link":"/getting-started/introduction"},{"text":"Reference Manual","link":"/reference/introduction"}],"sidebar":{"/getting-started/":[{"text":"Getting Started","link":"/getting-started/introduction","collapsible":false,"children":[{"text":"Introduction","link":"/getting-started/introduction"},{"text":"Installation","link":"/getting-started/installation"},{"text":"Concepts","link":"/getting-started/concepts"},{"text":"Setup","link":"/getting-started/setup"},{"text":"Configuration","link":"/getting-started/configuration"},{"text":"Log Annotation","link":"/getting-started/annotation"},{"text":"Capturing Log Data","link":"/getting-started/capture-data"},{"text":"Log Threading","link":"/getting-started/threading"},{"text":"Filtering Logs","link":"/getting-started/filtering"},{"text":"Tools","link":"/getting-started/tools"},{"text":"Putting It All Together","link":"/getting-started/putting-it-all-together"}]}],"/reference/":[{"text":"Reference Manual","link":"/reference/introduction","collapsible":false,"children":[{"text":"Introduction & Lifecycle","link":"/reference/introduction"},{"text":"Log Class","link":"/reference/log-class"},{"text":"Modifiers","link":"/reference/modifiers"},{"text":"Terminators","link":"/reference/terminators"}]}]},"locales":{"/":{"selectLanguageName":"English"}},"colorMode":"auto","colorModeSwitch":true,"repo":null,"selectLanguageText":"Languages","selectLanguageAriaLabel":"Select language","sidebarDepth":2,"editLink":true,"editLinkText":"Edit this page","lastUpdated":true,"lastUpdatedText":"Last Updated","contributors":true,"contributorsText":"Contributors","notFound":["There\'s nothing here.","How did we get here?","That\'s a Four-Oh-Four.","Looks like we\'ve got some broken links."],"backToHome":"Take me home","openInNewWindow":"open in new window","toggleColorMode":"toggle color mode","toggleSidebar":"toggle sidebar"}'
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData);
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData);
  });
}
