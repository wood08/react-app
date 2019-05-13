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
            ,selected_content_id:2
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
            for(let i=0; i<this.state.contents.length; i++){
                if( this.state.selected_content_id == this.state.contents[i].id){
                    _title = this.state.contents[i].title;
                    _desc = this.state.contents[i].desc;
                    break;
                }
            }
        }
        return (
            <div className="App">
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                    onChangePage={function(){
                        this.setState({mode:"welcome"});
                    }.bind(this)}
                ></Subject>
                <TOC
                    onChangePage={function(id){
                        this.setState({mode:"read", selected_content_id:id});
                    }.bind(this)}
                    data={this.state.contents}
                ></TOC>
                <Content title={_title} desc={_desc}></Content>
            </div>
        );
    }
}

export default App;