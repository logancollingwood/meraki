import React from "react";
import Chat from "./Chat";
import DjContainer from "./DjContainer.js";
import Api from "../components/Api.js";
import Guilds from "../components/Guilds.js";

class ChatRoomManager extends React.Component {

	constructor(props) {
		super(props);
		this.socket = this.props.socket;
		console.log(this.props);
		this.state = {
			loading: true,
			room: null,
			user: null,
		}
	}

	
	async requestUser() {
		let user = await Api.getUser();
		this.setState({user: user});
	}
	
	componentDidMount() {
		console.log(`going to search for room with id: ${this.props.id}`);
		Api.getRoomById(this.props.id)
			.then(room => {
				if (room == null) return;
				this.setState({loading: false, room: room});
			}).catch(error => console.error);
		this.requestUser();
	}


    render() {
		const guildsToRender = this.state.user ? this.state.user.guilds : null;
        return (
			<div className="container-fluid">
				<div className="row justify-content-center main-content">
					<div className="col-md-2 no-padding left-half">
						<Guilds loading={this.state.loading} guilds={guildsToRender} currentRoom={this.state.room}/>
					</div>
					<div className="col-md-7 no-padding left-half">
						<DjContainer loading={this.state.loading} room={this.state.room} socket={this.socket}/>
					</div>
					<div className="col-md-3 no-padding">
						<Chat loading={this.state.loading} socket={this.socket} room={this.state.room}/>
					</div>
				</div>
			</div>
        );
    }
}

export default ChatRoomManager;