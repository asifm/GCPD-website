<script>
export default {
  data() {
    return {
      publications: [
        {
          title:
            'Testing “the Locust Hypothesis”: the Impact of Global Investors on Long-term Investment and Innovation',
          intro:
            'As the world economy has become increasingly globalized and complex, it’s not obvious what effects foreign investors—say, Chinese investors in an American company or American investors in a British company—have on the companies whose stock they hold. Is it possible that these foreign investors provide pools of capital that firms can access in order to produce stronger companies, which make better products and services? Do these investors from afar monitor firms—for example, keeping managers from becoming too entrenched or engaging in value-destroying activities? Or does the opposite hold true, and do global institutional investors behave more like a swarm of locusts, resulting in short-term corporate policymaking?',
          imgSrc:
            'https://res.cloudinary.com/asifm/image/upload/h_400/v1541443135/locust-briefing-cover_lwu3n2.png',
          downloadLink: '../assets/documents/UVA-Darden-Research-Briefing.pdf',
          readMoreLink: ''
        },
        {
          title:
            'Do laborum pariatur incididunt ut. Ullamco ea laborum nulla reprehenderit.',
          intro:
            'Deserunt ipsum esse elit Lorem velit aliquip elit tempor aliquip qui minim eu dolore sint. Labore laborum magna esse aliqua laborum esse minim proident magna. Do nostrud in aliquip amet veniam sint cillum enim ea.',
          imgSrc:
            'https://res.cloudinary.com/asifm/image/upload/h_400/v1541443135/locust-briefing-cover_lwu3n2.png',
          downloadLink: '../assets/documents/UVA-Darden-Research-Briefing.pdf',
          readMoreLink: ''
        }
      ]
    };
  }
};
</script>
1


<template lang="pug">
  .uk-section.uk-section-muted
    .uk-container.uk-container-expand.uk-animation-fade
      h1 Research and Publications
      p The new Global Corporate Patent Data are used or referenced in the following publications.
      .uk-grid.uk-grid(uk-grid).uk-width-1-1
        div(class="uk-width-1-3@m uk-width-1-2@s" v-for="(pub, i) in publications" :key="i")
          .uk-card.uk-card-body.uk-card-default
            //- (:class="i%2 ? 'uk-card-primary' : 'uk-card-secondary'")
            h5.fg-orange-darken-2 {{ pub.title }}
            h6.uk-margin-remove-top.uk-margin-medium-bottom November 2018
          
            button.uk-button.uk-button-default.uk-float-left.uk-margin
              a(:href="pub.downloadLink" download) Download
          
            a(href="pub.downloadLink" download)
              img.uk-box-shadow-large(:src="pub.imgSrc")
            p {{ pub.intro }}
       
</template>
