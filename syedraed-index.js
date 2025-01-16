document.addEventListener('DOMContentLoaded', () => {
    const emblaNode = document.querySelector('.embla')
    const viewportNode = emblaNode.querySelector('.embla__viewport')
    const OPTIONS = { axis: 'y', loop: true, align: 'start', active: true, breakpoints: {'(max-width: 991px)' : {active: false}}}
    const plugins = [EmblaCarouselAutoScroll({ stopOnMouseEnter: true, stopOnInteraction: false, speed: 1 })]
    const slideHeight = document.querySelector('.embla__slide').offsetHeight
    
    if (window.matchMedia('screen and (min-width: 991px)').matches) {
      emblaNode.style.height = 2*slideHeight + 10 + 'px' //fixed height for embla wrapper
    }

    let t1 = anime.timeline({
      easing: 'easeInOutSine',
      duration: 750,
      complete: function (anim) {
        const emblaApi = EmblaCarousel(viewportNode, OPTIONS, plugins)
      }
    })
    
    t1.add({
      targets: '.work_title',
      opacity: [0, 1],
      duration: 100
    })
    .add({
      targets: '.svg-work path',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 2000,
      delay: function(el, i) { return i * 250 },
    })
    .add({
      targets: '.svg-work',
      fill: ['#FFF', '#000']
    })
  
  
    const workCards = document.querySelectorAll('.work_card-wrap')
    const defaultAnimeOptions = { duration: 200, easing: 'linear'}
    workCards.forEach(card => {
      anime.set(card.querySelector('.work_card-title'), { opacity: 0, scale: 1.05})
      anime.set(card.querySelector('.work_card-external'), { opacity: 0, translateY: -10 })
      const card_title = card.querySelector('.work_card-title')
      const card_image = card.querySelector('.work_card-image')
      const card_arrow = card.querySelector('.work_card-external')
      card.addEventListener('mouseenter', () => {
        anime({ targets: card_title, opacity: 1, scale: 1, ...defaultAnimeOptions })
        anime({ targets: card_image, scale: 1.05, ...defaultAnimeOptions })
        anime({ targets: card_arrow, opacity: 1, translateY: 0, ...defaultAnimeOptions })
      })
      card.addEventListener('mouseleave', () => {
        anime({ targets: card_title, opacity: 0, scale: 1.05, ...defaultAnimeOptions })
        anime({ targets: card_image, scale: 1, ...defaultAnimeOptions })
        anime({ targets: card_arrow, opacity: 0, translateY: -10, ...defaultAnimeOptions })
      })
    })
  })
  
  let cnv, lineCols, rows, cols, followerX, followerY;
  let size = 120;
  let spacing = 8;
  let cornerRadius = 60
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  
  function setup() {
    lineCols = windowWidth / 150;
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('#pfiveparent')
  
    cols = width / size
    rows = height / size
    followerX = width / 2
    followerY = height / 2
  }
  
  function draw() {
    background(255)
    noStroke()
    fill(0)
  
    followerX = lerp(followerX, mouseX, 0.05)
    followerY = lerp(followerY, mouseY, 0.05)
  
    drawGradientCircle(followerX, followerY, 180)
  
    for (let i=0; i<cols; i++) {
      for (let j=0; j<rows; j++) {
        fill("#FFF")
        rect(i*(size + spacing), j*(size + spacing), size, size, cornerRadius)
      }
    }
  
    stroke("#f1f1f1")
    for (let k=0; k<lineCols; k++) {
      line(k*150, 0, k*150, windowHeight)
    }
  }
  
  function drawGradientCircle(x, y, radius) {
    let c1 = color(245)
    let c2 = color(255)
  
    for (let r=radius; r > 0; r--) {
      let inter = map(r, 0, radius, 0, 1)
      let c = lerpColor(c1, c2, inter)
      fill(c)
      ellipse(x, y, r*2, r*2)
    }
  }