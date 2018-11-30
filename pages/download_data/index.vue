<script>
import DownloadIntro from '@/content/DownloadIntro.md';
import DataCitation from '@/content/DataCitation.md';

export default {};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small
  .uk-width-1-4
    .uk-card.uk-card-default.uk-card-body.uk-box-shadow-small
      .uk-card
        h4 Download the Data
        download-intro
        button.uk-button.uk-button-secondary Download
      
    div.uk-background-muted.uk-padding
      data-citation
</template>
