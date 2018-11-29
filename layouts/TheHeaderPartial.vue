<template lang="pug">
  //- Above the fold
  //- Top menu/logo bar
  //- TODO: Hide in small screen / mobile
  //- .bg-blue.uk-position-z-index(uk-sticky="animation:uk-animation-fade" uk-grid).uk-grid
  .uk-section.bg-blue(uk-sticky uk-grid).uk-grid
    
    .uk-width-1-4.uk-padding-remove
      img(src="https://res.cloudinary.com/asifm/image/upload/h_70/v1540605162/darden-logo-dark-new_m2cxtt.png")
    
    div(class="uk-width-3-4@m uk-visible@m")
      ul.tab.uk-navbar-nav.uk-float-right
        li(v-if="this.$route.path != '/'"): nuxt-link(to="/") Home
        li: nuxt-link(to="/data_highlights") Data Highlights
        li: nuxt-link(to="/interactive") Interactive
        li: nuxt-link(to="/publications") Publications
        li: nuxt-link(to="/download_data") Download Data
        li: nuxt-link(to="/about_us") About Us
</template>

<script>
export default {
  data() {
    // console.log(this.$route.path);
    return {};
  },
};
</script>

<style lang="scss" scoped>
.tab a {
  font-family: Roboto;
  font-weight: 300;
  font-size: 1em;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease-in-out;
  &:hover {
    // transition: all 0.6s ease-out;
    // box-shadow: 0px -5px 0 0 orange inset;
    // color: #a7b2cc;
    color: white;
    border-bottom: 10px solid orange;
  }
  &.highlight {
    color: orange !important;
    font-weight: 500;
  }
}
</style>
