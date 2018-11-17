<script>
export default {
  data() {
    return {
      publications: [
        {
          title:
            'Are foreign investors locusts? The long-term effects of foreign institutional ownership',
          authors: 'Jan Bena, Miguel A Ferreira, Pedro Matos, Pedro Pires',
          date: 'October 2017',
          publication: 'Journal of Financial Economics',
          intro:
            'This paper challenges the view that foreign investors lead firms to adopt a short-term orientation and forgo long-term investment. Using a comprehensive sample of publicly listed firms in 30 countries over the period 2001–2010, we find instead that greater foreign institutional ownership fosters long-term investment in tangible, intangible, and human capital. Foreign institutional ownership also leads to significant increases in innovation output.',
          imgSrc:
            'https://ars.els-cdn.com/content/image/1-s2.0-S0304405X17X0010X-cov150h.gif',
          downloadLink: '',
          readMoreLink:
            'https://www.sciencedirect.com/science/article/pii/S0304405X17301526',
        },
        {
          title:
            'Testing “the Locust Hypothesis”: the Impact of Global Investors on Long-term Investment and Innovation',
          authors: 'Pedro Matos, Jan Bena, Miguel A Ferreira, Pedro Pires',
          date: 'November 2018',
          publication: 'UVA Darden Research Briefings',
          intro:
            'As the world economy has become increasingly globalized and complex, it’s not obvious what effects foreign investors—say, Chinese investors in an American company or American investors in a British company—have on the companies whose stock they hold. Is it possible that these foreign investors provide pools of capital that firms can access in order to produce stronger companies, which make better products and services? Do these investors from afar monitor firms—for example, keeping managers from becoming too entrenched or engaging in value-destroying activities? Or does the opposite hold true, and do global institutional investors behave more like a swarm of locusts, resulting in short-term corporate policymaking?',
          imgSrc:
            'https://res.cloudinary.com/asifm/image/upload/h_250/v1541443135/locust-briefing-cover_lwu3n2.png',
          downloadLink: '../assets/documents/UVA-Darden-Research-Briefing.pdf',
          readMoreLink: '',
        },
      ],
    };
  },
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
            .uk-card-header
              h5.fg-blue {{ pub.title }}
              .uk-text-bold.uk-margin-remove-top <span class="fg-orange">{{ pub.date }}</span> <br> <span class="fg-blue">{{ pub.publication }}</span> 
              p {{ pub.authors }}
              button.uk-button.uk-button-default.uk-float-left.uk-margin(v-if="pub.downloadLink")
                a(:href="pub.downloadLink" download) Download

              button.uk-button.uk-button-default.uk-float-left.uk-margin(v-if="pub.readMoreLink")
                a(:href="pub.readMoreLink" ) Read More

              img.uk-box-shadow-large(:src="pub.imgSrc")
              p.uk-text-small.fg-blue {{ pub.intro }}
       
</template>
