import React, { Component } from "react";
import Quote from "./Quote";

class QuoteSearcher extends Component {
  state = {
    quotes: [],
    loading: true,
    ups: 0,
    downs: 0,
    query: ""
  };

  componentDidMount() {
      console.log(this.state.loading);
    this.Fetcher("word");
    console.log(this.state.loading)
    console.log(this.state.ups)

  }

  Fetcher(query) {
    fetch(`https://quote-garden.herokuapp.com/quotes/search/${query}`) // make the request
      .then(response => response.json())
      .then(myJson => {
        this.setState({ quotes: myJson.results, loading: false });
        console.log(this.state.loading)

      });
  }

  likeCounter =( DisLiked, WasDisLiked)=>{
    let likes = this.state.ups
    let dislikes = this.state.downs 
    
    if (DisLiked === WasDisLiked){likes = 0; dislikes=0}else{ // I didn't do this the same as was suggested in the reader, because I started working on this before reading the rest of the reader
    switch (WasDisLiked) {
        case true:
        if (DisLiked){ likes = likes+1; dislikes=dislikes-1 } 
        if (!DisLiked){dislikes=dislikes+1; likes=likes-1}
            break;
        case false:
        if (DisLiked){ likes = likes+1; dislikes=dislikes-1 } 
        if (!DisLiked){dislikes=dislikes+1; likes=likes-1}
        break;
        default: 
        if (DisLiked){ likes = likes+1 } 
        if (!DisLiked){dislikes=dislikes+1}

            break;
    }}


     this.setState({ups:likes, downs:dislikes})
  }


  SearchChangeHandler = event => {
    this.setState({
      query: event.target.value
    });
  };

  render() {
    const quotes = this.state.quotes;
    return (
      <div>
          <h2>Likes: {this.state.ups} Dislikes:{this.state.downs} </h2>
    <input placeholder={"Search Quotes"} onChange={this.SearchChangeHandler} value={this.state.query}/>

        {!this.state.loading
          ? quotes.map(quote => {
              return (
                <Quote
                key ={quote._id}
                  id={quote._id}
                  quote={quote.quoteText}
                  author={quote.quoteAuthor}
                  likeCounter = {this.likeCounter}
                  ups = {this.state.ups}
                  downs ={this.state.downs}
                />
              );
            })
          : <div>"loading..." <img alt= "loading"src={require('../images/ravens-quill.gif')} /></div> }
      </div>
    );
  }
}

export default QuoteSearcher;
