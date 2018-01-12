import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['user-list-contain'],
  sortType: 'Newest First',
  //  go to api
  model: [
    {
      name: 'Cool Coolname',
      relativeTime: '11:45 pm',
      status: 0,
      userStatus: "Offline",
      statusMessage: null,
      friend: true,
      snippet: 'Hey dude Hope you are fine lorem ipsum Dolor sit amet, consectetur adipiscing elit, sed do magnaet ifsa nidsian kgskhg idshgi ingskngls klngds'
    },
    {
      name: 'Cool Coolname',
      relativeTime: '11:45 pm',
      status: 1,
      userStatus: "Online",
      statusMessage: 'Yo, just got home wow this is a long status',
      friend: false,
      bookmark: true,
      selected: true,
      snippet: 'Hey dude Hope you are fine lorem ipsum Dolor sit amet, consectetur adipiscing elit, sed do magnaet ifsa nidsian kgskhg idshgi ingskngls klngds'
    },
    {
      name: 'Cool Coolname',
      relativeTime: '11:45 pm',
      status: 2,
      userStatus: "Busy",
      statusMessage: null,
      friend: false,
      snippet: 'Hey dude Hope you are fine lorem ipsum Dolor sit amet, consectetur adipiscing elit, sed do magnaet ifsa nidsian kgskhg idshgi ingskngls klngds'
    }
  ],
});
