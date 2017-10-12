var el = document.createElement('script');
el.src = '<%= path %>/app.js';
document.body.appendChild(el);

console.log('this is new 16:12');


(function(){


  var doc = parent.document;
  var win = parent.window;

  // clone css
  var style = document.querySelector('style:last-of-type');
  if (style) {
    doc.querySelector('body').appendChild(style);
  }

  var nextPrevAwards = findNextPrev();
  if (nextPrevAwards) {

    console.log(document);
    console.log(document.querySelectorAll('body'));

    var oNav = document.querySelector('.series-nav');

    // clone
    var topNavDesktop = cloneWithClass(oNav, 'top');
    var topNavMobile = cloneWithClass(oNav, 'top');
    var bottomNav = cloneWithClass(oNav, 'bottom');

    var topNavDesktop = updateContentWith(topNavDesktop, nextPrevAwards);
    var topNavMobile = updateContentWith(topNavMobile, nextPrevAwards);
    var bottomNav = updateContentWith(bottomNav, nextPrevAwards);

    // inject
    var desktopHeader = doc.querySelector('#article .hide-on-mobile header .tonal__standfirst');
    if (desktopHeader) {
      desktopHeader.appendChild(topNavDesktop);
    }

    var mobileHeader = doc.querySelector('.mobile-only header .tonal__standfirst, .article .article__header');
    if (mobileHeader) {
      mobileHeader.appendChild(topNavMobile);
    }


    var articleText = doc.querySelector('.content__article-body, .article__body > div');
    if (articleText) {
      articleText.appendChild(bottomNav);
    }
  }

  // cleanup
  oNav.parentElement.removeChild(oNav);

  function updateContentWith(n, nextPrevAwards) {

    var p = (isApp() ? 'x-gu://item/mobile.guardianapis.com/uk/items/' : '/');
    // var p = (isApp() ? 'x-gu://item/mobile-preview.guardianapis.com/uk/items/' : '/');

    n.querySelector('.next').innerText = nextPrevAwards[1][0];
    n.querySelector('.next').setAttribute('href', p+nextPrevAwards[1][1][0]);
    n.querySelector('.prev').innerText = nextPrevAwards[0][0];
    n.querySelector('.prev').setAttribute('href', p+nextPrevAwards[0][1][0]);
    return n;
  }

  function cloneWithClass(e, c) {
    var clone = e.cloneNode(true);
    clone.classList.add(c);
    return clone;
  }

  function isApp() {
    return (parent.window.location.protocol === 'file:')
  }

  function findNextPrev() {
    var allAwards = [
      ['Best restaurant', ['lifeandstyle/2017/oct/15/ofm-awards-2017-best-restaurant-pidgin-east-london', 'lifeandstyle/2017/oct/15/ofm-awards-2017-best-restaurant-runners-up']],
      ['Best cheap eats', ['lifeandstyle/2017/oct/15/ofm-awards-2017-best-cheap-eats-yard-sale-pizza-london', 'lifeandstyle/2017/oct/15/ofm-awards-2017-best-cheap-eats-runners-up']],
      ['Best Sunday lunch', ['lifeandstyle/2017/oct/15/ofm-awards-2017-best-sunday-lunch-a-rule-of-tum-bookshop-hereford', 'lifeandstyle/2017/oct/15/ofm-awards-2017-best-sunday-lunch-the-runners-up']],
      ['Best ethical food project', ['lifeandstyle/2017/oct/15/cook-for-syria-ofm-awards-2017-best-ethical-project', 'lifeandstyle/2017/oct/15/ofm-awards-2017-best-ethical-project-runners-up']],
      ['Best food personality', ['lifeandstyle/2017/oct/15/ofm-awards-2017-best-food-personality-rick-stein']],
      ['Best place to drink', ['lifeandstyle/2017/oct/15/2017-best-place-to-drink-crown-hastings-ofm-awards', 'lifeandstyle/2017/oct/15/ofm-awards-2017-best-places-to-drink-runners-up-bars-pubs-cocktails']],
      ['Best new cookbook', ['lifeandstyle/2017/oct/15/ofm-awards-2017-best-new-cookbook-fresh-india-meera-sodha']],
      ['Best independent retailer', ['lifeandstyle/2017/oct/15/ofm-awards-2017-best-independent-retailer-rafis-spicebox', 'lifeandstyle/2017/oct/15/ofm-awards-2017-best-independent-retailer-the-runners-up']],
      // ['Best Instagram feed for food lovers', ['lifeandstyle/gallery/2017/oct/15/ofm-awards-2017-best-instagram-feed-for-food-lovers-jamie-oliver']],
      ['Local food hero', ['lifeandstyle/2017/oct/15/ofm-awards-2017-local-food-hero-pop-up-soup-kitchen-trevor-blaney']],
      ['Best reader’s recipe', ['lifeandstyle/2017/oct/15/ofm-awards-2017-best-readers-recipe-maryam-sham-bakhlava-traybake']],
      ['Young chef of the year', ['lifeandstyle/2017/oct/15/ofm-awards-2017-young-chef-of-the-year-tom-adams']],
      ['Best newcomer', ['lifeandstyle/2017/oct/15/ofm-awards-2017-best-newcomer-temper-soho']],
      ['Best producer', ['lifeandstyle/2017/oct/15/ofm-awards-2017-best-producer-bisous-bisous']],
      ['Outstanding achievement', ['lifeandstyle/2017/oct/15/ofm-awards-2017-outstanding-achievement-trussell-trust-food-banks']],
      ['Lifetime achievement', ['lifeandstyle/2017/oct/15/ofm-awards-2017-lifetime-achievement-joyce-molyneux']],
      ['Editor’s Award', ['lifeandstyle/2017/oct/15/ofm-awards-2017-editors-award-aa-gill']]
    ];

    var pageId = (isApp() ? win.GU.opts.pageId : win.guardian.config.page.pageId)

    var thisAward = false;
    for (var i = 0; i < allAwards.length; i++) {
      var awardName = allAwards[i][0];
      var awardLinks = allAwards[i][1];

      for (var j = 0; j < awardLinks.length; j++) {
        var link = awardLinks[j];
        if (pageId===link) {
          var prevAward = allAwards[(i==0 ? allAwards.length-1 : i-1)]
          var nextAward = allAwards[(i==allAwards.length-1 ? 0 : i+1)]
          return [prevAward, nextAward];
        }
      }
    }

  }

})();
