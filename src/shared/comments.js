import React, { Component } from 'react';

class Comments extends Component {

    componentDidMount() {
        window.Coral.createStreamEmbed({
            id: 'id001',
            autoRender: true,
            rootURL: process.env.REACT_APP_TALK_URL,
            storyID: this.props.storyID,
            storyURL: this.props.storyURL
        });
    }

    render() {
        return (
            <div id="id001" />
        );
    }
}

export default Comments;