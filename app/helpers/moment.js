import Ember from 'ember';

export function momentjs([date]/*, hash*/) {
  return moment(date).fromNow();
}

export default Ember.Helper.helper(momentjs);
