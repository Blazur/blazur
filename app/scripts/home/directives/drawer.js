(function(){
  'use strict';

  angular.module('app.home.directives.drawer', [])
  .directive('drawer', [function() {
    function drawerLinkFn(scope, elem) {
      var kids = elem.children();

      var navdrawerContainer = angular.element(kids[1]);
      var body = document.body;
      var appbarElement = angular.element(kids[0]);
      var menuBtn = appbarElement.find('button')[0];
      menuBtn = angular.element(menuBtn);

      var main = angular.element(kids[2]);

      function closeMenu() {
        setTimeout(function() {
          body.classList.remove('open');
          appbarElement.removeClass('open');
          navdrawerContainer.removeClass('open');
          // navdrawerContainer.toggleClass('primary');

        }, 150);
      }

      function toggleMenu() {
        setTimeout(function() {
          body.classList.toggle('open');
          appbarElement.toggleClass('open');

          navdrawerContainer.toggleClass('open');
          navdrawerContainer.toggleClass('shadow-2-right');
          // navdrawerContainer.toggleClass('primary');
          navdrawerContainer.addClass('opened');
        }, 200);
      }

      main.on('click', closeMenu);
      menuBtn.on('click', toggleMenu);
      navdrawerContainer.on('click', function (event) {
        if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
          closeMenu();
        }
      });

      scope.$on('$destroy', function() {
        main.off('click');
        menuBtn.off('click');
        navdrawerContainer.off('click');
      });
    }

    return {
      controller: function($scope) {
        this.coords = {};
      },
      link: drawerLinkFn
    };
  }]);
}());
