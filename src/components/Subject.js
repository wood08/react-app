import React, {Component} from 'react';

class Subject extends Component {
    render() {
        console.log("subject rander");
        return (
            <header>
                <h1><a href="/">{this.props.title}</a></h1>
                {this.props.sub}
            </header>
        );
    }
}

export default Subject;