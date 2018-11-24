
<script>
// ::import components
import ExploreMap from '@/components/ExploreMap';

// ::import content
import DataIntro from '@/content/DataIntro.md';
import DownloadIntro from '@/content/DownloadIntro.md';
import DataCitation from '@/content/DataCitation.md';
import MethodSummary from '@/content/MethodSummary.md';

export default {
  components: {
    DataIntro,
    DownloadIntro,
    DataCitation,
    MethodSummary,
    ExploreMap,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>


<template lang="pug">
  
div
  //- HERO
  
  div
    .uk-height-viewport.uk-text-center.uk-cover-container
      //- todo: uncomment the video (first?) before deploying
      video(uk-cover loop src="https://res.cloudinary.com/asifm/video/upload/v1540171607/news-and-business-background-video-id821841228_x6diii.mp4")
      //- video(uk-cover src="https://res.cloudinary.com/asifm/video/upload/v1540171453/beautiful-white-global-world-map-of-surface-morphing-in-seamless-3d-video-id966450342_zjutqp.mp4")
      //- video.uk-animation-fade(uk-cover src="http://res.cloudinary.com/asifm/video/upload/e_accelerate:-40/e_boomerang/e_loop:1/iStock-899258982_mcsfty.mp4")
    
      .uk-grid(uk-grid).uk-text-center.uk-height-viewport
        //- Title on hero
        .uk-width-1-1.uk-margin-remove.uk-position-relative.uk-position-left
          #title.my-text-heavy.uk-h1.uk-animation-fade.bg-blue-fade-out-6.fg-orange-900.uk-padding-large.uk-heading-primary.uk-position-relative.uk-position-center Global Corporate Patent Data
            .uk-h3.fg-orange-50.uk-margin-remove-bottom.uk-margin-medium-top The Number of Patents Assigned Every Year<br> by the United States Patent and Trademark Office 
            .uk-h3.fg-orange-500.uk-margin-remove-top To Publicly Listed Companies Worldwide Since 1950
            
            .uk-heading-line
              .uk-h2.fg-white 2018
        //::-  Ends here, above the fold
  
  .uk-section.uk-section-secondary.uk-padding.uk-preserve-color(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
    .uk-container-expand.uk-grid.uk-grid-small.uk-grid-match
      div.uk-width-1-2
        .uk-card.uk-card-body.uk-padding-large
          div.text-medium.fg-white
            data-intro
            p This research project was made possible with the financial support from the <em>Batten Institute for Entrepreneurship and Innovation</em> and the <em>Richard A. Mayo Center for Asset Management</em> at the UVA Darden School of Business.
      
      div.uk-width-1-4
        .uk-card.uk-card-default.uk-card-body.uk-box-shadow-small
          .uk-card
            h4 Download the Data
            download-intro
            button.uk-button.uk-button-secondary Download
          
        div.uk-background-muted.uk-padding
          data-citation
      
      div.uk-width-1-4
        .uk-card.uk-card-default.uk-card-body
          h4 Interview
          p To add the podcast interview. The one here is an unrelated sample. Esse commodo veniam consectetur dolore aliquip sit nostrud ad eu proident exercitation amet ad.
          audio(controls).uk-margin-remove
            //- source(src="https://mcdn.podbean.com/mf/download/zvy6h7/FAMILY_OWNED_BUSINESSES.mp3" type="audio/mp3")
        .uk-background-muted.uk-padding
          h4 Excepteur esse aliqua
          p Nisi cillum anim mollit anim commodo anim labore culpa incididunt do est enim. Ea elit veniam fugiat voluptate esse quis officia non nulla dolor labore veniam. Deserunt excepteur culpa minim consequat fugiat commodo.
          p Pariatur proident esse excepteur deserunt. Dolor veniam ea Lorem sunt. Dolore id non aute enim mollit culpa quis proident ea.
  
  .uk-section.uk-section-primary(uk-scrollspy="cls:uk-animation-fade; delay: 100; repeat: true")
    .uk-container.uk-container-small
      .uk-card.uk-card-body.uk-card-default.bg-orange-200
        .uk-h4.uk-card-title.fg-blue How We Compiled the Data
        .uk-column-1-2.uk-column-divider
          method-summary

  //- Map
  .uk-section.bg-orange-600(uk-scrollspy="cls:uk-animation-fade; delay: 100; repeat: true")
    explore-map
  
  .uk-section.uk-section-primary(uk-scrollspy="cls:uk-animation-fade; delay: 100; repeat: true")
    .uk-container
      h3 Top Ten Companies
        img(src="https://res.cloudinary.com/asifm/image/upload/v1542499301/topten-companies-2001-2017_mfvubu.png")

  .uk-section(uk-scrollspy="cls:uk-animation-fade; delay: 100; repeat: true")
    .uk-container.uk-container-large
      .uk-grid(uk-grid).uk-padding
        .uk-width-1-3
          .uk-h2 Rise of Asia in Corporate Innovation
          video(loop controls autoplay="true" src="https://res.cloudinary.com/asifm/video/upload/v1542501578/rd-patent-scatter-1950-2016_sdtjzu.mp4")
        .uk-width-2-3(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
          img(src="https://res.cloudinary.com/asifm/image/upload/v1542499298/regiongrowth-line-1950-2017_g3qcdh.png")

  
  .uk-section.uk-section-secondary(uk-scrollspy="cls:uk-animation-fade; delay: 100; repeat: true")       
    .uk-container.uk-container-small
      .uk-card.uk-card-body.uk-card-default.bg-blue-100(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
        .uk-h4.uk-card-title Changing Distribution of industries
        img(src="https://res.cloudinary.com/asifm/image/upload/v1542499302/industryshare-bar-1950-2017_ymsqbq.png")
      .uk-card.uk-card-body.uk-card-default.bg-orange-100(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
        .uk-h4.uk-card-title.fg-blue Changing Distribution of Regions
        img(src="https://res.cloudinary.com/asifm/image/upload/v1542502401/regionshare-bar-1950-2017_fsv2o3.png")
      .uk-card.uk-card-body.uk-card-default.bg-blue-50(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
        .uk-h4.uk-card-title Distribution of industries by Region
        img(src="https://res.cloudinary.com/asifm/image/upload/v1542499301/industry-by-region-current_upgcu6.png")
      .uk-card.uk-card-body.uk-card-default(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
        .uk-h4.uk-card-title.fg-blue Share of Industries in Patents Awarded
        img(src="https://res.cloudinary.com/asifm/image/upload/v1542504117/industryshare-current_k0cugj.png")
      
      
</template>

<style lang="scss">
audio {
  // min-width: 400px;
  height: 60px;
  object-fit: inherit;
}

#title .uk-h3,
.uk-h4,
.uk-h5 {
  font-weight: 300;
}

// To prevent a white line showing up under the navbar
.uk-sticky-placeholder {
  background-color: #232d4b;
}
</style>
