var el = document.createElement('script');
el.src = '<%= path %>/app.js';
document.body.appendChild(el);


(function(){

  var doc = parent.document;
  var oNav = document.querySelector('.series-nav');

  // clone
  var topNav = oNav.cloneNode(true);
  topNav.classList.add('top');

  var bottomNav = oNav.cloneNode(true);
  bottomNav.classList.add('bottom');


  // inject
  var curtains = doc.querySelector('.l-side-margins #article');
  curtains.parentElement.insertBefore(topNav, curtains);

  var articleText = doc.querySelector('.content__article-body');
  articleText.appendChild(bottomNav);


  // clone css
  var style = document.querySelector('style:last-of-type');
  doc.querySelector('body').appendChild(style);

  // cleanup
  oNav.parentElement.removeChild(oNav);

})();
