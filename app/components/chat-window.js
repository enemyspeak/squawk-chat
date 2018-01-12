import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['chat-window'],
 	chat: {
		title: 'Cool Coolname',
		subtitle: 'Online: Yo, just got home wow this is a long status',
		private: true,
		messages: [
			{
				from: 'Cool Coolname',
				timestamp: '11:45 pm',
				message: 'This doesnt seem to work..'
			},
			{
				from: 'Cool Coolname',
				timestamp: '11:45 pm',
				message: 'Oh. Weird. Nevermind.'
			},
			{
				from: 'Cool Coolname',
				timestamp: '11:45 pm',
				message: 'Cool'
			},
			{
				from: 'I sent this one',
				timestamp: '11:45 pm',
				mine: true,
				message: 'Hello'
			},
			{
				from: 'Cool Coolname',
				timestamp: '11:45 pm',
				message: 'Yep'
			},
		]
    },
  	classNameBindings: ['showWidgetMenu:showWidgetMenu'],
  	showWidgetMenu: false,
	defaultWidgetClosed: Ember.on('init', function(){
	    //http://emberjs.com/api/classes/Ember.Object.html#method_set
    	this.set("showWidgetMenu", false);
  	}),
  	actions: {
		widgetClicked: function(){
			this.set('showWidgetMenu',!this.get('showWidgetMenu'));
		}
	}
});