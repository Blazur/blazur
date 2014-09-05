(function() {
  'use strict';
  // we need this for our themeing so we dont have to pass hex colors in our html
  // used in the directives reveal, ripple etc
  // var colorHash = {
  //   'primary': '#3f51b5',
  //   'primaryDark': '#1a237e',
  //   'primaryLight': '#7986cb',
  //   'accent': '#00e5ff',
  //   'white': 'white',
  //   'accentLight': '#18ffff'
  // };

  // var borderHash = {
  //   'accent': 'white',
  //   'primary': 'accent',
  //   'accentDark': 'white',
  //   'accentLight': 'primaryDark'
  // };

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
    'app.home.directives',
    'ngFx'
  ])
  .config(configBlock)
  // .directive('ripple', function() {
  //   function rippleLinkFn(scope, element, attr, ctrl) {
  //     var color = colorHash[attr.ripple] || 'lightgray';
  //     var rippleDuration = attr.duration || 0.5;
  //     var tagName = element[0].tagName;
  //     // check here to see if the app is in mobile
  //     // if so, don't ripple
  //     if (tagName === 'HEADER') {
  //       var button = element.find('button');

  //       if (button.hasClass('menu') && button[0].offsetParent) {
  //         element.removeAttr('ripple');
  //         return;
  //       }
  //     }

  //     var onMouseDown = function(e) {
  //       var touch  = angular.element('<div></div>');
  //       // the controller is optianlly passed in,
  //       // if we have it, get the c coordinated
  //       // used when someone clicks a nav link
  //       // then a ripple is sent through header
  //       // get the x coordinate for nice origin animation
  //       if (ctrl) {
  //         ctrl.coords.x = e.pageX;
  //       }

  //       var size = element[0].clientWidth * 1.9;
  //       var complete = false;

  //       // register mouseup on document and not element
  //       // so if a user holds down the mouse on a ripple element
  //       // then drags the mouse away while still holding
  //       // the ripple will still vanish
  //       angular.element(document)
  //       .on('mouseup', function() {
  //         var a = {
  //           'opacity': '0'
  //         };

  //         if (complete) {
  //           size *= 1.2;
  //           angular.extend(a, {
  //             'height': size + 'px',
  //             'width': size + 'px',
  //             'marginTop': -(size)/2 + 'px',
  //             'marginLeft': -(size)/2 + 'px',
  //             'ease': Sine.easeIn,
  //             onComplete: function(){
  //               touch.remove();
  //             }
  //           });
  //         }

  //         TweenMax.to(touch, rippleDuration, a);
  //       });
  //       var top   = e.pageY-element[0].getBoundingClientRect().top + 'px',
  //           left  = e.pageX-element[0].getBoundingClientRect().left + 'px';

  //       touch.addClass('touch');
  //       touch.css({
  //         'position': 'absolute',
  //         'top': top,
  //         'left': left,
  //         'width': '0',
  //         'height': '0',
  //         'background': color,
  //         'opacity': '0.2'
  //       });

  //       element.append(touch);
  //       TweenMax.to(touch, rippleDuration, {
  //         'height': size + 'px',
  //         'width': size + 'px',
  //         'marginTop': -(size)/2 + 'px',
  //         'marginLeft': -(size)/2 + 'px',
  //         'ease': Expo.easeOut,
  //         onComplete: function() {
  //           complete = true;
  //           // touch.remove();
  //         }
  //       });
  //     };

  //     element.on('mousedown', onMouseDown);
  //   }

  //   return {
  //     require: '^?drawer',
  //     link: rippleLinkFn
  //   };
  // })
  // .directive('reveal', function() {
  //   function revealLinkFn(scope, element, attr, ctrl) {
  //     var rippleDuration = attr.duration || 0.5;
  //     var tagName = element[0].tagName;
  //     if (tagName === 'HEADER') {
  //       var button = element.find('button');

  //       if (button[0].offsetParent) {
  //         element.removeAttr('ripple');
  //         return;
  //       }
  //     }
  //     scope.$watch('reveal', function(newVal, oldVal) {
  //       if(newVal.color === oldVal.color){
  //         return;
  //       }

  //       var color = colorHash[newVal.color || newVal] || 'lightgray';
  //       var oldColor = colorHash[oldVal.color];
  //       var touch  = angular.element('<div></div>');
  //       var size = element[0].clientWidth * 1.9;
  //       var a = {
  //         'opacity': '0'
  //       };

  //       size *= 1.2;
  //       angular.extend(a, {
  //         'height': size + 'px',
  //         'width': size + 'px',
  //         'marginTop': -(size)/2 + 'px',
  //         'marginLeft': -(size)/2 + 'px',
  //         'ease': Sine.easeIn,
  //         onComplete: function(){
  //           touch.remove();
  //         }
  //       });
  //       ctrl.coords.x = ctrl.coords.x || 123;
  //       touch.addClass('touch');
  //       touch.css({
  //         'position': 'absolute',
  //         'top': 126-element[0].getBoundingClientRect().top + 'px',
  //         'left': ctrl.coords.x-element[0].getBoundingClientRect().left + 'px',
  //         'width': '0',
  //         'height': '0',
  //         'background': color,
  //         'opacity': '0.5'
  //       });

  //       element.append(touch);
  //       var child;
  //       var ripple = new TimelineMax();
  //       ripple.to(touch, rippleDuration, {
  //         'height': size + 'px',
  //         'width': size + 'px',
  //         'marginTop': -(size)/2 + 'px',
  //         'marginLeft': -(size)/2 + 'px',
  //         'ease': Expo.easeOut
  //       })
  //       .to(touch, rippleDuration, { opacity: '0', onComplete:function(){touch.remove();} }, 0);

  //       angular.element(document.body).find('nav').css('border-top', '2px solid ' + colorHash[borderHash[newVal.color]]);
  //       child = element.children()[0];
  //       TweenMax.fromTo([element, child], rippleDuration, { backgroundColor: oldColor }, { backgroundColor: color + '!important' }, 1);
  //     }, true);
  //   }
  //   return {
  //     require: '^drawer',
  //     link: revealLinkFn
  //   };
  // })
  // .directive('drawer', [function() {
  //   function drawerLinkFn(scope, elem) {
  //     var kids = elem.children();

  //     var navdrawerContainer = angular.element(kids[1]);
  //     var body = document.body;
  //     var appbarElement = angular.element(kids[0]);
  //     var menuBtn = appbarElement.find('button');
  //     var main = angular.element(kids[2]);

  //     function closeMenu() {
  //       setTimeout(function() {
  //         body.classList.remove('open');
  //         appbarElement.removeClass('open');
  //         navdrawerContainer.removeClass('open');
  //         // navdrawerContainer.toggleClass('primary');

  //       }, 150);
  //     }

  //     function toggleMenu() {
  //       setTimeout(function() {
  //         body.classList.toggle('open');
  //         appbarElement.toggleClass('open');

  //         navdrawerContainer.toggleClass('open');
  //         navdrawerContainer.toggleClass('shadow-2-right');
  //         // navdrawerContainer.toggleClass('primary');
  //         navdrawerContainer.addClass('opened');
  //       }, 200);
  //     }

  //     main.on('click', closeMenu);
  //     menuBtn.on('click', toggleMenu);
  //     navdrawerContainer.on('click', function (event) {
  //       if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
  //         closeMenu();
  //       }
  //     });

  //     scope.$on('$destroy', function() {
  //       main.off('click');
  //       menuBtn.off('click');
  //       navdrawerContainer.off('click');
  //     });
  //   }

  //   return {
  //     controller: function($scope) {
  //       this.coords = {};
  //     },
  //     link: drawerLinkFn
  //   };
  // }])
  // .directive('paperButton', ['$timeout', '$compile', function(timeout, compile) {
  //   function paperButtonLinkFn(scope, element, attr) {
  //     var hasRipple = attr.ripple;

  //     attr.$observe('disabled', function() {
  //       if (!attr.disabled && !hasRipple) {
  //         attr.$set('ripple', 'accent');
  //       }
  //     });
  //     element.on('click', function() {
  //       element.addClass('active');
  //       timeout(function() {
  //         element.removeClass('active');
  //       }, 300);
  //     });
  //     scope.$on('$destroy', function() {
  //       element.off('click');
  //     });
  //   }

  //   return {
  //     template: '<div class="paper-button" ng-transclude></div>',
  //     transclude: true,
  //     restrict: 'EA',
  //     link: paperButtonLinkFn,
  //     replace: true
  //   };
  // }])
  // .directive('grow', ['$compile', '$templateCache',function(compile, tCache) {
  //   var colors = {
  //     'accent': 'primaryDark',
  //     'primary': 'accent',
  //     'primaryDark': 'primary'
  //   };


  //   return function(scope, element, attr) {
  //     var nvmdButton = angular.element('<div ng-click="nevermind()" paper-button class="paper-button raised" ripple="accent">back</div>');
  //     var kids = element.find('div');
  //     var buttons = _.filter(kids, function(kid) {
  //       return angular.element(kid).hasClass('paper-button');
  //     });
  //     var forms = {
  //       'signin': angular.element('<signin-form></signin-form>'),
  //       'join': angular.element('<div class="main"><div class="card card-form"><input paper-input class="paper-input"></div></div>')
  //     };
  //     var form;
  //     var createNewTimeline = function() {
  //       return new TimelineMax({
  //         onReverseComplete: function() {
  //           nvmdButton.remove();
  //           form.remove();
  //           forms = {
  //             'signin': angular.element('<signin-form></signin-form>'),
  //             'join': angular.element('<div class="main"><div class="card card-form"><input paper-input class="paper-input"></div></div>')
  //           };
  //           grow = createNewTimeline();
  //         }
  //       });
  //     };
  //     var grow = createNewTimeline();

  //     scope.$watch('grow', function(newVal, oldVal) {
  //       if (oldVal.message === newVal.message) {
  //         return;
  //       }
  //       if (newVal.message === 'go') {
  //         // make sure the color is always different
  //         var color = colors[scope.reveal.color];
  //         form = forms[scope.grow.form];
  //         nvmdButton.css('opacity', '0');
  //         nvmdButton.css('display', 'none');

  //         nvmdButton = compile(nvmdButton)(scope);
  //         form = compile(form)(scope);
  //         form.css('opacity', '0');
  //         form.css('display', 'none');
  //         var card;
  //         var inputs = _.map(form.find('div'), function(div) {
  //           var element;
  //           if (angular.element(div).hasClass('card')) {
  //             card = angular.element(div);
  //           } else {
  //             element = angular.element(div);
  //             element.css('opacity', '0');
  //             return element;
  //           }
  //         });

  //         card.css('width', '10px');
  //         card.css('height', '10px');
  //         card.css('borderRadius', '40px');

  //         element.find('section').append(nvmdButton);
  //         element.append(form);
  //         // this will trigger a reveal
  //         scope.reveal.color = color;

  //         grow.to(element, 0.8, { 'height': '600px', ease: Expo.easeInOut })
  //         .to(buttons, 0.5, { opacity: '0' }, 0)
  //         .call(function() {
  //           if (grow.reversed()) {
  //             _.forEach(buttons, function(button) {
  //               angular.element(button).css('display', 'block');
  //             });
  //             nvmdButton.css('display', 'none');
  //             form.css('display', 'none');
  //             return;
  //           }
  //           _.forEach(buttons, function(button) {
  //             angular.element(button).css('display', 'none');
  //           });
  //           nvmdButton.css('display', 'block');
  //           form.css('display', 'block');

  //         })
  //         .to(nvmdButton, 0.5, { opacity: '1' }, 1)
  //         .to(form, 0.5, { opacity: '1' }, 1)
  //         .to(card, 0.5, { width: '500px', height: '400px', borderRadius: '3px' }, 1)
  //         .to(inputs, 1.2, { opacity: '1' }, 1);
  //       }

  //       if (newVal.message === 'reset') {
  //         grow.timeScale(2)
  //         .reverse();
  //       }
  //     }, true);
  //   };
  // }])
  // .directive('paperInput', ['$templateCache', '$compile', function(tCache, compile) {
  //   function paperInputLinkFn(scope, element, attr) {
  //     scope.type = attr.type;
  //     // scope.$watchCollection('attrs', function(newVal, oldVal) {
  //     //   if (oldVal && newVal && angular.equals(newVal, oldVal)) {

  //     //   }
  //     // });
  //   }
  //   return {
  //     restrict: 'EA',
  //     template: tCache.get('paperInput.html'),
  //     replace: true,
  //     scope: {
  //       value: '=',
  //       attrs: '='
  //     },
  //     transclude: true,
  //     link: paperInputLinkFn
  //   };
  // }])
  // .directive('signinForm', ['$templateCache', 'UserFactory', function(tCache, User) {
  //   function signinFormLinkFn(scope, element, attr) {
  //     scope.form = {
  //       emailAttrs: {
  //         'ng-maxlength': '12',
  //         'ng-minlength': '5',
  //         'required': 'true'
  //       }
  //     };

  //     scope.oauth = function(provider) {
  //       console.log(provider);
  //       User.signinOauth(provider);
  //     };

  //   }
  //   return {
  //     restrict: 'EA',
  //     template: tCache.get('signinForm.html'),
  //     replace: true,
  //     scope: {},
  //     link: signinFormLinkFn
  //   };
  // }])
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
      this.$.reveal.color = 'primary';
    }
  });
}());
