import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  filter: {
    name: null,
    brand: null,
    priceStart: null,
    priceEnd: null,
    isName: true,
    isBrand: true,
    isPrices: true
  },
  model() {
    let userId = this.get('session.currentUser.uid');
    return this.get('store').query('user', {
      orderBy: 'uid',
      equalTo: userId
    }).then((users) => {
      let user = users.get('firstObject');
      return this.get('store').query('vehicle', {
        orderBy: 'company',
        equalTo: user.get('company.id')
      });
    });
  },
  setupController(controller, model) {
    controller.set('model', model);
    controller.set('filter', this.get('filter'));
  }
});
