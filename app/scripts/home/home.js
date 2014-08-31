(function() {
  'use strict';

  var configBlock = ['$stateProvider', function(State) {
    State
      .state('app.home', {
        abstract: true,
        controller: 'HomeController as home',
        templateUrl: 'scripts/home/home.tpl.html'
      });
  }];

  angular.module('app.home', [
    'classy',
    'app.home.landing'
  ])
  .config(configBlock)
  .directive('ripple', function() {
    var colorHash = {
      'primary': '#3f51b5',
      'primaryDark': '#1a237e',
      'primaryLight': '#7986cb',
      'accent': '#ff4081',
      'white': 'white'
    };

    function rippleLinkFn(scope, element, attr, drawerCtrl) {
      var color = colorHash[attr.ripple] || 'lightgray';
      var nowColor = element.css('background-color');
      var rippleDuration = attr.duration || 0.5;
      var tagName = element[0].tagName;
      if (tagName === 'HEADER') {
        if (element.find('button')[0].offsetParent) {
          element.removeAttr('ripple');
          return;
        }
      }

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

          TweenMax.to(touch, rippleDuration, a);
        });

        touch.addClass('touch');
        touch.css({
          'position': 'absolute',
          'top': e.pageY-element[0].getBoundingClientRect().top + 'px',
          'left': e.pageX-element[0].getBoundingClientRect().left + 'px',
          'width': '0',
          'height': '0',
          'background': color,
          'opacity': '0.5'
        });

        element.append(touch);

        TweenMax.to(touch, rippleDuration, {
          'height': size + 'px',
          'width': size + 'px',
          'margin-top': -(size)/2 + 'px',
          'margin-left': -(size)/2 + 'px',
          'ease': Expo.easeOut,
          onComplete: function() {
            complete = true;
          }
        });

        if (attr.blend) {
          var tl = new TimelineLite();
          var child = element.children()[0];
          tl.fromTo([element, child], rippleDuration, { backgroundColor: nowColor }, {backgroundColor: color + '!important' });
        }
      });
    }
    return {
      require: '^drawer',
      link: rippleLinkFn
    };
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
        setTimeout(function() {
          body.classList.remove('open');
          appbarElement.removeClass('open');
          navdrawerContainer.removeClass('open');
        }, 300);
      }

      function toggleMenu() {
        setTimeout(function() {
          body.classList.toggle('open');
          appbarElement.toggleClass('open');

          navdrawerContainer.toggleClass('open');
          navdrawerContainer.toggleClass('shadow-2-right');
          navdrawerContainer.toggleClass('primary');
          navdrawerContainer.addClass('opened');
        }, 300);
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
      link: drawerLinkFn,
      controller: function($scope) {
        this.events = {};
      }
    };
  }])
  .classy.controller({
    name: 'HomeController',

    inject: ['$scope'],

    init: function() {
      this.name = 'name';
      this.$.view = this.view = {};
      this.view.message = 'messages';
    }
  });
}());
