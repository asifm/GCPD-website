<script>
export default {
  data() {
    return {
      members: [
        {
          name: 'Pedro Matos',
          title:
            'John G. Macfarlane Family Chair and Professor of Business Administration <br> Academic Director of the Richard A. Mayo Center for Asset Management',
          institute: 'UVA Darden School of Business',
          email: 'matosp@darden.virginia.edu',
        },
        {
          name: 'Jan Bena',
          title:
            'Associate Professor, University of British Columbia Sauder School of Business <br> Batten Research Fellow, UVA Darden School of Business',
          email: 'Jan.bena@sauder.ubc.ca',
        },
        {
          name: 'Miguel A. Ferreira',
          title: 'Banco BPI Professor of Finance',
          institute: 'Nova School of Business and Economics',
          email: 'miguel.ferreira@novasbe.pt',
        },
      ],
    };
  },
};
</script>

<template lang="pug">
.uk-section.bg-blue-fade-out-9.uk-animation-slide-top-small
  .uk-container
    .uk-width-3-4.uk-padding-large.uk-card.uk-card-default.uk-card-body.uk-align-center
      h1 The Project Team
      p This new corporate patent dataset is the result of a multi-year collaboration among the following academic scholars. The Batten Institute for Entrepreneurship and Innovation at the UVA Darden School provided institutional support to this collaboration.
      p If you have any questions, suggestions, or comments, please contact Professor Jan Bena at <a href="mailto:Jan.bena@sauder.ubc.ca">Jan.bena@sauder.ubc.ca</a>
      dl(v-for="(member, i) in members" :key="i").uk-width-1-1.uk-description-list
        dt.my-text-heavy {{ member.name }}
        dd(v-html="member.title")
        dd {{ member.institute }}
        dd
          a(:href="`mailto:${member.email}`") {{ member.email }}

    .uk-card.uk-card-body.uk-card-default.bg-orange-200.uk-padding-large#batten
      .uk-column-1-2

        h3.my-text-heavy.fg-blue-700 Batten Institute for Entrepreneurship and Innovation 
        p The Batten Institute for Entrepreneurship and Innovation improves the world by creating knowledge about the transformative power of entrepreneurship and innovation and by cultivating principled, entrepreneurial leaders. The Institute's research initiative advances knowledge that addresses real-world challenges and shapes Darden's curriculum, and its educational offerings are ranked top 10 in the world. The Batten Institute was established by the vision and philanthropy of UVA alumnus Frank Batten Sr. 
          a.uk-button.uk-button-text(href="http://www.darden.virginia.edu/batten-institute/") Learn more
      
        h3.my-text-heavy.fg-blue-700 Richard A. Mayo Center for Asset Management
        p The Richard A. Mayo Center for Asset Management advances the study and practice of asset management through top-quality research, regular conferences and activities, support for the students of Darden Capital Management (DCM) and the development of educational programs. 
          a.uk-button.uk-button-text(href="https://www.darden.virginia.edu/mayo-center/") Learn more

      img(src="https://res.cloudinary.com/asifm/image/upload/w_650/v1543189024/darden-saunders-front_c1zvxm.jpg").uk-align-center
      .uk-text-center.uk-margin-remove.uk-text-small.uk-lightbox-caption Darden School of Business at the University of Virginia
      
</template>
