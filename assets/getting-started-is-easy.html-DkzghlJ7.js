import{_ as n,c as s,o as a,a as e}from"./app-C2pf8t7r.js";const t={},i=e(`<p>First install Adze from <a href="https://www.npmjs.com/package/adze" target="_blank" rel="noopener noreferrer">npm</a>.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># npm</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-S</span> adze</span>
<span class="line"></span>
<span class="line"><span class="token comment"># pnpm</span></span>
<span class="line"><span class="token function">pnpm</span> <span class="token function">add</span> adze</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Then import it and start writing logs! No other configuration is required.</p><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token keyword">import</span> adze <span class="token keyword">from</span> <span class="token string">&#39;adze&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">adze<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&#39;This is an info level log from AdzeJS!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),l=[i];function p(c,r){return a(),s("div",null,l)}const d=n(t,[["render",p],["__file","getting-started-is-easy.html.vue"]]),m=JSON.parse('{"path":"/home/getting-started-is-easy.html","title":"","lang":"en-US","frontmatter":{},"headers":[],"git":{"updatedTime":1725908547000,"contributors":[{"name":"Andrew Stacy","email":"astacy@stratacache.com","commits":2}]},"filePathRelative":"home/getting-started-is-easy.md","excerpt":"<p>First install Adze from <a href=\\"https://www.npmjs.com/package/adze\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">npm</a>.</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-highlighter=\\"prismjs\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre><code><span class=\\"line\\"><span class=\\"token comment\\"># npm</span></span>\\n<span class=\\"line\\"><span class=\\"token function\\">npm</span> <span class=\\"token function\\">install</span> <span class=\\"token parameter variable\\">-S</span> adze</span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span class=\\"token comment\\"># pnpm</span></span>\\n<span class=\\"line\\"><span class=\\"token function\\">pnpm</span> <span class=\\"token function\\">add</span> adze</span>\\n<span class=\\"line\\"></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}');export{d as comp,m as data};
