(function() {
  'use strict';

  var configBlock = ['$stateProvider', function(State) {
    State
      .state('app.home', {
        url: '/',
        controller: 'HomeController as home',
        templateUrl: 'scripts/home/home.tpl.html'
      });
  }];

  angular.module('app.home', [
    'classy'
  ])
  .config(configBlock)
  .directive('ripple', function() {
    function rippleLinkFn(scope, element) {
      element.on('mousedown', function(e) {
        var touch  = angular.element('<div></div>');

        var size = element[0].clientWidth * 1.9;
        var complete = false;

        angular.element(document)
        .on('mouseup', function() {
          var a = {
            'opacity': '0'
          };

          if (complete) {
            size *= 1.2;
            angular.extend(a, {
              'height': size + 'px',
              'width': size + 'px',
              'marginTop': -(size)/2 + 'px',
              'marginLeft': -(size)/2 + 'px',
              'ease': Sine.easeIn,
              onComplete: function(){
                touch.remove();
              }
            });
          }

          TweenMax.to(touch, .5, a);
        });

        touch.addClass('touch');
        touch.css({
          'position': 'absolute',
          'top': e.pageY-element[0].getBoundingClientRect().top + 'px',
          'left': e.pageX-element[0].getBoundingClientRect().left + 'px',
          'width': '0',
          'height': '0'
        });

        element.append(touch);

        TweenMax.to(touch, .5, {
          'height': size + 'px',
          'width': size + 'px',
          'margin-top': -(size)/2 + 'px',
          'margin-left': -(size)/2 + 'px',
          'ease': Quart.easeOut,
          onComplete: function() {
            complete = true;
          }
        });
      });
    }
    return rippleLinkFn;
  })
  .directive('drawer', [function() {
    function drawerLinkFn(scope, elem) {
      var kids = elem.children();

      var navdrawerContainer = angular.element(kids[1]);
      var body = document.body;
      var appbarElement = angular.element(kids[0]);
      var menuBtn = appbarElement.find('button');
      var main = angular.element(kids[2]);

      function closeMenu() {
        body.classList.remove('open');
        appbarElement.removeClass('open');
        navdrawerContainer.removeClass('open');
      }

      function toggleMenu() {
        body.classList.toggle('open');
        appbarElement.toggleClass('open');
        navdrawerContainer.toggleClass('open');
        navdrawerContainer.addClass('opened');
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

    return drawerLinkFn;
  }])
  .classy.controller({
    name: 'HomeController',

    inject: ['$scope'],

    init: function() {
      this.name = 'name';
    }
  });
}());
