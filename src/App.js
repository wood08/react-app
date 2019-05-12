import React, {Component} from 'react';
import './App.css';
import TOC from './components/TOC';
import Content from './components/Content';
import Subject from './components/Subject';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            mode:"read"
            ,subject:{title:"WEB", sub:"World Wide Wed!"}
            ,welcome:{title:"Welcome", desc:"Hello React"}
            ,contents:[
                {id:1, title:"HTML", desc:"HTML is for information"}
                ,{id:2, title:"CSS", desc:"CSS is for design"}
                ,{id:3, title:"JavaScript", desc:"JavaScript is for interactive"}
            ]
        };
    }
    render() {
        console.log("app render");
        let _title, _desc = null;
        if(this.state.mode === "welcome"){
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
        } else if(this.state.mode === "read"){
            _title = this.state.contents[0].title;
            _desc = this.state.contents[0].desc;
        }
        return (
            <div className="App">
                {/*<Subject title={this.state.subject.title} sub={this.state.subject.sub}></Subject>*/}
                <header>
                    <h1><a href="/" onClick={function(e){
                        console.log(e);
                        e.preventDefault(); // a 태그 이벤트의 기본동작 막기
                        this.setState({mode:"welcome"});
                    }.bind(this)    // function 안에서 this 값을 쓸 수 있도록 추가
                    }>{this.state.subject.title}</a></h1>
                    {this.state.subject.sub}
                </header>
                <TOC data={this.state.contents}></TOC>
                <Content title={_title} desc={_desc}></Content>
            </div>
        );
    }
}

export default App;