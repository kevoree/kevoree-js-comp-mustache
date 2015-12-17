var AbstractComponent = require('kevoree-entities').AbstractComponent;
var Mustache = require('mustache');

/**
 * Kevoree component
 * @type {Mustache}
 */
var MustacheComp = AbstractComponent.extend({
    toString: 'Mustache',

    dic_template: { optional: false },

    /**
     * this method will be called by the Kevoree platform when your component has to start
     * @param {Function} done
     */
    start: function (done) {
        done();
    },

    /**
     * this method will be called by the Kevoree platform when your component has to stop
     * @param {Function} done
     */
    stop: function (done) {
        done();
    },

    in_in: function (msg) {
        try {
            msg = JSON.parse(msg);
            try {
                var output = Mustache.render(this.dictionary.getString('template'), msg);
                this.out_out(output);
            } catch (err) {
                this.log.error(this.toString(), err.message);
            }
        } catch (err) {
            this.log.error(this.toString(), 'Unable to parse input message as a JSON object');
        }
    },

    out_out: function (msg) {},

    uiController: function () {
        return ['$scope', '$sce', 'instance', function ($scope, $sce, instance) {
            $scope.template = $sce.trustAsHtml(instance.dictionary.getString('template'));
        }];
    }
});

module.exports = MustacheComp;
