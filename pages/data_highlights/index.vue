<template lang="pug">

.uk-section.uk-animation-slide-top-small
  .uk-container
    h3 Top Five Companies by Patent Count (2001–2017)
    div
      img(src="https://res.cloudinary.com/asifm/image/upload/w_400/v1544462450/region_change_qdxekx.png").uk-float-right
      p The firms in our dataset were granted close to 2 million US patents from 2001 to 2017. The patents were well distributed across countries, illustrating the global nature of innovation.

      p Non-US firms filed more than half of the USPTO patents in this period. Surpassing US firms, Japanese companies had the highest number of patents per firm. Overall, European firms filed fewer patents than North American or Asian firms, although German firms produced significant innovation.

    div
      p IBM has been consistently the top firm in recent times. Asian firms rose notably among the top ten innovators, with a strong presence in the consumer electronics sector (e.g., Samsung, Sony, Panasonic, Hon Hai). More recently, American companies have staged a comeback, particularly those in the tech sector (e.g., Intel, Alphabet, and Qualcomm). 

      p The top five companies every year during this period are here, color-coded by the region they're located in.
      img(src="@/assets/img/region_colorcodes.png")
      img(src="https://res.cloudinary.com/asifm/image/upload/v1542499301/topten-companies-2001-2017_mfvubu.png")
  
  .uk-divider-icon

  .uk-section(uk-scrollspy="cls:uk-animation-fade; delay: 100; repeat: true")
    .uk-container.uk-container-large
      .uk-grid(uk-grid).uk-padding-large.uk-grid-large.uk-grid-divider
        .uk-width-1-2
          .uk-h1 The Rise of Asia
          p The extraordinary rise of the Asian countries is seen in the animated scatter plot and the line chart here. 

          video(loop controls autoplay="true" src="https://res.cloudinary.com/asifm/video/upload/w_700/v1542501578/rd-patent-scatter-1950-2016_sdtjzu.mp4")
        
          p Until the late 1970s, it was almost exclusively US companies that filed patent applications at the USPTO. That changed around 1980 when both European and Asian companies started to seek US patent protection for their innovation. In the subsequent years, the Asian countries as a whole far surpassed Europe and challenged the prominence of North America.
          img(src="https://res.cloudinary.com/asifm/image/upload/w_900/v1542499298/regiongrowth-line-1950-2017_g3qcdh.png")
        
          .uk-tile.uk-tile-muted
            p Here is another look at the same story, but with a more striking view of the changing landscape of corporate innovation. The graph shows the three regions' share of the annual total USPTO patents since 1950.
            img(src="https://res.cloudinary.com/asifm/image/upload/w_800/v1542502401/regionshare-bar-1950-2017_fsv2o3.png")
        
        .uk-width-1-2
          .uk-card.uk-card-body.uk-card-default(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
            .uk-h4.uk-card-title Technology industry leading in innovation
            p Consistent with broader trends in business and society, innovation now more often happens in the technology-focused companies — companies with a significant technological component in their business operations and products —than in any other industry. At the time the technology industry was gaining prominence, the manufacturing industry was losing ground. This shift is not surprising since, during these decades, manufacturing businesses were increasingly taking place in the developing world.
            img(src="https://res.cloudinary.com/asifm/image/upload/v1542499302/industryshare-bar-1950-2017_ymsqbq.png")
          
            
          .uk-card.uk-card-body.uk-card-default(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
            p While this shift from manufacturing to technology is ubiquitous across the three regions,  the other industries present a mixed picture. For example, innovation is particularly strong in the wholesale and retail industry of Asia. European companies innovate more than their Asian counterparts when it comes to medical equipment, healthcare, chemicals, and mineral businesses.
            img(src="https://res.cloudinary.com/asifm/image/upload/v1542499301/industry-by-region-current_upgcu6.png")
          .uk-card.uk-card-body.uk-card-default(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
            p Taking a snapshot of the entire dataset as it stands now, the graph below summarizes the varying contribution of the twelve different industries to innovation as measured by USPTO patents.
            img(src="https://res.cloudinary.com/asifm/image/upload/v1542504117/industryshare-current_k0cugj.png")

</template>
