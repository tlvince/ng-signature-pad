/**!
 * AngularJS SignaturePad directive
 * @author Javier Martínez <ecentinela@gmail.com>
 * @version 0.1.0
 */

/* global angular */

(function () {
  'use strict';

  angular.module('ngSignaturePad', []).directive(
    'ngSignaturePad',
    [
      '$window',
      '$timeout',
      function ($window, $timeout) {
        return {
          scope: {
            ngSignaturePad: '='
          },
          link: function ($scope, $element, $attrs) {
            $timeout(function () {
              if ($attrs.ngSignaturePadBefore) {
                $scope.$parent.$apply(function (self) {
                  self[$attrs.ngSignaturePadBefore]($element, $attrs);
                });
              }

              $scope.ngSignaturePad = new $window.SignaturePad($element[0], {
                dotSize: $attrs.ngSignaturePadDotSize,
                minWidth: $attrs.ngSignaturePadMinWidth,
                maxWidth: $attrs.ngSignaturePadMaxWidth,
                backgroundColor: $attrs.ngSignaturePadBackgroundColor,
                penColor: $attrs.ngSignaturePadPenColor,
                velocityFilterWeight: $attrs.ngSignaturePadVelocityFilterWeight,
                onBegin: $attrs.ngSignaturePadOnBegin,
                onEnd: $attrs.ngSignaturePadOnEnd
              });

              var oldAddPoint = $scope.ngSignaturePad._addPoint;

              $scope.ngSignaturePad._addPoint = function (point) {
                oldAddPoint.call(this, point);

                $scope.$apply();
              };

              if ($attrs.ngSignaturePadAfter) {
                $scope.$parent.$apply(function (self) {
                  self[$attrs.ngSignaturePadAfter]($element, $attrs, $scope.ngSignaturePad);
                });
              }
            });
          }
        };
      }
    ]
  );

})();
