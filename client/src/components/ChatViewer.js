import React, { Component } from "react";
import "./ChatViewer.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  getMessages,
  receiveMessage,
  addUserToActive,
  removeUserFromActive,
  getActiveUsers,
} from "../actions/messageAction";
import io from "socket.io-client";

export class ChatViewer extends Component {
  state = {
    userMessage: "",
  };

  chatBottomRef = React.createRef();

  componentDidMount() {
    if (!this.props.user || !this.props.room) {
      return;
    }

    this.props.getActiveUsers(this.props.room);

    this.socket = io("http://localhost:4000");
    this.socket = this.setupSocket(this.socket);

    this.props.getMessages(this.props.room, 10);
  }

  componentDidUpdate() {
    this.chatBottomRef.current.scrollIntoView();
  }

  setupSocket(socket) {
    this.socket.emit("joinRoom", {
      username: this.props.user,
      room: this.props.room,
    });

    this.socket.on("message", (message) => {
      this.props.receiveMessage(message);
    });

    this.socket.on("userJoined", (user) => {
      this.props.addUserToActive(user);
    });

    this.socket.on("userLeft", (user) => {
      this.props.removeUserFromActive(user);
    });

    return socket;
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.userMessage) {
      return;
    }

    this.socket.emit("chatMessage", this.state.userMessage);
    this.setState({ userMessage: "" });
  };

  render() {
    if (!this.props.user || !this.props.room) {
      return <Redirect to="/" />;
    }
    return (
      <div className="chatviewer">
        <h1>{this.props.room}</h1>
        <script>console.log("Hello")</script>
        <small>{`You are logged as ${this.props.user}`}</small>
        <span className="activeUsersInfo">
          Active users: {this.props.activeUsers.join(" | ")}
        </span>
        <ul>
          {this.props.messages.map((msg, idx) => (
            <li key={idx}>
              {msg.user}: {msg.msg}
            </li>
          ))}
          <li ref={this.chatBottomRef} />
        </ul>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.userMessage}
            name="userMessage"
            onChange={this.onChange}
          />
          <input type="submit" text="Send" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages.messages,
  user: state.user.user,
  room: state.user.room,
  activeUsers: state.messages.activeUsers,
});

export default connect(mapStateToProps, {
  getMessages,
  receiveMessage,
  getActiveUsers,
  addUserToActive,
  removeUserFromActive,
})(ChatViewer);
