<script>
export default {
  data() {
    return {
      members: [
        {
          name: 'Pedro Matos',
          title:
            'John G. Macfarlane Family Chair and Professor of Business Administration, and Academic Director of the Richard A. Mayo Center for Asset Management',
          institute: 'UVA Darden School of Business',
          email: 'matosp@darden.virginia.edu'
        },
        {
          name: 'Jan Bena',
          title:
            'Associate Professor, University of British Columbia Sauder School of Business, and Batten Research Fellow, UVA Darden School of Business',
          email: 'Jan.bena@sauder.ubc.ca'
        },
        {
          name: 'Miguel A. Ferreira',
          title: 'Banco BPI Professor of Finance',
          institute: 'Nova School of Business and Economics',
          email: 'miguel.ferreira@novasbe.pt'
        }
      ]
    };
  }
};
</script>

<template lang="pug">
div
  .uk-section.uk-section-muted
    .uk-container.uk-width-1-2.uk-padding-large.uk-animation-fade.uk-card.uk-card-default.uk-card-body
      h1 The Research Team
      p.uk-text-danger This is a placeholder. Names and sequence will be finalized later.
      dl(v-for="(member, i) in members" :key="i").uk-width-3-5.uk-description-list
        dt {{ member.name }}
        dd {{ member.title }}
        dd {{ member.institute}}
        dd
          a(:href="`mailto:${member.email}`") {{ member.email }}

  .uk-section.uk-section-default.bg-blue-lighten-7
    .uk-container.uk-width-3-4

      h2 Batten Institute for Entrepreneurship and Innovation 
      h4.fg-blue.uk-margin-remove-top Darden School of Business, University of Virginia
      p Officia dolor esse do officia nostrud adipisicing magna cupidatat commodo amet. Id ad qui minim exercitation et nulla ipsum nostrud irure adipisicing eiusmod reprehenderit. Lorem mollit tempor est commodo aliqua magna ex in magna sint labore amet reprehenderit exercitation.
      p Dolore aute cupidatat labore magna nostrud cillum ex aute incididunt minim nostrud cillum velit. Do incididunt deserunt ad proident ullamco ex do aliqua proident ad proident culpa est. Est dolor duis consectetur incididunt id eu quis nostrud minim in. Non ut cillum id voluptate. Pariatur cillum irure ex dolor nisi sunt et officia dolore Lorem duis dolor.
      
</template>
