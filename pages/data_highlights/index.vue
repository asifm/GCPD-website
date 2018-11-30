<template lang="pug">

.uk-section.uk-section-muted.uk-animation-slide-top-small
  .uk-container
    h3 Top Ten Companies
      img(src="https://res.cloudinary.com/asifm/image/upload/v1542499301/topten-companies-2001-2017_mfvubu.png")

  .uk-section(uk-scrollspy="cls:uk-animation-fade; delay: 100; repeat: true")
    .uk-container.uk-container-large
      .uk-grid(uk-grid).uk-padding
        .uk-width-1-3
          .uk-h2 The Rise of Asia
          video(loop controls autoplay="true" src="https://res.cloudinary.com/asifm/video/upload/v1542501578/rd-patent-scatter-1950-2016_sdtjzu.mp4")
        .uk-width-2-3(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
          img(src="https://res.cloudinary.com/asifm/image/upload/v1542499298/regiongrowth-line-1950-2017_g3qcdh.png")

  .uk-section.uk-section-secondary(uk-scrollspy="cls:uk-animation-fade; delay: 100; repeat: true")       
    .uk-container.uk-container-small
      .uk-card.uk-card-body.uk-card-default.bg-blue-100(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
        .uk-h4.uk-card-title Changing Distribution of industries
        img(src="https://res.cloudinary.com/asifm/image/upload/v1542499302/industryshare-bar-1950-2017_ymsqbq.png")
      .uk-card.uk-card-body.uk-card-default.bg-orange-100(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
        .uk-h4.uk-card-title.fg-blue Changing Distribution of Regions
        img(src="https://res.cloudinary.com/asifm/image/upload/v1542502401/regionshare-bar-1950-2017_fsv2o3.png")
      .uk-card.uk-card-body.uk-card-default.bg-blue-50(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
        .uk-h4.uk-card-title Distribution of industries by Region
        img(src="https://res.cloudinary.com/asifm/image/upload/v1542499301/industry-by-region-current_upgcu6.png")
      .uk-card.uk-card-body.uk-card-default(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
        .uk-h4.uk-card-title.fg-blue Share of Industries in Patents Awarded
        img(src="https://res.cloudinary.com/asifm/image/upload/v1542504117/industryshare-current_k0cugj.png")

</template>
