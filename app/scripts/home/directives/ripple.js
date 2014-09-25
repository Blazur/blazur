(function(){
  'use strict';
  var colorHash = {
    'primary': '#3f51b5',
    'primaryDark': '#1a237e',
    'primaryLight': '#7986cb',
    'accent': '#00e5ff',
    'white': 'white',
    'accentLight': '#18ffff'
  };

  angular.module('app.home.directives.ripple', [])
  .directive('ripple', function() {
    function rippleLinkFn(scope, element, attr, ctrl) {
      var color = colorHash[attr.ripple] || 'lightgray';
      var rippleDuration = attr.duration || 0.5;
      var tagName = element[0].tagName;
      // check here to see if the app is in mobile
      var button = element.find('button');
      // if so, don't ripple
      if (tagName === 'HEADER') {
        if (button.hasClass('menu') && button[0].offsetParent) {
          element.removeAttr('ripple');
          return;
        }
      }

      var onMouseDown = function(e) {
        var touch  = angular.element('<div></div>');
        // the controller is optianlly passed in,
        // if we have it, get the c coordinated
        // used when someone clicks a nav link
        // then a ripple is sent through header
        // get the x coordinate for nice origin animation
        if (ctrl) {
          ctrl.coords.x = e.pageX;
        }

        var size = element[0].clientWidth * 1.9;
        var complete = false;

        // register mouseup on document and not element
        // so if a user holds down the mouse on a ripple element
        // then drags the mouse away while still holding
        // the ripple will still vanish
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
          'opacity': '0.2'
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
      };

      element.on('mousedown', onMouseDown);
    }

    return {
      require: '^?drawer',
      link: rippleLinkFn
    };
  });
}());

