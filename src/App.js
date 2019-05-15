import React, {Component} from 'react';
import './App.css';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';

class App extends Component {
    constructor(props){
        super(props);
        this.max_content_id = 3;
        this.state = {
            mode:"welcome"
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
    getReadContent(){
        for(let i=0; i<this.state.contents.length; i++){
            if( this.state.selected_content_id === this.state.contents[i].id){
                const data = this.state.contents[i];
                return data;
            }
        }
    }
    getContent(){
        let _title, _desc, _article = null;
        if(this.state.mode === "welcome"){
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
        } else if(this.state.mode === "read"){
            const _content = this.getReadContent();
            _title = _content.title;
            _desc = _content.desc;
            _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
        } else if(this.state.mode === "create"){
            _article = <CreateContent onSubmit={function(_title, _desc){
                this.max_content_id++;
                const _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc});   // 원본을 바꾸지 않기 위해 concat 사용
                this.setState({contents:_contents, mode:"read", selected_content_id:this.max_content_id});
            }.bind(this)}></CreateContent>;
        } else if(this.state.mode === "update"){
            const _content = this.getReadContent();
            _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
                const _contents = Array.from(this.state.contents);  // 원본을 바꾸지 않기 위해 새로 배열 만듬
                for(let i=0; i< _contents.length; i++){
                    if(_contents[i].id === _id){
                        _contents[i] = {id:_id, title:_title, desc:_desc};
                        break;
                    }
                }
                this.setState({contents:_contents, mode:"read"});
            }.bind(this)}></UpdateContent>;
        }
        return _article;
    }
    render() {
        console.log("app render");
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
                    if(mode === 'delete'){
                        if(window.confirm("삭제하겠습니까?")){
                            const _contents = Array.from(this.state.contents);  // 원본을 바꾸지 않기 위해 새로 배열 만듬
                            for(let i=0; i<_contents.length; i++){
                                if(_contents[i].id === this.state.selected_content_id){
                                    _contents.splice(i,1);
                                    break;
                                }
                                this.setState({contents:_contents, mode:"welcome"});
                            }
                        }
                    } else {
                        this.setState({mode:mode});
                    }
                }.bind(this)}></Control>
                {this.getContent()}
            </div>
        );
    }
}

export default App;