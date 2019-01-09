<script>
import MethodSummary from '@/content/MethodSummary.md';
export default {
  components: {
    MethodSummary,
  },
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small.uk-padding-small.uk-background-muted.uk-margin-small-bottom
  .uk-container.uk-container-large
    .uk-grid(uk-grid)
      .uk-width-1-2
        .uk-card.uk-card-body
          h1#title.fg-orange-700 <span class="my-text-thin">UVA Darden</span><br>Global Corporate Patent Dataset
          div.my-text-medium
            div(class="uk-column-1-2@m")
              img(src="https://res.cloudinary.com/asifm/image/upload/w_80/v1543120861/i-bulb-dollar_y7bhwn.png").uk-float-right
              p.uk-dropcap.uk-text-large.uk-column-span Corporate innovation plays a crucial role in pushing the frontier of technology — and technology's progress helps advance economic prosperity. By tracking corporate innovation, we can learn much about where and how new ideas, knowledge, products, and techniques are emerging.
              p The dataset that we have made available on this website provides a window into the world of corporate patents—an important indicator of corporate research and development activities and the consequent innovation—across industries and countries.
              p The public release of this dataset reflects our belief that it would open up new research possibilities and enable the discovery of insights in different areas of finance and economics. We also expect this data to help advance public discussions, outside of academia, on corporate innovation, productivity, and performance.
              //- p This project was made possible with the financial support from the <em>Batten Institute for Entrepreneurship and Innovation</em> and the <em>Richard A. Mayo Center for Asset Management</em> at the UVA Darden School of Business.
              nuxt-link(to="/interactive")
                img.uk-overlay-primary.uk-border-circle.uk-box-shadow-medium.uk-margin-medium-top(src="https://res.cloudinary.com/asifm/image/upload/w_500/v1543798822/worldmap_static_j4peu3.png" @click="loading = !loading")
              p.uk-text-small [Click on the map to see a larger, interactive version. It may take a few seconds to load all data.]
              div(v-if="loading" uk-spinner="ratio:5").uk-position-center.uk-position-absolute
      
      div.uk-width-1-2
        div.uk-margin-xlarge-top.uk-padding
          .uk-card.uk-card-body.bg-orange-100.uk-margin
            .uk-h4.uk-card-title.fg-blue How We Compiled the Data
            div(class="uk-column-1-2@m")
              method-summary
        
          .uk-card.uk-card-body.bg-blue-50
            h4 Interview
            p <strong>Pedro Matos</strong>, professor at the University of Virginia Darden School of Business, and <strong>Jan Bena</strong>, professor at the University of British Columbia Sauder School of Business, sat down with the Batten Institute's <strong>Erika Herz</strong> to talk about this dataset.
            p They described important aspects of the data and explained how this resource can benefit scholars who seek to understand corporate innovation outcomes.
            audio(controls).uk-margin-remove
              source(src="https://mcdn.podbean.com/mf/play/fn5pmd/CORPORATE_RESEARCH_DEVELOPMENT_OUTCOMES_PT_2.mp3")

</template>

<style lang="scss" scoped>
audio {
  max-width: 450px;
  object-fit: inherit;
}

#title {
  font-size: 3em;
  font-weight: 900;
  text-transform: none;
}
</style>
