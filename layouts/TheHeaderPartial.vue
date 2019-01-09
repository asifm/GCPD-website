<template lang="pug">
  nav.uk-navbar-right(uk-navbar uk-sticky="show-on-up:true; animation:uk-animation-slide-top").uk-box-shadow-small.bg-blue-50
    img(src="https://res.cloudinary.com/asifm/image/upload/w_300/v1543573588/darden_rgb-02_qrpxwe.png").uk-float-left.uk-margin-left
    .uk-navbar-right.uk-margin-right
      ul.uk-navbar-nav
        li.uk-button-text.uk-animation-fade(v-show="this.$route.path != '/'"): nuxt-link(to="/") Home
        li.uk-button-text
          nuxt-link(to="/data_highlights") Data Highlights
          //- .uk-navbar-dropdown
          //-   ul.uk-nav.uk-navbar-dropdown-nav
          //-     li.uk-button-text: nuxt-link(to="#") Companies
          //-     li.uk-button-text: nuxt-link(to="#") Industries
          //-     li.uk-button-text: nuxt-link(to="#") Countries
        li.uk-button-text
          nuxt-link(to="/interactive") Interactive
          //- .uk-navbar-dropdown
            //- ul.uk-nav.uk-navbar-dropdown-nav
              //- li.uk-button-text: nuxt-link(to="/interactive/explore_all") Explore All Data
              //- li.uk-button-text: nuxt-link(to="/interactive/companies") Companies
              //- li.uk-button-text: nuxt-link(to="/interactive/industries") Industries
              //- li.uk-button-text: nuxt-link(to="/interactive/countries") Countries

        li.uk-button-text: nuxt-link(to="/publications") Publications
        li.uk-button-text: nuxt-link(to="/download_data") Download Data
        li.uk-button-text.my-text-medium: nuxt-link(to="/about_us") About Us

</template>
