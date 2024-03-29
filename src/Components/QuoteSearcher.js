import React, { Component } from "react";
import Quote from "./Quote";

class QuoteSearcher extends Component {
  state = {
    quotes: [],
    loading: true,
    ups: 0,
    downs: 0,
    query: "",
    addQuoteText:"",
    addQuoteAuthor:""
}




  componentDidMount() {
    this.Fetcher("word");
  }


  Fetcher(query) {
    this.setState({ loading: true });
    fetch(`https://quote-garden.herokuapp.com/quotes/search/${query}`) // make the request
      .then(response => response.json())
      .then(myJson => {
        this.setState({ quotes: myJson.results, loading: false });
      })
      .catch(console.error);
  }

  likeCounter = (DisLiked, WasDisLiked) => {
    // doesnt work if not arrow function
    let likes = this.state.ups;
    let dislikes = this.state.downs;

    if (DisLiked === WasDisLiked) {
      likes = 0;
      dislikes = 0;
    } else {
      // I didn't do this the same as was suggested in the reader, because I started working on this before reading the rest of the reader
      switch (WasDisLiked) {
        case true:
          if (DisLiked) {
            likes = likes + 1;
            dislikes = dislikes - 1;
          }
          if (!DisLiked) {
            dislikes = dislikes + 1;
            likes = likes - 1;
          }
          break;
        case false:
          if (DisLiked) {
            likes = likes + 1;
            dislikes = dislikes - 1;
          }
          if (!DisLiked) {
            dislikes = dislikes + 1;
            likes = likes - 1;
          }
          break;
        default:
          if (DisLiked) {
            likes = likes + 1;
          }
          if (!DisLiked) {
            dislikes = dislikes + 1;
          }

          break;
      }
    }

    this.setState({ ups: likes, downs: dislikes });
  };

  SearchChangeHandler = event => {
    //needs to be arrowfunction
    this.setState({
      query: event.target.value
    });
  };

quoteChangeHandler = event =>{this.setState({addQuoteText: event.target.value}) }
authorChangeHandler = event =>{this.setState({addQuoteAuthor: event.target.value})}


  Search = () => {
    this.Fetcher(this.state.query);
    this.setState({ups:0, downs:0})
  };

  addQuote = (text, author) => {
    const quote = {
      _id: Math.round(Math.random()*100000),
      quoteAuthor: author,
      quoteText: text,
    }
    this.setState({
      quotes: this.state.quotes.concat(quote),
      addQuoteText: "",
      addQuoteAuthor:""
    })
  }

  addQuoteHandler=()=>{
    this.addQuote(this.state.addQuoteText, this.state.addQuoteAuthor)
}



  render() {
    const quotes = this.state.quotes;
    if ((quotes.length===0) && !this.loading ){return <div> no quotes found' <input
    placeholder={"Search Quotes"}
    onChange={this.SearchChangeHandler}
    value={this.state.query}
  />
  <button type="button" onClick={this.Search}>
    search
  </button></div>}
    return (
      <div>
        <h2>
          Likes: {this.state.ups} Dislikes:{this.state.downs}{" "}
        </h2>
        <input
          placeholder={"Search Quotes"}
          onChange={this.SearchChangeHandler}
          value={this.state.query}
        />
        <button type="button" onClick={this.Search}>
          search
        </button><br/>
        <input
          placeholder={"add a quote"}
          onChange={this.quoteChangeHandler}
          value={this.state.addQuoteText}
        /><input
        placeholder={"by: ..."}
        onChange={this.authorChangeHandler}
        value={this.state.addQuoteAuthor}
      />
        <button type="button" onClick={this.addQuoteHandler}>
          add quote
        </button>
        {!this.state.loading? ( 
          quotes.map(quote => {
            return (
              <Quote
                key={quote._id}
                id={quote._id}
                quote={quote.quoteText}
                author={quote.quoteAuthor}
                likeCounter={this.likeCounter}
                ups={this.state.ups}
                downs={this.state.downs}
              />
            );
          })
        ) : (
          <div>
            "loading..."{" "}
            <img alt="loading" src={require("../images/ravens-quill.gif")} />
          </div>
        )} 
        
      </div>
    );
  }
}

export default QuoteSearcher;
