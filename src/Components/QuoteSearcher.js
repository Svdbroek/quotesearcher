import React, { Component } from "react";
import Quote from "./Quote";

class QuoteSearcher extends Component {
  state = {
    quotes: [],
    loading: true,
    likes: 0,
    dislikes: 0,
  };

  componentDidMount() {
      console.log(this.state.loading);
    this.Fetcher();
    console.log(this.state.loading)

  }

  Fetcher() {
    fetch("https://quote-garden.herokuapp.com/quotes/search/tree") // make the request
      .then(response => response.json())
      .then(myJson => {
        this.setState({ quotes: myJson.results, loading: false });
        console.log(this.state.loading)

      });
  }

  likeCounter(){

  }

  render() {
    const quotes = this.state.quotes;
    return (
      <div>
          <h2>Likes: Dislikes:</h2>
        {!this.state.loading
          ? quotes.map(quote => {
              return (
                <Quote
                  id={quote._id}
                  quote={quote.quoteText}
                  author={quote.quoteAuthor}
                  likeCounter = {this.likeCounter()}
                />
              );
            })
          : <div>"loading..." <img alt= "loading"src={require('../images/ravens-quill.gif')} /></div> }
      </div>
    );
  }
}

export default QuoteSearcher;
