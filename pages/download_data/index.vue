<script>
import DownloadIntro from '@/content/DownloadIntro.md';
import DataCitation from '@/content/DataCitation.md';

export default {
  components: { DownloadIntro, DataCitation },
};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small
  .uk-container.uk-container-small
    .uk-card.uk-card-default.uk-card-body.uk-box-shadow-small
      h2 Download the Data
      download-intro
      data-citation
      button.uk-button.uk-button-secondary Download
      hr
      div.uk-margin-large-top.uk-margin-small-left
        a(rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/")
          img(alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png")
        p This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
      
</template>
