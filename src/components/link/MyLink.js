import React, { Component } from "react";
import { Link } from "react-router-dom";
class MyLink extends Component {
  render() {
    if (this.props.loading) {
      return <span className={this.props.className}>{this.props.text}</span>;
    }
    return (
      <Link to={this.props.to} className={this.props.className}>
        {this.props.text}
      </Link>
    );
  }
}
export default MyLink;
