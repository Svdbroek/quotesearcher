import React, { Component } from 'react';

class Quote extends Component {
    render() {
        return (
            <div>
                <p>{this.props.quote}</p>
                <p>By: {this.props.author}</p>
            </div>
        );
    }
}

export default Quote;