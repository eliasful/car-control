import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  beforeModel() {
    return this.get('session').fetch().catch(function() {});
  },
  actions: {
    signIn(provider) {
      this.get('session').open('firebase', {
        provider: provider
      }).then((data) => {
        this.get('store').query('user', {
          orderBy: 'uid',
          equalTo: data.uid
        }).then((users) => {
          //Se não existir nenhum usuário com esse id
          //cadastra um novo
          if (!users.get('length')) {
            let user = this.get('store').createRecord('user');
            user.set('uid', data.uid);
            user.set('name', data.currentUser.displayName);
            user.set('email', data.currentUser.email);
            user.set('photoUrl', data.currentUser.photoURL);
            user.save();
          }
        });
      });
    }
  }
});
