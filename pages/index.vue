
<script>
// ::import components
// ::import content
import DataIntro from '@/content/DataIntro.md';
import MethodSummary from '@/content/MethodSummary.md';

export default {
  components: {
    DataIntro,
    MethodSummary,
  },
};
</script>

<template lang="pug">
 
div
  //- HERO
  
  div
    //- .uk-height-viewport.uk-text-center.uk-cover-container
      //- todo: uncomment the video (first?) before deploying
      video(uk-cover loop src="https://res.cloudinary.com/asifm/video/upload/v1540171607/news-and-business-background-video-id821841228_x6diii.mp4")
      //- video(uk-cover src="https://res.cloudinary.com/asifm/video/upload/v1540171453/beautiful-white-global-world-map-of-surface-morphing-in-seamless-3d-video-id966450342_zjutqp.mp4")
      //- video.uk-animation-fade(uk-cover src="http://res.cloudinary.com/asifm/video/upload/e_accelerate:-40/e_boomerang/e_loop:1/iStock-899258982_mcsfty.mp4")
    
      .uk-grid(uk-grid).uk-text-center.uk-height-viewport
        //- Title on hero
        .uk-width-1-1.uk-margin-remove.uk-position-relative.uk-position-left
          #title.uk-h1.uk-animation-fade.bg-blue-fade-out-6.fg-orange-900.uk-padding-large.uk-heading-primary.uk-position-relative.uk-position-center Global Corporate Patent Data
            .uk-h3.fg-white.uk-margin-remove-bottom.uk-margin-medium-top The Number of Patents Assigned Every Year <br> by the United States Patent and Trademark Office <br> to Publicly Listed Companies Worldwide since 1950
            
            .uk-heading-line
              .uk-h2.fg-orange-200 2018
        //::-  Ends here, above the fold
  
  .uk-section
    .uk-container.uk-container-large.uk-box-shadow-large.uk-background-muted
      .uk-grid(uk-grid).uk-grid-match
        div.uk-width-1-2
          .uk-card.uk-card-body
            h1#title.fg-orange-700 <span class="my-text-thin">The New</span><br>Global Corporate Patent Dataset
            div.my-text-medium
              div(class="uk-column-1-2@m")
                img(src="https://res.cloudinary.com/asifm/image/upload/w_80/v1543120861/i-bulb-dollar_y7bhwn.png").uk-float-right
                data-intro
        
        div.uk-width-1-2
          div.uk-margin-xlarge-top
            .uk-card.uk-card-body.bg-orange-100
              .uk-h4.uk-card-title.fg-blue How We Compiled the Data
              div(class="uk-column-1-2@m")
                method-summary
          
            .uk-card.uk-card-body.bg-blue-50
              h4 Interview
              p <strong>Pedro Matos</strong>, professor at the University of Virginia Darden School of Business, and <strong>Jan Bena</strong>, professor at the University of British Colombia Sauder School of Business, sat down with the Batten Institute's <strong>Erika Herz</strong> to talk about this dataset.
              p They described aspects of the data and explained how this resource can benefit scholars who seek to understand corporate innovation outcomes.
              audio(controls).uk-margin-remove
                source(src="https://mcdn.podbean.com/mf/play/fn5pmd/CORPORATE_RESEARCH_DEVELOPMENT_OUTCOMES_PT_2.mp3")
      
</template>

<style lang="scss">
audio {
  max-width: 450px;
  object-fit: inherit;
}

#title {
  font-size: 3em;
  font-weight: 900;
  text-transform: none;
}

// To prevent a white line showing up under the navbar
.uk-sticky-placeholder {
  background-color: #232d4b;
}
</style>
