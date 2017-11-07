import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  model() {
    return Ember.RSVP.hash({
      company: this.get('store').createRecord('company'),
      user: this.get('store').createRecord('user')
    });
  },
  beforeModel() {
    return this.get('session').fetch().catch(function() {});
  },
  actions: {
    signIn(provider, model) {
      this.get('session').open('firebase', {
        provider: provider,
        email: model.user.get('email'),
        password: model.user.get('password')
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
            user.set('company', model.company);
            user.save();
          }
        });
      });
    }
  }
});
