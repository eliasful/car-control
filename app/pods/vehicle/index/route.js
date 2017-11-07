import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model() {
    return this.get('store').findAll('vehicle');
    // let itens = [];
    // for (var i = 0; i < 10; i++) {
    //   let item = {
    //     year: '2003',
    //     model: '2003',
    //     name: 'Polo',
    //     brand: 'VW',
    //     price: 'R$ 16.000,00',
    //     fuel: 'Gasolina'
    //   }
    //   itens.pushObject(item);
    // }
    // return itens;
  }
});
