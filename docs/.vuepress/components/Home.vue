<template>
  <main :aria-labelledby="data.heroText !== null ? 'main-title' : null" class="theme-container">
    <hero />

    <!-- Getting Started is Easy -->
    <div class="full-width-container alt-bg">
      <div class="content-container">
        <section class="content-block no-border centered">
          <div class="content">
            <Content slot-key="getting-started-is-easy" />
          </div>
        </section>
      </div>
    </div>

    <div class="content-container">
      <!-- TypeScript -->
      <section class="content-block">
        <div class="image">
          <img :src="$withBase('/trees-1.svg')" style="max-height: 200px" />
        </div>
        <div class="content">
          <Content slot-key="browser-and-node" />
        </div>
      </section>

      <!-- Chainable API -->
      <section class="content-block left">
        <div class="image">
          <img :src="$withBase('/chainsaw.svg')" style="max-height: 150px" />
        </div>
        <div class="content">
          <Content slot-key="chainable-api" />
          <!-- <h2>A Fluent, Chainable API</h2>
          <p>
            Writing your logs should feel natural which is why Adze chose to implement a chainable
            API that feels very much like the standard console API (but better).
          </p> -->
        </div>
      </section>
    </div>

    <!-- Lumber Scene 1 -->
    <div class="full-width-container alt-bg">
      <div class="content-container">
        <section class="content-block no-border centered">
          <div class="image">
            <img :src="$withBase('/lumber-scene-1.svg')" style="width: 100%; max-height: 300px" />
          </div>
          <div class="content">
            <Content slot-key="everything-configurable" />
          </div>
        </section>
      </div>
    </div>

    <!-- Browser and Node -->
    <div class="content-container">
      <!-- Chainable API -->
      <section class="content-block no-border">
        <div class="image">
          <img :src="$withBase('/truck-loaded.svg')" style="max-height: 200px" />
        </div>
        <div class="content">
          <Content slot-key="typescript-support" />
        </div>
      </section>
    </div>

    <!-- Shed -->
    <div class="content-container">
      <!-- Chainable API -->
      <section class="content-block left">
        <div class="image">
          <img :src="$withBase('/woodmill.svg')" style="max-height: 172px" />
        </div>
        <div class="content">
          <Content slot-key="shed" />
        </div>
      </section>
    </div>

    <!-- Learn More -->
    <div class="full-width-container alt-bg">
      <div class="content-container">
        <section class="content-block no-border">
          <div class="image">
            <img :src="$withBase('/shaped-wood.svg')" style="max-height: 150px" />
          </div>
          <div class="content">
            <Content slot-key="learn-more" />
            <br />
            <p class="action">
              <nav-link class="action-button" :item="actionLink" />
            </p>
          </div>
        </section>
      </div>
    </div>

    <div clas="content-container">
      <footer class="footer">
        <Content slot-key="footer" />
      </footer>
    </div>
  </main>
</template>

<script>
import Hero from './Hero.vue';
import NavLink from '@theme/components/NavLink.vue';

export default {
  name: 'Home',

  components: {
    'nav-link': NavLink,
    Hero,
  },

  computed: {
    data() {
      return this.$page.frontmatter;
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText,
      };
    },
  },

  mounted() {
    // Default logs for example
    const { adze } = window.AdzeLib;
    adze().alert('Example alert log');
    adze().error('Example error log');
    adze().warn('Example warning log');
    adze().info('Example info log');
    adze().fail('Example fail log');
    adze().success('Example success log');
    adze().log('Example log');
    adze().debug('Example debug log');
    adze().verbose('Example verbose log');

    // Logs with emoji's
    const log = adze({ use_emoji: true }).seal();
    log().alert('Example alert log');
    log().error('Example error log');
    log().warn('Example warning log');
    log().info('Example info log');
    log().fail('Example fail log');
    log().success('Example success log');
    log().log('Example log');
    log().debug('Example debug log');
    log().verbose('Example verbose log');

    // Custom Emoji
    adze({
      use_emoji: true,
      custom_levels: {
        customError: {
          level: 1,
          method: 'error',
          style:
            'font-size: 10px; font-weight: bold; border-radius: 0 10px 10px 0; border-width: 1px; border-style: solid; padding-right: 10px; background: linear-gradient(to right, #ffcafc, #ff02f2); color: #fff; border-color: #e3bbbb;',
          terminal: ['bgRed', 'white'],
          emoji: '😭',
        },
      },
    }).custom('customError', 'This is a custom error log');
  },
};
</script>

<style lang="stylus">
.home-container
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block

.action-button
  display inline-block
  font-size 1.2rem
  color #fff
  background-color $accentColor
  padding 0.8rem 1.6rem
  border-radius 4px
  transition background-color .1s ease
  box-sizing border-box
  border-bottom 1px solid darken($accentColor, 10%)
  &:hover
    background-color lighten($accentColor, 10%)

.features
  border-top 1px solid $borderColor
  padding 1.2rem 0
  margin-top 2.5rem
  display flex
  flex-wrap wrap
  align-items flex-start
  align-content stretch
  justify-content space-between

.feature
  flex-grow 1
  flex-basis 30%
  max-width 30%
  h2
    font-size 1.4rem
    font-weight 500
    border-bottom none
    padding-bottom 0
    color lighten($textColor, 10%)
  p
    color lighten($textColor, 25%)
  img
    display: block
    float: left
    margin-right: 15px
  #chainsaw
    max-height: 50px
  #lumberjack-bust
    max-height: 60px
  #logs-small
    max-height: 50px

.content-container
  max-width $homePageWidth
  margin 0px auto
  display block
  padding-left 40px
  padding-right 40px

.full-width-container
  padding 40px 20px
  &.alt-bg
    background-color $altBgColor

.content-block
  display flex
  padding 60px 0
  margin 40px 0
  border-top 1px solid #eaecef
  flex-direction row
  flex-wrap wrap
  justify-content space-between
  align-items center
  &.no-border
    border 0
  &.left
    flex-direction row-reverse
    flex-wrap none
    .image
      padding-left 20px
      padding-right 0
  &.centered
    flex-direction column
    justify-content center
    align-items start
    .content
      width 100%
      max-width none

  .image
    padding-right: 20px
  .content
    max-width: 60%
    a
      display none
    h2
      padding-left: 15px
      padding-bottom: 0
      font-family: 'Share', 'Helvetica', 'Arial', 'sans-serif'
      color: $textColor
      border-bottom: none
      border-left: 10px solid $adzeBrown
    p
      a
        display inline

.footer
  padding 2.5rem
  border-top 1px solid $borderColor
  text-align center
  color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width initial
      padding 0 2.5rem
  .content-block
    padding 40px 0
    margin 20px 0
    justify-content center
    .content
      max-width 100%


@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
  .content-container
    padding-left 20px
    padding-right 20px
  .features
    flex-direction column
    .feature
      flex-basis auto
      max-width initial
      h2
        font-size 1.25rem
</style>
