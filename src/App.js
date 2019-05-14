import React, {Component} from 'react';
import './App.css';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import Subject from './components/Subject';
import Control from './components/Control';

class App extends Component {
    constructor(props){
        super(props);
        this.max_content_id = 3;
        this.state = {
            mode:"create"
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
        let _title, _desc, _article = null;
        if(this.state.mode === "welcome"){
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
        } else if(this.state.mode === "read"){
            for(let i=0; i<this.state.contents.length; i++){
                if( this.state.selected_content_id === this.state.contents[i].id){
                    _title = this.state.contents[i].title;
                    _desc = this.state.contents[i].desc;
                    _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
                    break;
                }
            }
        } else if(this.state.mode === "create"){
            _article = <CreateContent onSubmit={function(_title, _desc){
                this.max_content_id++;
                const _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc});
                this.setState({contents:_contents});
            }.bind(this)}></CreateContent>;
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
                <Control onChangeMode={function(mode){
                    this.setState({mode:mode});
                }.bind(this)}></Control>
                {_article}
            </div>
        );
    }
}

export default App;