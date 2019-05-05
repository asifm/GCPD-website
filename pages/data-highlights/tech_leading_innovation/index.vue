<template lang="pug">
  .uk-section(uk-scrollspy="cls:uk-animation-fade; delay: 100; repeat: true").uk-padding-remove
    .uk-container.uk-container-large
      .uk-grid(uk-grid).uk-padding-large.uk-grid-large.uk-grid-divider
      
        .uk-width-2-3
          //- .uk-card.uk-card-body.uk-card-default(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
          .uk-h1 Technology industry leading in innovation
          p Consistent with broader trends in business and society, innovation now more often happens in the technology-focused companies — companies with a significant technological component in their business operations and products —than in any other industry. At the time the technology industry was gaining prominence, the manufacturing industry was losing ground. 
          img(src="https://res.cloudinary.com/asifm/image/upload/v1542499302/industryshare-bar-1950-2017_ymsqbq.png")
        
          //- .uk-card.uk-card-body.uk-card-default(uk-scrollspy="cls:uk-animation-slide-top-small; delay: 100; repeat: true")
          p While this shift from manufacturing to technology is ubiquitous across the three regions, the other industries present a mixed picture. For example, innovation is particularly strong in high-tech in Asia. But European companies innovate more than their Asian counterparts when it comes to healthcare and chemicals.
          img(src="https://res.cloudinary.com/asifm/image/upload/v1542499301/industry-by-region-current_upgcu6.png")
         
          p Taking a snapshot of the entire dataset, covering the period 1950–2016, the graph below summarizes the varying magnitude of innovation, as measured by USPTO patents, in twelve different industries.
          img(src="https://res.cloudinary.com/asifm/image/upload/v1542504117/industryshare-current_k0cugj.png")

          .uk-h5.uk-padding-top Note on industry classification
          p Firms are grouped according to the Fama-French 12 industry groups:
          ul.uk-list.uk-list-bullet
            li Consumer NonDurables: Food, Tobacco, Textiles, Apparel, Leather, Toys
            li Consumer Durables: Cars, TV's, Furniture, Household Appliances
            li Manufacturing: Machinery, Trucks, Planes, Chemicals, Office Furniture, Paper, Com Printing
            li Energy: Oil, Gas, and Coal Extraction and Products
            li High Tech (originally named "Business Equipment"): Computers, Software, and Electronic Equipment
            li Telecom: Telephone and Television Transmission
            li Shops: Wholesale, Retail, and Some Services (Laundries, Repair Shops)
            li Healthcare: Healthcare, Medical Equipment, and Drugs
            li Utilities
            li Other: Mines, Constr, BldMt, Trans, Hotels, Bus Serv, Entertainment, Finance
</template>
