import Ember from 'ember';

export default Ember.Route.extend({
    setupController(controller) {
        this._super(...arguments);
        controller.set('recentHash',controller.get('session').getVariable('recentHash',[]));
        // controller.get('tweetsTask').perform('#weareone');
    }
});
