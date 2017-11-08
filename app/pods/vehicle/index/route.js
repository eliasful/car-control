import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  model() {
    let userId = this.get('session.currentUser.uid');
    return this.get('store').query('user', {
      orderBy: 'uid',
      equalsTo: userId
    }).then((users) => {
      let user = users.get('firstObject');
      return this.get('store').query('vehicle', {
        orderBy: 'company',
        equalsTo: user.get('company')
      });
    });
  }
});
