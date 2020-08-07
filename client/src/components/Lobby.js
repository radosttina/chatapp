import React, { Component } from "react";
import "./Lobby.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setUserName, setRoom } from "../actions/configAction";

export class Lobby extends Component {
  state = {
    user: "",
    room: "",
    chatConfigured: false,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.setUserName(this.state.user);
    this.props.setRoom(this.state.room);

    if (this.state.user && this.state.room) {
      this.setState({ chatConfigured: true });
      document.title = this.state.room
    }
  };

  render() {
    if (this.state.chatConfigured) {
      return <Redirect to="/chat" />;
    }

    return (
      <div>
        <form className="loginForm" onSubmit={this.onSubmit}>
          <label htmlFor="user">User</label>
          <input
            type="text"
            value={this.state.user}
            name="user"
            onChange={this.onChange}
          />
          <label htmlFor="room">Room</label>
          <input
            type="text"
            value={this.state.room}
            name="room"
            onChange={this.onChange}
          />
          <input type="submit" text="Send" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  room: state.user.room,
});

export default connect(mapStateToProps, { setUserName, setRoom })(Lobby);
