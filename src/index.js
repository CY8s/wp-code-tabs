/**
 * Polyfill forEach on NodeList prototype
 */

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

(function () {
  "use strict";

  var activateCodeTab = function (el) {
      var currentTab = 0,
        buttons,
        panels,
        setCurrentTab = function (index) {
          currentTab = index;
          render();
        },
        cacheDOM = function () {
          buttons = el.querySelectorAll(".code-tabs__button");
          panels = el.querySelectorAll(".code-tabs__panel");
        },
        bindListeners = function () {
          buttons.forEach(function (button, index) {
            button.addEventListener("click", function (e) {
              e.preventDefault();
              setCurrentTab(index);
            });
          });
        },
        renderButtons = function () {
          panels.forEach(function (panel, index) {
            if (index === currentTab) {
              panel.classList.add("is-active");
            } else {
              panel.classList.remove("is-active");
            }
          });
        },
        renderPanels = function () {
          buttons.forEach(function (button, index) {
            if (index === currentTab) {
              button.classList.add("is-active");
            } else {
              button.classList.remove("is-active");
            }
          });
        },
        render = function () {
          renderButtons();
          renderPanels();
        };

      cacheDOM();
      bindListeners();
      render();
    },
    init = function () {
      var targets = document.querySelectorAll(".code-tabs");

      if (!targets || !targets.length) {
        return;
      }

      targets.forEach(function (el) {
        activateCodeTab(el);
      });
    };

  window.addEventListener("DOMContentLoaded", init);
})();

/**
 * Activate SyntaxHighligher
 */
SyntaxHighlighter.defaults.toolbar = false;
SyntaxHighlighter.all();
