<template lang="pug">
  //- Above the fold
  //- Top menu/logo bar
  //- TODO: Hide in small screen / mobile
  .uk-section.bg-blue.uk-position-z-index(uk-sticky="animation:uk-animation-fade" uk-grid).uk-grid
    
    .uk-width-1-4
      img(src="https://res.cloudinary.com/asifm/image/upload/v1540605162/darden-logo-dark-new_m2cxtt.png")
    
    .uk-width-3-4
        ul.uk-navbar-nav.uk-position-center-right.uk-padding-small.tab
          li(v-if="this.$route.path != '/'"): nuxt-link(to="/") Home
          li: nuxt-link(to="/aboutdata") About the Data
          li: nuxt-link(to="/usedata") Using the Data
          li: nuxt-link(to="/aboutus") About Us
          li: nuxt-link(to="/publications") Publications
          li: nuxt-link(to="/download").highlight Download
         
</template>

<script>
export default {
  data() {
    // console.log(this.$route.path);
    return {};
  }
};
</script>

<style lang="scss" scoped>
.tab a {
  font-family: Roboto;
  font-weight: 300;
  font-size: 1em;
  text-decoration: none;
  color: white;
  &:hover {
    transition: all 0.3s ease-out;
    box-shadow: 0 -15px 0 0 orange inset;
  }
  &.highlight {
    color: orange !important;
    font-weight: 500;
  }
}
</style>
