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
  willDestroyElement() {
    var postImages = this.get('postImages');
    for (var i = 0; i < postImages.length; i++) {
      postImages.removeAt(i);
      delete postImages[i];
    }
  },
  actions: {
    save(model) {
      if (!model.get('brand.id')) {
        swal('Informe uma marca!');
        return;
      }

      if (!model.get('priceSale')) {
        swal('Informe o preço de venda!');
        return;
      }

      let userId = this.get('session.currentUser.uid');
      this.get('store').query('user', {
        orderBy: 'uid',
        equalTo: userId
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
              vehiclePhotos.set('name', value.metadata.name);
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
    },
    delete(model) {
      swal({
          title: "Tem Certeza?",
          text: "Se você deletar esse registro, a operação não poderá ser desfeita!",
          icon: "warning",
          buttons: {
            cancel: "Não, cancelar!",
            confirm: {
              text: "Sim, confirmar!",
              value: true,
            },
          },
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            let deletions = model.get('vehiclePhotos')
              .map((photo) => {
                const storageRef = this.get('firebaseApp').storage().ref();
                let storage = storageRef.child(`/cars/${model.get('id')}/${photo.get('name')}`);
                return [storage.delete(), photo.destroyRecord()];
              });

            Ember.RSVP.all(deletions)
              .then(() => {
                return model.destroyRecord()
                  .then(() => {
                    swal('Sucesso!', 'Registro deletado com sucesso!', 'success');
                    this.sendAction('transition', 'vehicle.index');
                  })
                  .catch((err) => {
                    swal('Ops!', 'Não foi possível deletar o registro: ' + err, 'error');
                  });
              });
          }
        });
    }
  }
});
