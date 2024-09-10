import{_ as e,c as s,o as a,a as n}from"./app-C2pf8t7r.js";const t="/assets/setup-shared-logger-DSr1A1Lk.png",o={},i=n(`<h1 id="setting-up-adze" tabindex="-1"><a class="header-anchor" href="#setting-up-adze"><span>Setting Up Adze</span></a></h1><p>Although Adze can be used in a very simple, no-config manner by just importing it and using it, most often we want to centrally create shared loggers that can be imported and used throughout our application.</p><h2 id="create-a-shared-logger" tabindex="-1"><a class="header-anchor" href="#create-a-shared-logger"><span>Create a Shared Logger</span></a></h2><p>To create a shared logger, first create a new file somewhere that makes sense in your application (like <code>./src/logger.[ts|js]</code>).</p><p>After you have created your file, let&#39;s import our dependencies.</p><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token comment">// ./src/logger.ts</span></span>
<span class="line"><span class="token keyword">import</span> adze<span class="token punctuation">,</span> <span class="token punctuation">{</span> setup <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;adze&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// ...more setup code will go here</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Here you may have noticed the presence of the <code>setup</code> function that we are importing. This function is used to create a global log store and to apply global configuration to all adze logs.</p><p>Now that we have imported our dependencies, let&#39;s create and export a shared logger that has emoji&#39;s enabled and outputs timestamps with every log.</p><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token comment">// ./src/logger.ts</span></span>
<span class="line"><span class="token keyword">import</span> adze<span class="token punctuation">,</span> <span class="token punctuation">{</span> setup <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;adze&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> logger <span class="token operator">=</span> adze<span class="token punctuation">.</span>withEmoji<span class="token punctuation">.</span>timestamp<span class="token punctuation">.</span><span class="token function">seal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> logger<span class="token punctuation">;</span></span>
<span class="line">set<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The interesting thing about the code above is that we are calling the <code>seal</code> method instead of a typical log terminator like <code>info</code> or <code>error</code>.</p><p>What <code>seal</code> does is it returns a new Log class that inherits any modifiers and configuration from the parent log chain. In this case, it will inherit the modifiers <code>withEmoji</code> and <code>timestamp</code>.</p><p>Now, let&#39;s import and use our new shared logger.</p><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token comment">// ./src/index.ts</span></span>
<span class="line"><span class="token keyword">import</span> logger <span class="token keyword">from</span> <span class="token string">&#39;./logger&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">logger<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Logging from the index.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="example-output-from-index-ts" tabindex="-1"><a class="header-anchor" href="#example-output-from-index-ts"><span>Example output from index.ts</span></a></h4><p><img src="`+t+'" alt="Shared logger output"></p>',15),p=[i];function r(l,c){return a(),s("div",null,p)}const u=e(o,[["render",r],["__file","setup.html.vue"]]),g=JSON.parse('{"path":"/getting-started/setup.html","title":"Setting Up Adze","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Create a Shared Logger","slug":"create-a-shared-logger","link":"#create-a-shared-logger","children":[]}],"git":{"updatedTime":1725045640000,"contributors":[{"name":"Andrew Stacy","email":"astacy@stratacache.com","commits":2}]},"filePathRelative":"getting-started/setup.md","excerpt":"\\n<p>Although Adze can be used in a very simple, no-config manner by just importing it and using it,\\nmost often we want to centrally create shared loggers that can be imported and used throughout our\\napplication.</p>\\n<h2>Create a Shared Logger</h2>\\n<p>To create a shared logger, first create a new file somewhere that makes sense in your application\\n(like <code>./src/logger.[ts|js]</code>).</p>"}');export{u as comp,g as data};
