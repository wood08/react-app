import React, {Component} from 'react';

class IFrame extends Component {
    constructor(){
        super();
    }

    componentDidMount() {
        this.CallPopup();
    }

    render() {
        return (
            <div>

            </div>
        );
    }

    CallPopup(){
        const popUrl = "http://google.com";
        const popUpOption = "width=10, height=10, resizable=no. scrollbars=no. status=no;";
        window.open(popUrl, popUpOption);
    }
}

export default IFrame;