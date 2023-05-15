<template>
  <div class="hero">
    <div class="intro">
      <img :src="$withBase('/logo.svg')" alt="Adze JS " />
      <h1>Isomorphic Logging for Modern JavaScript</h1>
      <div class="button-container">
        <nav-link class="action-button alt" :item="guideLink" />
        <nav-link class="action-button" :item="quickStartLink" />
      </div>
    </div>
    <div class="illustration">
      <div class="image-container">
        <img
          :src="$withBase('/hero.svg')"
          alt="An isometric illustration of a node server and a web browser among trees"
        />
      </div>
      <div class="button-container">
        <nav-link class="action-button alt" :item="guideLink" />
        <nav-link class="action-button" :item="quickStartLink" />
      </div>
    </div>
  </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue';

export default {
  name: 'hero',

  components: {
    'nav-link': NavLink,
  },

  computed: {
    data() {
      return this.$page.frontmatter;
    },

    guideLink() {
      return {
        link: this.data.guideLink,
        text: this.data.guideText,
      };
    },

    quickStartLink() {
      return {
        link: this.data.quickStartLink,
        text: this.data.quickStartText,
      };
    },
  },
};
</script>

<style scoped lang="stylus">
.hero
  display flex
  height 100vh
  flex-direction column
  align-items center
  justify-content center
  @media screen and (min-width: 400px) and (orientation landscape)
    height 230vh
  @media screen and (min-width: 1000px) and (orientation landscape)
    height 100vh
  @media screen and (min-width: 920px)
    flex-direction row
    background rgb(255,255,255)
    background linear-gradient(24deg, rgba(255,255,255,1) 46%, rgba(83,70,61,1) 46%, rgba(83,70,61,1) 49%, rgba(103,83,69,1) 49%, rgba(103,83,69,1) 50%, rgba(170,192,82,1) 50%)
  // padding 0 20px 20px 20px

.action-button
  display inline-block
  font-size 1.2rem
  color #fff
  background-color $accentColor
  padding 0.8rem 1.6rem
  border 0.3rem solid $accentColor
  border-radius 0
  transition background-color .15s ease
  box-sizing border-box
  border-bottom 0.3rem solid darken($accentColor, 10%)
  &:hover
    border-color lighten($accentColor, 10%)
    background-color lighten($accentColor, 10%)
  &.alt
    background-color $white
    border 0.3rem solid $accentColor
    color $accentColor
    &:hover
      color $white
      background-color lighten($accentColor, 10%)
      border-color lighten($accentColor, 10%)

.intro
  padding 0 2rem 0 2rem
  text-align center
  img
    max-width 460px
  h1
    font-size 24px
  .button-container
    display none
  @media screen and (min-width: 920px)
    padding 0 0 0 2rem
    flex-grow 1
    min-height 40vh
    align-self flex-end
    .button-container
      display block

.illustration
  padding 20px
  text-align center
  @media screen and (min-width: 920px)
    min-height 40vh
    flex-grow 1
    align-self flex-start
    .button-container
        display none
  .image-container
    max-width 550px
    margin-bottom 4rem
    img
      max-width 100%
      height auto
    @media screen and (min-width: 540px) and (min-height: 720px) and (orientation: portrait)
      max-width 380px
    @media screen and (min-width: 700px) and (min-height: 720px) and (orientation: portrait)
      max-width 550px
    @media screen and (min-height: 845px) and (min-width: 1138px)
      max-width: 600px
</style>
