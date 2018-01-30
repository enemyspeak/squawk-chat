import React, { Component } from 'react';
import { ToastContainer, toast, style } from 'react-toastify';

import Authorize from './authorize';
import RoomList from './roomlist';
import Chat from './chat';

import { logout,gotLoginPromise,setChannelsCallback,setJoinedChannelsCallback,setFriendsCallback,getChannels,getChannelData,joinChannel,setSelectedChatCallback,setSelectedChat,getFriends,lostConnectionAlert,gainedConnectionAlert,setCreateToastCallback } from './api2';

style({ // toasts style overrides.
  	width: "320px",
  	colorDefault: "#fff",
  	colorProgressDefault: "transparent",
  	mobile: "only screen and (max-width : 480px)",
  	fontFamily: "'Verlag', sans-serif",
  	zIndex: 9999,

  	TOP_RIGHT: {
    	top: 	'20px',
    	right: 	'20px'
  	},
});

class NotificationTemplate extends Component {
    render(){
	    return (
        	<div className={"toast-item " + (this.props.error ? "error" : "")}>
        		<div className="content-wrap">
        			<div className="toast-header">{this.props.header}</div>
			    	<div className="toast-content">{this.props.text}</div>
			    </div>
			    <button onClick={this.props.closeToast}>Dismiss</button>
			</div>
      	);
    }
}


function createToast(props) {
	toast(<NotificationTemplate {...props} />)
}

