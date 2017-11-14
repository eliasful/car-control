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
  this.route('user', function() {
    this.route('new');
    this.route('edit');
  });
  this.route('customer', function() {
    this.route('new');
    this.route('edit', {
      path: '/:customer_id'
    });
  });
  this.route('appointment', function() {
    this.route('new');
    this.route('edit', {
      path: '/:appointment_id'
    });
  });
});

export default Router;
