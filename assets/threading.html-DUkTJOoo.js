import{_ as n,c as a,o as s,a as t}from"./app-C2pf8t7r.js";const e="/assets/thread-example-1-FgKyIF2m.png",p={},o=t(`<h1 id="log-threading-mdc" tabindex="-1"><a class="header-anchor" href="#log-threading-mdc"><span>Log Threading (MDC)</span></a></h1><p>In large applications there are often times when we need to log data that comes from multiple different scopes but we want to collect all of the data and print it in a single log.</p><p>This practice of collating data from many scopes is called <a href="https://www.baeldung.com/mdc-in-log4j-2-logback" target="_blank" rel="noopener noreferrer">Mapped Diagnostic Context</a>. This is a common feature in Java&#39;s Log4J library.</p><p>Adze also supports <a href="https://www.baeldung.com/mdc-in-log4j-2-logback" target="_blank" rel="noopener noreferrer">Mapped Diagnostic Context</a>, or as Adze calls it, <strong>Log Threading</strong>. Think of a log thread like a thread on a message board or reddit where multiple individuals make a comment on a common topic.</p><p>Here is an example of how threads can be used with Adze:</p><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token keyword">import</span> adze <span class="token keyword">from</span> <span class="token string">&#39;adze&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> answer <span class="token operator">=</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span></span>
<span class="line">  adze<span class="token punctuation">.</span><span class="token function">label</span><span class="token punctuation">(</span><span class="token string">&#39;maths&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thread</span><span class="token punctuation">(</span><span class="token string">&#39;added&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> answer <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">return</span> answer<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">subtract</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> answer <span class="token operator">=</span> x <span class="token operator">-</span> y<span class="token punctuation">;</span></span>
<span class="line">  adze<span class="token punctuation">.</span><span class="token function">label</span><span class="token punctuation">(</span><span class="token string">&#39;maths&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thread</span><span class="token punctuation">(</span><span class="token string">&#39;subtracted&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> answer <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">return</span> answer<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token function">subtract</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">adze<span class="token punctuation">.</span><span class="token function">label</span><span class="token punctuation">(</span><span class="token string">&#39;maths&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>dump<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&#39;Results from our thread&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="example-output" tabindex="-1"><a class="header-anchor" href="#example-output"><span>Example Output</span></a></h2><p><img src="`+e+'" alt="Example of a single log dumping out values from multiple scopes"></p><hr><p>Notice that each log within the <code>add</code> and <code>subtract</code> functions does not actually generate a log, but rather they add a key / value pair of data to the <code>&quot;maths&quot;</code> label thread.</p><p>On line 16, we create a log with the <code>&quot;maths&quot;</code> label, which provides it with the same context as the other logs in the thread, and the <code>dump</code> modifier instructs the info log to dump the values from the <code>&quot;maths&quot;</code> thread into the log output.</p><p>We now have a single log that contains values from multiple scopes in our application.</p>',12),c=[o];function l(i,u){return s(),a("div",null,c)}const d=n(p,[["render",l],["__file","threading.html.vue"]]),k=JSON.parse(`{"path":"/getting-started/threading.html","title":"Log Threading (MDC)","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Example Output","slug":"example-output","link":"#example-output","children":[]}],"git":{"updatedTime":1725045640000,"contributors":[{"name":"Andrew Stacy","email":"astacy@stratacache.com","commits":2}]},"filePathRelative":"getting-started/threading.md","excerpt":"\\n<p>In large applications there are often times when we need to log data that comes from multiple\\ndifferent scopes but we want to collect all of the data and print it in a single log.</p>\\n<p>This practice of collating data from many scopes is called <a href=\\"https://www.baeldung.com/mdc-in-log4j-2-logback\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Mapped Diagnostic Context</a>.\\nThis is a common feature in Java's Log4J library.</p>"}`);export{d as comp,k as data};
