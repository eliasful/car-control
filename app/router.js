import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home');
  this.route('vehicle', function() {
    this.route('new');
    this.route('edit', {
      path: '/:vehicle_id'
    });
  });
});

export default Router;
