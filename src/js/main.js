var el = document.createElement('script');
el.src = '<%= path %>/app.js';
document.body.appendChild(el);


(function(){

  var doc = parent.document;

  // clone css
  var style = document.querySelector('style:last-of-type');
  doc.querySelector('body').appendChild(style);

  var nextPrevAwards = findNextPrev();
  if (nextPrevAwards) {

    var oNav = document.querySelector('.series-nav');

    // clone
    var topNav = cloneWithClass(oNav, 'top');
    var bottomNav = cloneWithClass(oNav, 'bottom');

    var topNav = updateContentWith(topNav, nextPrevAwards);
    var bottomNav = updateContentWith(bottomNav, nextPrevAwards);

    // inject
    var curtains = doc.querySelector('.l-side-margins #article');
    curtains.parentElement.insertBefore(topNav, curtains);

    var articleText = doc.querySelector('.content__article-body');
    articleText.appendChild(bottomNav);
  }

  // cleanup
  oNav.parentElement.removeChild(oNav);

  function updateContentWith(n, nextPrevAwards) {
    n.querySelector('.next').innerText = nextPrevAwards[1][0];
    n.querySelector('.next').setAttribute('href', nextPrevAwards[1][1][0]);
    n.querySelector('.prev').innerText = nextPrevAwards[0][0];
    n.querySelector('.prev').setAttribute('href', nextPrevAwards[0][1][0]);
    return n;
  }

  function cloneWithClass(e, c) {
    var clone = e.cloneNode(true);
    clone.classList.add(c);
    return clone;
  }

  function findNextPrev() {
    var allAwards = [
      ['Best restaurant', ['#replace/this/later', 'global/2016/nov/25/my-atom-idea']],
      ['Best cheap eats', ['#replace/this/later']],
      ['Best Sunday lunch', ['#replace/this/later']],
      ['Best ethical food project', ['#replace/this/later', '#replace/this/later/also']],
      ['Best food personality', ['#replace/this/later']],
      ['Best place to drink', ['#replace/this/later']],
      ['Best new cookbook', ['#replace/this/later']],
      ['Best independent retailer', ['#replace/this/later']],
      ['Best Instagram feed for food lovers', ['#replace/this/later']],
      ['OFM local food hero', ['#replace/this/later']],
      ['Best reader’s recipe', ['#replace/this/later']],
      ['Young chef of the year', ['#replace/this/later']],
      ['Best newcomer in food and drink', ['#replace/this/later']],
      ['Best producer', ['#replace/this/later']],
      ['Outstanding achievement', ['#replace/this/later']],
      ['Lifetime achievement', ['#replace/this/later']],
      ['Editor’s Award', ['#replace/this/later']]
    ];

    if (window.location.protocol === 'file:') {
      var pageId = parent.window.GU.opts.pageId;
    } else {
      var pageId = parent.window.guardian.config.page.pageId;
    }

    var thisAward = false;
    for (var i = 0; i < allAwards.length; i++) {
      var awardName = allAwards[i][0];
      var awardLinks = allAwards[i][1];

      for (var j = 0; j < awardLinks.length; j++) {
        var link = awardLinks[j];
        if (pageId==link) {
          var prevAward = allAwards[(i==0 ? allAwards.length-1 : i-1)]
          var nextAward = allAwards[(i==allAwards.length-1 ? 0 : i+1)]
          return [prevAward, nextAward];
        }
      }
    }

  }

  function injectBefore() {

  }
})();
