import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  firebaseApp: Ember.inject.service(),
  postImages: Ember.A([]),
  didInsertElement() {
    this.model.get('vehiclePhotos').forEach(photo => {
      this.get('store')
        .findRecord('vehiclePhoto', photo.get('id'))
        .then(data => {
          this.postImages.pushObject({
            preview: data.get('photoUrl')
          });
        });
    })
  },
  actions: {
    save(model) {
      let userId = this.get('session.currentUser.uid');
      this.get('store').query('user', {
        orderBy: 'uid',
        equalsTo: userId
      }).then((users) => {
        let user = users.get('firstObject');
        model.set('company', user.get('company'));

        let images = [];
        const storageRef = this.get('firebaseApp').storage().ref();
        this.get('postImages').forEach((data) => {
          if (data.form) {
            let storage = storageRef.child(`/cars/${model.get('id')}/${data.form.name}`);
            let image = storage.put(data.form);
            images.pushObject(image);
          }
        });

        Promise.all(images)
          .then((values) => {
            let photos = [];
            values.forEach(value => {
              let vehiclePhotos = this.get('store').createRecord('vehicle-photo');
              vehiclePhotos.set('vehicle', model);
              vehiclePhotos.set('photoUrl', value.downloadURL);
              photos.pushObject(vehiclePhotos.save());
            });

            Promise.all(photos)
              .then(value => {
                model.save().then(() => {
                  swal('Sucesso', 'Registro salvo com sucesso!', 'success');
                  this.sendAction('transition', 'vehicle.index');
                });
              });
          });
      });
    }
  }
});
