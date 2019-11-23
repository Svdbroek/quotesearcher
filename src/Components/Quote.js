import React, { Component } from 'react';
import "./Quote.css"

class Quote extends Component {
    state ={
        liked: null
    }
likeHandler (){
 this.setState({liked:true})
}

dislikeHandler(){
    this.setState({liked:false})
}

    render() {
        return (
            <div className ={(() => {
                switch (this.state.liked) {
                  case  true:   return "liked";
                  case false: return "disliked";
                  default:      return "n/a";
                }
              })()}>
                <p>{this.props.quote}</p>
                <p>By: {this.props.author} <button onClick={() =>{this.likeHandler()}}>:)</button> <button onClick={()=>{this.dislikeHandler()}}>:(</button></p> 
            </div>
        );
    }
}

export default Quote;