
<script>
// import components
import ExploreMap from '@/components/ExploreMap';
import CirclePack from '@/components/CirclePack';

export default {
  components: { ExploreMap, CirclePack },
  data() {
    return {
      countrySelected: '',
    };
  },
};
</script>


<template lang="pug">
  
div
  //- HERO
  
  div
    .uk-height-viewport.uk-text-center.uk-cover-container
      //- todo: uncomment the video (first?) before deploying
      //- video(uk-cover loop src="https://res.cloudinary.com/asifm/video/upload/v1540171607/news-and-business-background-video-id821841228_x6diii.mp4")
      //- video(uk-cover src="https://res.cloudinary.com/asifm/video/upload/v1540171453/beautiful-white-global-world-map-of-surface-morphing-in-seamless-3d-video-id966450342_zjutqp.mp4")
      //- video(uk-cover src="https://res.cloudinary.com/asifm/video/upload/e_loop:5/v1540171185/pan-over-vintage-sepia-colored-world-map-seamless-loopable-background-video-id936915228_vmisxi.mp4")
      //- video.uk-animation-fade(uk-cover src="http://res.cloudinary.com/asifm/video/upload/e_accelerate:-40/e_boomerang/e_loop:1/iStock-899258982_mcsfty.mp4")
    
      .uk-grid(uk-grid).uk-text-center.uk-height-viewport
        //- Title on hero
        .uk-width-4-5.uk-margin-remove.uk-position-relative.uk-position-left
          #title.uk-h1.uk-animation-fade.fg-orange.uk-heading-primary.uk-text-bold.uk-position-relative.uk-position-center.bg-blue-fade-out-4.uk-padding-large Global Corporate Patent Data 
            .uk-h4.fg-orange-lighten-2 Number of USPTO Patents Assigned Every Year to Publicly Listed Companies Worldwide
              .uk-h5.fg-orange-lighten-4 Patents Issued by the United States Patent and Trademark Office (1950–2017) 
            .uk-heading-line
              .uk-h2.fg-white 2018
        //- Text on hero
        .uk-width-1-5.uk-padding-remove.uk-animation-slide-right
          .bg-gold-fade-out-1
            .uk-text-left.fg-black.uk-position-center.uk-card-body.uk-card.bg-orange-fade-out-2
              p Something to highlight. Et aute cillum dolor duis qui sint ea consequat ipsum. Quis ullamco velit officia cupidatat. Ut consectetur ad proident elit ipsum laborum fugiat sint non velit Lorem.
              p Non laboris laborum nostrud eiusmod ipsum ipsum officia ex veniam Lorem irure duis id ullamco. Laboris amet deserunt Lorem id aliqua ullamco. Quis laboris fugiat velit deserunt aliqua quis mollit elit. Exercitation excepteur nisi deserunt aliquip cupidatat.
        //-  Ends here, above the fold
  
  .uk-section.uk-section-secondary.uk-padding(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true").uk-preserve-color
    .uk-container-expand.uk-grid.uk-grid-small.uk-grid-match
      div.uk-width-1-2
        .uk-card.uk-card-secondary.uk-card-body
          h2 What's in the Data
          p Overview. Key numbers.
          p Do culpa in occaecat duis occaecat nostrud esse ex occaecat ex deserunt minim. Anim Lorem do mollit non irure laborum non quis velit non aliquip aliqua tempor. Nostrud minim laborum velit ex dolore veniam aliquip cupidatat.
          p Commodo irure excepteur eiusmod mollit non nulla consequat excepteur incididunt duis ea officia. Consectetur consectetur proident sunt eiusmod consectetur nisi magna sit ipsum nostrud. Ut officia tempor minim in sit nulla nostrud pariatur magna. Amet anim tempor elit velit labore dolore. Cupidatat culpa laboris ea ea ex labore consequat excepteur. Duis ex anim et ex duis Lorem nisi laboris ad adipisicing consequat nulla voluptate. Exercitation id excepteur Lorem cupidatat qui in incididunt irure aliquip laboris. 
      div.uk-width-1-4
        .uk-card.uk-card-default.uk-card-body
          h3 Download the Data
          p Duis occaecat nostrud esse ex occaecat ex deserunt minim. Anim Lorem do mollit non irure laborum non quis velit non aliquip aliqua tempor. Nostrud minim laborum velit ex dolore veniam aliquip cupidatat.
          button.uk-button.uk-button-primary Download
      div.uk-width-1-4
        .uk-card.uk-card-default.uk-card-body.bg-blue-lighten-6
          h3 Interview
          audio(controls)
            source(src="https://mcdn.podbean.com/mf/download/zvy6h7/FAMILY_OWNED_BUSINESSES.mp3" type="audio/mp3")
          p To add the podcast interview. The one here is an unrelated sample. Esse commodo veniam consectetur dolore aliquip sit nostrud ad eu proident exercitation amet ad. 

  //- Map
  .uk-section.uk-text-center.uk-padding.bg-yellowgreen-lighten-7
    explore-map

  .uk-section.uk-section-muted
    div.uk-container.uk-container-large.uk-text-center
      div.uk-grid.uk-grid-small(uk-grid="masonry: true")
        div.uk-width-1-3(v-for="n, i in 10" :key="i")
          .uk-card.uk-card-body.uk-card-default.uk-card-large
            p graph/list

  .uk-section.uk-section-default
    .uk-container
      circle-pack
      
      
  .uk-section.uk-section-primary       
    .uk-container.uk-container-small
      .uk-card.uk-card-body.uk-card-default.bg-orange-lighten-3
        .uk-h4.uk-card-title Some discussion/commentary here
        .uk-column-1-2.uk-column-divider
          p Ad deserunt veniam id dolore sit reprehenderit proident. Elit labore et Lorem nisi. Nostrud eu consequat ad incididunt. Sint ea adipisicing ut mollit nostrud pariatur laboris duis nostrud.
          p Non voluptate cupidatat ex laboris dolore pariatur voluptate quis. Et in nulla nisi laboris sit aliqua minim quis ea aliqua nisi pariatur id. Nostrud amet tempor laborum Lorem sunt. Proident aliquip laboris reprehenderit ipsum. Labore elit eu veniam labore fugiat fugiat incididunt deserunt. Ut nostrud officia aliquip qui.
          p Ipsum minim deserunt quis ipsum elit aute. Ipsum nulla minim nostrud nulla nulla Lorem magna proident nostrud nostrud aliquip. Mollit sit irure deserunt consectetur sint sint velit ea. Ex laboris ullamco cupidatat magna officia magna magna occaecat commodo anim ad fugiat. Elit duis est est culpa est nostrud. Aliqua deserunt duis exercitation culpa dolor consectetur et esse ad cupidatat duis commodo tempor consequat.
  .uk-section.uk-section-secondary       
    .uk-container.uk-container-large
      .uk-card.uk-card-body.uk-card-default.bg-blue-lighten-5
        .uk-h4.uk-card-title Some more discussion/commentary here (with static graphs)
        .uk-column-1-3.uk-column-divider
          p Ad deserunt veniam id dolore sit reprehenderit proident. Elit labore et Lorem nisi. Nostrud eu consequat ad incididunt. Sint ea adipisicing ut mollit nostrud pariatur laboris duis nostrud.
          p Non voluptate cupidatat ex laboris dolore pariatur voluptate quis. Et in nulla nisi laboris sit aliqua minim quis ea aliqua nisi pariatur id. Nostrud amet tempor laborum Lorem sunt. Proident aliquip laboris reprehenderit ipsum. Labore elit eu veniam labore fugiat fugiat incididunt deserunt. Ut nostrud officia aliquip qui.
          p Ipsum minim deserunt quis ipsum elit aute. Ipsum nulla minim nostrud nulla nulla Lorem magna proident nostrud nostrud aliquip. Mollit sit irure deserunt consectetur sint sint velit ea. Ex laboris ullamco cupidatat magna officia magna magna occaecat commodo anim ad fugiat. Elit duis est est culpa est nostrud. Aliqua deserunt duis exercitation culpa dolor consectetur et esse ad cupidatat duis commodo tempor consequat.
          p Sit anim qui ex officia ad do do cillum laboris deserunt proident nisi magna. Quis consectetur ad incididunt commodo do anim labore ad et. Adipisicing reprehenderit ea commodo cupidatat consequat ad mollit commodo magna. Aliqua aliqua eiusmod elit veniam ad Lorem commodo pariatur ad dolore cupidatat id minim officia. Labore veniam nostrud laboris in deserunt ad. Fugiat aute aliqua cillum mollit. Minim est commodo culpa sunt minim in anim mollit quis minim occaecat est.
          p Ut magna aute qui eiusmod et sit proident. Aliquip incididunt occaecat incididunt sint. Occaecat veniam occaecat cupidatat eu dolore ex eu commodo Lorem consequat. Exercitation deserunt dolor laborum sunt quis ullamco anim qui consectetur. Ut consectetur cupidatat enim fugiat ea aute pariatur consectetur nisi aliquip aute irure anim adipisicing.
  .uk-section.uk-section-primary
    .uk-container.uk-container-xsmall
      p Ea enim voluptate officia ea ad velit enim in ullamco eiusmod. Anim voluptate in elit velit eu veniam. Do incididunt quis proident et consectetur veniam in esse labore ad nostrud incididunt fugiat elit. Ipsum qui exercitation irure laboris voluptate cupidatat id non exercitation non id duis sit elit.



</template>

<style lang="scss">
audio {
  // min-width: 400px;
  height: 40px;
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
