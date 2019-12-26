import React, { Component } from 'react';



class Comments extends Component {


    componentDidMount() {
        window.Coral.createStreamEmbed({
            id: 'id001',
            autoRender: true,
            rootURL: 'http://localhost:3000',
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