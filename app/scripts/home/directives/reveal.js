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

  var borderHash = {
    'accent': 'white',
    'primary': 'accent',
    'accentDark': 'white',
    'accentLight': 'primaryDark'
  };

  angular.module('app.home.directives.reveal', [])
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

        angular.element(document.body).find('nav').css('border-top', '2px solid ' + colorHash[borderHash[newVal.color]]);
        child = element.children()[0];
        TweenMax.fromTo([element, child], rippleDuration, { backgroundColor: oldColor }, { backgroundColor: color + '!important' }, 1);
      }, true);
    }
    return {
      require: '^drawer',
      link: revealLinkFn
    };
  });
}());
