<template lang="pug">
  
div
  //- HERO
  .uk-section.uk-cover-container.uk-height-viewport.uk-text-center
    video.uk-animation-fade(uk-cover src="http://res.cloudinary.com/asifm/video/upload/e_accelerate:-40/e_boomerang/e_loop:1/iStock-899258982_mcsfty.mp4")
    
    //- Title on hero
    .uk-position-cover.bg-blue-fade-out-3
      #title.uk-h1.fg-orange.uk-heading-primary.uk-text-bold.uk-position-center Global Corporate Patent Data 
        .uk-heading-line
          .uk-h2.fg-orange-lighten-6.uk-box-shadow-hover-large 2018
      
  //-  Ends here, above the fold
 
  .uk-section.uk-section-secondary.uk-padding(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true").uk-preserve-color
    .uk-container-expand.uk-grid.uk-grid-small.uk-grid-match
      div.uk-width-1-2
        .uk-card.uk-card-default.uk-card-body
          h6.uk-card-title what's in the Data
          p Key numbers of the data.
          p Do culpa in occaecat duis occaecat nostrud esse ex occaecat ex deserunt minim. Anim Lorem do mollit non irure laborum non quis velit non aliquip aliqua tempor. Nostrud minim laborum velit ex dolore veniam aliquip cupidatat.
          p Commodo irure excepteur eiusmod mollit non nulla consequat excepteur incididunt duis ea officia. Consectetur consectetur proident sunt eiusmod consectetur nisi magna sit ipsum nostrud. Ut officia tempor minim in sit nulla nostrud pariatur magna. Amet anim tempor elit velit labore dolore. Cupidatat culpa laboris ea ea ex labore consequat excepteur. Duis ex anim et ex duis Lorem nisi laboris ad adipisicing consequat nulla voluptate. Exercitation id excepteur Lorem cupidatat qui in incididunt irure aliquip laboris. 
      div.uk-width-1-4
        .uk-card.uk-card-default.uk-card-body
          h6.uk-card-title Download Data
          p cat duis occaecat nostrud esse ex occaecat ex deserunt minim. Anim Lorem do mollit non irure laborum non quis velit non aliquip aliqua tempor. Nostrud minim laborum velit ex dolore veniam aliquip cupidatat.
      div.uk-width-1-4
        .uk-card.uk-card-default.uk-card-body.bg-blue-lighten-7
          h6.uk-card-title Interview
          audio(controls)
            source(src="https://mcdn.podbean.com/mf/download/zvy6h7/FAMILY_OWNED_BUSINESSES.mp3" type="audio/mp3")
          p To add the podcast interview. Esse commodo veniam consectetur dolore aliquip sit nostrud ad eu proident exercitation amet ad. 
 
  .uk-section.uk-section-primary.uk-text-center.uk-padding
    .uk-grid(uk-grid).uk-container-expand.uk-text-center
      .uk-width-4-5
        ul(uk-tab)
          li.uk-active: a(href="#") World
          li: a(href="#") Asia Pacific
          li: a(href="#") Europe
          li: a(href="#") North America
        
        .uk-tile.uk-width-expand.uk-padding-remove-top(uk-scrollspy="cls: uk-animation-fade; delay: 100; repeat: true")
          world-map.uk-margin-remove.uk-padding-remove
      
      .uk-width-1-5.uk-tile.uk-tile-default.uk-tile-secondary.uk-animation-fade.uk-box-shadow-large.fg-white.uk-text-left(uk-scrollspy="cls: uk-animation-slide-right-medium; delay: 100")
        p Some commentary about the global numbers. 
        p Aliqua fugiat ea Lorem laboris officia dolore anim proident reprehenderit reprehenderit ea. Laboris Lorem occaecat nisi reprehenderit culpa consectetur amet sint commodo laboris in. Sit consectetur eu nostrud non incididunt amet fugiat sint culpa est magna ad. Tempor Lorem adipisicing ea labore consequat nulla qui.



</template>

<script>
import worldMap from '@/components/map';

export default {
  components: { 'world-map': worldMap },
  middleware: 'test',
  data() {
    return {};
  }
};
</script>

<style lang="scss">
audio {
  // min-width: 400px;
  height: 40px;
  object-fit: inherit;
}

// To prevent a white line showing up under the navbar
.uk-sticky-placeholder {
  background-color: #232d4b;
}
</style>
