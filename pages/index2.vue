<template lang="pug">
// SAMPLE CODE
    
// codepen editor mode - open the HTML tab in full width + only one extra line of CSS (not in uikit) on this example
#top.uk-offcanvas-content
  // remember to close the offcanvas-content wrapper
  // desktop sticky navbar
  .uk-position-top
    nav.uk-navbar-container.uk-navbar-transparent(uk-navbar='dropbar: false;', data-uk-sticky='show-on-up: true; animation: uk-animation-slide-top; sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky uk-section-primary uk-light; bottom: #scrollup-dropdown')
      .uk-navbar-left.uk-light
        a.uk-navbar-item.uk-logo(href='#') Logo-desktop
        // show ul on desktop-tablet with uk-visible@m = Only affects device widths of 960px and larger
        ul.uk-navbar-nav(class='uk-visible@m')
          li.uk-active
            a(href='#') Active
          li
            a(href='#')
              span(data-uk-icon='icon: triangle-down; ratio: 0.7')
            .uk-navbar-dropdown
              ul.uk-nav.uk-navbar-dropdown-nav(class='uk-visible@m')
                li.uk-active
                  a(href='#') Active Child
                li
                  a(href='#') Child 
                li
                  a(href='#') Child
          li
            a(href='#') Item
      // toogle icon visible only on phones
      .uk-navbar-right
        // off-canvas btn show only on mobile
        a.uk-navbar-toggle(class='uk-hidden@m', href='#', uk-toggle='target: #offcanvas-nav-primary')
          span(uk-navbar-toggle-icon='')
            span.uk-margin-small-left Menu
  // OFF CANVAS
  nav#offcanvas-nav-primary(uk-offcanvas='overlay: true; mode: push; flip: true')
    // offcanvas setting
    .uk-offcanvas-bar.uk-flex.uk-flex-column
      // navbar content her
      // A - logo
      a.uk-align-left.uk-logo(href='#') Logo - offcanvas
      // B - nav
      ul.uk-nav-default.uk-nav-parent-icon(uk-nav='')
        li.uk-active
          a(href='#') Active - offcanvas
        li.uk-parent
          a(href='#') Parent - offcanvas
          ul.uk-nav-sub
            li
              a(href='#') Child one - offcanvas
            li
              a(href='#') Child two - offcanvas
        li
          a(href='#') ITEM - offcanvas
      // contact us
      .uk-margin-large-top
        hr
        span(uk-icon='icon: phone')
          a.uk-link-text(href='#') +972 3434 3435
  header#hero-header
    section.uk-section-secondary
      // change her the bg image + The overlay color/opacity/direction (under style)
      #change-her-the-bg-image.uk-background-norepeat.uk-background-cover.uk-background-center-center.uk-section.uk-section-large.uk-flex.uk-flex-middle(class='uk-background-image@s', uk-parallax='bgx: 0,-60', uk-height='', viewport='offset-top: false', style="background: linear-gradient(to right, rgba(30, 75, 115, 0.9), rgba(255, 255, 255, 0)), url('https://picsum.photos/1900/506');")
        .uk-width-1-1(style='')
          // hero container
          .uk-container.uk-container-large
            // Heading: Add margin top for h1 - like this the text looks more center v beacuse the navbar is transpernt
            h1.uk-margin-small.uk-margin-medium-top.uk-text-center.uk-h6.uk-heading-line(class='uk-width-large@m uk-text-left@m', uk-parallax='opacity: 1,0;viewport: 0.95;media: @s')
              // extra span for uk-heading-line
              span UiKit Navbar &amp; Hero With OffCanvas
            h2.uk-margin-small.uk-text-center.uk-heading-hero(class='uk-text-left@m', uk-parallax='y: 0,60;opacity: 1,0;easing: 0.8;viewport: 0.95;media: @s')
            // Arrow: With link to #main section + uk-scroll="" for smooth scrolling
            .uk-margin.uk-text-center(class='uk-text-left@m', uk-parallax='y: 0,450;opacity: 1,0;easing: 0.3;target: !.uk-section;media: @s')
              a.uk-icon-link.uk-icon(uk-icon='icon: arrow-down;ratio: 1.5', href='#main', uk-scroll='')
  br
  // Demo docs content
  main#main.uk-container.uk-container-large.uk-margin-top
    #message
      button.uk-button.uk-margin.uk-button-danger.uk-margin-small-right(type='button', uk-toggle='target: #offcanvas-nav-primary') Open-Off-Canvas Menu
      br
      br
      .uk-card.uk-card-default.uk-card-body
        h1.uk-text-medium UIkit 3 offCanvas navbar example
        p
        p
          ul.uk-list.uk-list-bullet
            li
              a(target='_blank', href='https://getuikit.com/docs/navbar') UIkit 3 navbar docs
            li
              a(target='_blank', href='https://getuikit.com/docs/offcanvas') UIkit 3 offcanvas docs
            li
              a(target='_blank', href='https://getuikit.com/docs/nav') UIkit 3 nav docs (For the menu inside the offCanvas)
            li
              span(uk-icon='icon: youtube')
                a(target='_blank', href=' https://www.youtube.com/watch?v=MfdMfobt3l4')
      br
      a.uk-icon-link.uk-icon(uk-icon='icon: arrow-up;ratio: 1.5', href='#top', uk-scroll='') Back to top
  br
  br
  br
  br
  br
  br
  br
  br
  br
  br
  br
  br
  br
  br
  br
  br
  br
  br
  br
  br
  br
  br
  br
  br
  


</template>
