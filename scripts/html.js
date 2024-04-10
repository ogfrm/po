function changeStyle(selector, prop, val) {
    var elems = document.querySelectorAll(selector);
    Array.prototype.forEach.call( elems, function(ele) {
      ele.style[prop] = val;
    });
  }

// changeStyle('.frame', 'fill', 'red');
function addClass(selector, newClass) {
    var elems = document.querySelectorAll(selector);
    for (let i=0; i<elems.length; i++) {
      elems[i].classList.add(newClass);
    };
  }

  addClass('.frame', 'redText');

  // ssMain is the stylesheet's index based on load order. See document.styleSheets. E.g. 0=reset.css, 1=main.css.
var ssMain = 1;
var cssRules = (document.all) ? 'rules': 'cssRules';

function changeCSSStyle(selector, cssProp, cssVal) {

  for (i=0, len=document.styleSheets[ssMain][cssRules].length; i<len; i++) {

    if (document.styleSheets[ssMain][cssRules][i].selectorText === selector) {
      document.styleSheets[ssMain][cssRules][i].style[cssProp] = cssVal;
      return;
    }
  }
}
// changeCSSStyle('.redText', 'fill', 'green');
// changeCSSStyle('.warning', 'color', 'red');
// changeCSSStyle('td.special', 'fontSize', '14px');