class Root extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
	    	selectedTab: 'messages',

	    	selectedChat: null,
	    	chatData: undefined,
	    	
	    	username: null,
	    	connected: true,
	    	loggedin: false,
	    	
	    	friendslist: [],
	    	roomslist: [],
	    	roomsjoined: [],

	    	userMenuOpen: false,
	    	userListOpen: true
	    };
		
		
	    lostConnectionAlert((err,connected) => {
	    	console.log('lost connection!');
	    	this.setState({connected: false});
	    });
	    gainedConnectionAlert((err,connected) => this.setState({connected: true}));

        this.setSelectedChat = this.setSelectedChat.bind(this);   
        this.reportSelectedChat = this.reportSelectedChat.bind(this);
	}
    
	assignCallbacks() {
	    // messages:
	    setJoinedChannelsCallback((data) => {
			console.log('new joined data',data);
			this.setState({roomsjoined: data});
	    });
	    // channels:
		setChannelsCallback((data) => {
			console.log('new channel data',data);
			this.setState({roomslist: data});
		});
	    // friends:
	    setFriendsCallback((data) => {
	    	console.log('friends data',data);
			this.setState({friendslist: data});
	    });
	    // sselected chat
	    setSelectedChatCallback((data) => {
	    	console.log('chat update',data);
	    	this.setState({chatData:data});
	    })
	    // melba toasts
	    setCreateToastCallback((props) => {
	    	// this.createToast(props);
    		toast(<NotificationTemplate {...props} />)
	    })
	}

    componentWillMount() {
	    gotLoginPromise().then((data) => {
			this.setState({
				loggedin: true,
				username: data
			});
	    });
	    this.assignCallbacks();
    }

    setSelectedTab(value) {
    	switch(value) {
    		case 'channels':
    			getChannels();
    			break;
    		// case 'friends':
    		// 	break;
    		default:
    			break;
    		
    	}
    	this.setState({selectedTab: value});
    }

    setSelectedChat(value) {
    	if (value) {
    		setSelectedChat(value); // syncs callback to updates.
    		joinChannel(value);
    		this.setState({
    			selectedChat:value,
    			chatData: getChannelData(value) // load initial data.
    		});
    	}
    }

    clearSelectedChat() {
    	this.setState({
    		selectedChat: null,
    		chatData: undefined
    	});
    	setSelectedChat(undefined);
    }

    toggleUserMenu() {
    	this.setState({userMenuOpen: !this.state.userMenuOpen});
    }

    toggleUserList() {
    	this.setState({userListOpen: !this.state.userListOpen});
    }

    reportSelectedChat() {
    	// TODO
    	console.log('ok',this.state.selectedChat);
    	// SFC
    	// << SFC { "action": "report", "report": string, "character": string }

    }

    toggleSettings() {
		// TODO
    }

    updateStatus() {
    	// TODO
    	// << STA { "status": enum, "statusmsg": string }
		// Status: Valid values are "online", "looking", "busy", "dnd", "idle", "away", and "crown".
    }

    createChannel() {
    	// << CCR { "channel": string }

    }

    logout() {
		logout();
    }

	render() {
		const chat = this.state.chatData; //getSelectedChat();
		return (
			<div className="app-wrapper">
				<Authorize visible={this.state.loggedin} />
          		
          		<div className="toasts-contain">
          			<ToastContainer 
          				autoClose={false}//{30000} 
          				newestOnTop={true} 
          				hideProgressBar={true} 
          				closeButton={false} 
          			/>
				</div>

   				<div className={"potential-problem " + (this.state.connected ? "" : "visible")}>
					<p>Disconnected from data</p>
				</div>

			    <div className="top-bar">
			        <div className="logo-contain">
			            SquawkChat
			        </div>

			        <nav className="text-buttons-contain">
			            <span onClick={() => this.setSelectedTab('messages')} className={"text-button " + (this.state.selectedTab === 'messages' ? "active" : "")}>Messages</span>
			            <span onClick={() => this.setSelectedTab('channels')} className={"text-button " + (this.state.selectedTab === 'channels' ? "active" : "")}>Channels</span>
			            <span onClick={() => this.setSelectedTab('friends')}  className={"text-button " + (this.state.selectedTab === 'friends' ? "active" : "")}>Friends</span>
			            <span onClick={() => this.setSelectedTab('search')}   className={"text-button " + (this.state.selectedTab === 'search' ? "active" : "")}>Search Users</span>
			        </nav>
			        
			        <div className="logged-in-user-contain" onClick={() => this.toggleUserMenu()}>
			            <div className="user-name">{this.state.username}</div>
			            <div className="arrow"></div>
			            <div className="avatar"></div>
			        </div>
			        <div className={"dropdown " + (this.state.userMenuOpen ? "visible" : "")}>
			        	<div className="list-item" onClick={() => this.updateStatus()}><div className="list-icon fi-pencil"></div>Set Status</div>
			        	<div className="list-item" onClick={() => this.toggleSettings()}><div className="list-icon fi-widget"></div>Settings</div>
	                    <div className="list-item" onClick={() => this.logout()}><div className="list-icon fi-lock"></div>Logout</div>
	                </div>

			        <div className="controls-contain">
			            <div className="arrow right" onClick={() => this.toggleUserList()}></div>
			        </div>
			    </div>

				<div className="app-contain">
					{/* MESSAGES */}
					<RoomList
						selectedChat={this.state.selectedChat}
						rooms={this.state.roomsjoined}
						defaultSort={'Newest First'}
						label="messages"
						activeTab={(this.state.selectedTab === 'messages' ? true : false)}
						setSelectedChat={this.setSelectedChat}
					/>
					{/* CHANNELS */}
					<RoomList
						selectedChat={this.state.selectedChat}
						rooms={this.state.roomslist}
						defaultSort={'Type'}
						label="channels"
						activeTab={(this.state.selectedTab === 'channels' ? true : false)}
						setSelectedChat={this.setSelectedChat}
					/>
					{/* FRIENDS */}
					<RoomList
						selectedChat={this.state.selectedChat}
						rooms={this.state.friendslist}
						defaultSort={'Alphabetical'}
						label="friends"
						activeTab={(this.state.selectedTab === 'friends' ? true : false)}
						setSelectedChat={this.setSelectedChat}
					/>
					
					{/* SEARCH */}
					{/* // TODO */}

					{/* CHAT */}
					<Chat 
						chat={chat}
						selectedChat={this.state.selectedChat} 
						reportSelectedChat={this.reportSelectedChat}
						clearSelectedChat={()=>this.clearSelectedChat()}
						userListOpen={this.state.userListOpen}
					/>
				</div>
			</div>
        );
	}
}

export default Root;
