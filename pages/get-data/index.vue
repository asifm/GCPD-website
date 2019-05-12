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
      download-intro
      <iframe src="https://virginia.az1.qualtrics.com/jfe/form/SV_9B2ivuARIUgDgC9" height="1000px" title="Short form before download"></iframe>
</template>
