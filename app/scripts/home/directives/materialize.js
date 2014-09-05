(function() {
  'use strict';

  angular.module('app.home.directives.materialize', [])
  .directive('materialize', ['$compile', '$templateCache',function(compile, tCache) {
    var colors = {
      'accent': 'primaryDark',
      'primary': 'accent',
      'primaryDark': 'primary'
    };


    return function(scope, element, attr) {
      // create the back button
      var nvmdButton = angular.element('<div ng-click="nevermind()" paper-button class="paper-button raised" ripple="accent">back</div>');
      var kids = element.find('div');
      var buttons = _.filter(kids, function(kid) {
        return angular.element(kid).hasClass('paper-button');
      });
      var forms = {
        'signin': angular.element('<signin-form></signin-form>'),
        'join': angular.element('<div class="main"><div class="card card-form"><input paper-input class="paper-input"></div></div>')
      };
      var form;

      // our animation timeline. We have to reset it and create
      // a new one everytime. Cleans up all uneeded elemens on page
      // we have to redefine forms again because <signin-form/> usues
      // transclusion and we'll get an orphan error becuase it was already
      // compiled
      var createNewTimeline = function() {
        return new TimelineMax({
          onReverseComplete: function() {
            nvmdButton.remove();
            form.remove();
            forms = {
              'signin': angular.element('<signin-form></signin-form>'),
              'join': angular.element('<div class="main"><div class="card card-form"><input paper-input class="paper-input"></div></div>')
            };
            grow = createNewTimeline();
          }
        });
      };
      var grow = createNewTimeline();

      // listen to know when to start the slide and form animation
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

          // compile and set the initial css for elements
          nvmdButton = compile(nvmdButton)(scope);
          form = compile(form)(scope);

          /**
           * @card:
                - the actual form card
             @inputs:
                - the paper inputs on the card form
           */
          var card;
          var inputs = _.map(form.find('div'), function(div) {
            var element;
            if (angular.element(div).hasClass('card')) {
              card = angular.element(div); // here is our card
            } else {
              element = angular.element(div);
              element.css('opacity', '0');
              return element;
            }
          });

          // set the initial widths and heights to be small to animate bigger
          card.css('width', '10px');
          card.css('height', '10px');
          card.css('borderRadius', '50%');

          // attach the back button and the form
          element.find('section').append(nvmdButton);
          element.append(form);

          // this will trigger a reveal animation
          // the reveal directive listens for reveal.color and takes that
          // color and goes with it
          scope.reveal.color = color;

          grow.to(element, 0.8, { 'height': '600px', ease: Strong.easeInOut })
          .to(buttons, 0.5, { opacity: '0' }, 0)
          .call(function() {
            if (grow.reversed()) {
              _.forEach(buttons, function(button) {
                angular.element(button).css('display', 'block');
              });
              nvmdButton.css('display', 'none');
              return;
            }
            _.forEach(buttons, function(button) {
              angular.element(button).css('display', 'none');
            });
            nvmdButton.css('display', 'block');
          })
          .to(nvmdButton, 0.5, { opacity: '1' }, 1)
          .to(card, 0.8, { width: '500px', height: '400px', borderRadius: '3px', ease: Strong.easeInOut }, 0)
          .to(inputs, 0.3, { opacity: '1' }, 1);
        }

        if (newVal.message === 'reset') {
          // reverse the animation at 1.5 speed
          grow.timeScale(1.5)
          .reverse();
        }
      }, true);
    };
  }]);
}());
