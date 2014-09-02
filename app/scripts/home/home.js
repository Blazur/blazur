(function() {
  'use strict';
  var colorHash = {
    'primary': '#3f51b5',
    'primaryDark': '#1a237e',
    'primaryLight': '#7986cb',
    'accent': '#ff4081',
    'white': 'white',
    'accentLight': '#ff4081'
  };

  var borderHash = {
    'accent': 'white',
    'primary': '#ff4081',
    'accentDark': 'white',
    'accentLight': '#ff4081'
  };

  var configBlock = ['$stateProvider', function(State) {
    State
      .state('app.home', {
        abstract: true,
        controller: 'HomeController',
        templateUrl: 'scripts/home/home.tpl.html'
      });
  }];

  angular.module('app.home', [
    'classy',
    'app.home.landing',
    'app.home.how',
    'app.home.faq',
    'ngFx'
  ])
  .config(configBlock)
  .directive('ripple', function() {
    var colorHash = {
      'primary': '#3f51b5',
      'primaryDark': '#1a237e',
      'primaryLight': '#7986cb',
      'accent': '#ff4081',
      'white': 'white',
      'accentDark': '#ff4081'
    };

    function rippleLinkFn(scope, element, attr, ctrl) {
      var color = colorHash[attr.ripple] || 'lightgray';
      var rippleDuration = attr.duration || 0.5;
      var tagName = element[0].tagName;

      if (tagName === 'HEADER') {
        var button = element.find('button');

        if (button[0].offsetParent) {
          element.removeAttr('ripple');
          return;
        }
      }

      element.on('mousedown', function(e) {
        var touch  = angular.element('<div></div>');
        if (ctrl) {
          ctrl.coords.x = e.pageX;
        }

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
        var top   = e.pageY-element[0].getBoundingClientRect().top + 'px',
            left  = e.pageX-element[0].getBoundingClientRect().left + 'px';

        touch.addClass('touch');
        touch.css({
          'position': 'absolute',
          'top': top,
          'left': left,
          'width': '0',
          'height': '0',
          'background': color,
          'opacity': '0.5'
        });

        element.append(touch);
        TweenMax.to(touch, rippleDuration, {
          'height': size + 'px',
          'width': size + 'px',
          'marginTop': -(size)/2 + 'px',
          'marginLeft': -(size)/2 + 'px',
          'ease': Expo.easeOut,
          onComplete: function() {
            complete = true;
            // touch.remove();
          }
        });


      });
    }

    return {
      require: '^?drawer',
      link: rippleLinkFn
    };
  })
  .directive('reveal', function() {
    function revealLinkFn(scope, element, attr, ctrl) {
      var rippleDuration = attr.duration || 0.5;
      var tagName = element[0].tagName;
      if (tagName === 'HEADER') {
        var button = element.find('button');

        if (button[0].offsetParent) {
          element.removeAttr('ripple');
          return;
        }
      }
      scope.$watch('reveal', function(newVal, oldVal) {
        if(newVal.color === oldVal.color){
          return;
        }

        var color = colorHash[newVal.color || newVal] || 'lightgray';
        var oldColor = colorHash[oldVal.color];
        var touch  = angular.element('<div></div>');
        var size = element[0].clientWidth * 1.9;
        var a = {
          'opacity': '0'
        };

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
        ctrl.coords.x = ctrl.coords.x || 123;
        touch.addClass('touch');
        touch.css({
          'position': 'absolute',
          'top': 126-element[0].getBoundingClientRect().top + 'px',
          'left': ctrl.coords.x-element[0].getBoundingClientRect().left + 'px',
          'width': '0',
          'height': '0',
          'background': color,
          'opacity': '0.5'
        });

        element.append(touch);
        var child;
        var ripple = new TimelineMax();
        ripple.to(touch, rippleDuration, {
          'height': size + 'px',
          'width': size + 'px',
          'marginTop': -(size)/2 + 'px',
          'marginLeft': -(size)/2 + 'px',
          'ease': Expo.easeOut
        })
        .to(touch, rippleDuration, { opacity: '0', onComplete:function(){touch.remove();} }, 0);

        angular.element(document.body).find('nav').css('border-top', '2px solid ' + borderHash[newVal.color]);
        child = element.children()[0];
        TweenMax.fromTo([element, child], rippleDuration, { backgroundColor: oldColor }, { backgroundColor: color + '!important' }, 1);
      }, true);
    }
    return {
      require: '^drawer',
      link: revealLinkFn
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
  }])
  .directive('paperButton', ['$timeout', function(timeout) {
    function paperButtonLinkFn(scope, element) {
      element.on('click', function() {
        element.addClass('active');
        timeout(function() {
          element.removeClass('active');
        }, 300);
      });
      scope.$on('$destroy', function() {
        element.off('click');
      });
    }

    return paperButtonLinkFn;
  }])
  .directive('grow', ['$compile', function(compile) {
    var colors = {
      'accent': 'primary',
      'primary': 'primaryDark',
      'primaryDark': 'accent'
    };


    return function(scope, element, attr) {
      var nvmdButton = angular.element('<div ng-click="nevermind()" paper-button class="paper-button raised canvas" ripple="accent">back</div>');
      var kids = element.find('div');
      var buttons = _.filter(kids, function(kid) {
        return angular.element(kid).hasClass('paper-button');
      });
      var forms = {
        'signin': angular.element('<div class="main"><div class="card card-form"><paper-input></paper-input></div></div>'),
        'join': angular.element('<div class="main"><div class="card card-form"><input paper-input class="paper-input"></div></div>')
      };
      var form;
      var createNewTimeline = function() {
        return new TimelineMax({
          onReverseComplete: function() {
            nvmdButton.remove();
            form.remove();
            grow = createNewTimeline();
          }
        });
      };
      var grow = createNewTimeline();

      scope.$watch('grow', function(newVal, oldVal) {
        if (oldVal.message === newVal.message) {
          return;
        }
        if (newVal.message === 'go') {
          // make sure the color is always different
          var color = colors[scope.reveal.color];
          form = forms[scope.grow.form];
          nvmdButton.css('opacity', '0');
          nvmdButton.css('display', 'none');
          form.css('opacity', '0');
          form.css('display', 'none');

          nvmdButton = compile(nvmdButton)(scope);
          form = compile(form)(scope);

          element.find('section').append(nvmdButton);
          element.append(form);
          // this will trigger a reveal
          scope.reveal.color = color;

          grow.to(element, 0.8, { 'height': '600px', ease: Expo.easeInOut })
          .to(buttons, 0.5, { opacity: '0' }, 0)
          .call(function() {
            if (grow.reversed()) {
              _.forEach(buttons, function(button) {
                angular.element(button).css('display', 'block');
              });
              nvmdButton.css('display', 'none');
              form.css('display', 'none');
              return;
            }
            _.forEach(buttons, function(button) {
              angular.element(button).css('display', 'none');
            });
            nvmdButton.css('display', 'block');
            form.css('display', 'block');

          })
          .to([form,nvmdButton], 0.5, { opacity: '1' }, 1);
        }

        if (newVal.message === 'reset') {
          grow.timeScale(2)
          .reverse();
        }
      }, true);
    };
  }])
  .directive('paperInput', function() {
    function paperInputLinkFn(scope, element, attr) {

    }
    return {
      restrict: 'EA',
      template:
        '<div class="group">'+
        '<input type="text">'+
        '<span class="highlight"></span>'+
        '<span class="bar"></span>'+
        '<label>{{ grow.form }}</label>'+
        '</div>',
      replace: true,
      link: paperInputLinkFn
    };
  })
  .classy.controller({
    name: 'HomeController',

    inject: ['$scope'],

    init: function() {
      this.$.reveal = { color: 'primary' };
      this.$.coords = {};
      this.$.grow = { message: 'no'};
    },

    nevermind: function(){
      this.$.grow.message = 'reset';
    }
  });
}());
