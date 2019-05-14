import React, {Component} from 'react';

class TOC extends Component {
    // concat 과 shouldComponentUpdate 로 성능향상 가능
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.props.data === nextProps.data){
            return false;   // render 미실행
        }
        return true;    // render 실행
    }

    render(){
        const data = this.props.data;
        let i = 0;
        const lists = [];
        while(i < data.length){
            lists.push(
                <li key={data[i].id}>
                    <a href={"/content/"+data[i].id}
                       onClick={function(id, e){
                           e.preventDefault();
                           this.props.onChangePage(id);
                    }.bind(this, data[i].id)}>{data[i].title}</a>
                </li>
            );
            i = i + 1;
        }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default TOC;