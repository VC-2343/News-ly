import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
    static defaultProps={
        country:'us',
        category:'general'
    }
    static propTypes={
country:PropTypes.string,
category:PropTypes.string
    }
  constructor(props) {
    super(props);
    console.log("hi constructor from news");
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
    document.title=`${this.props.category}-News online`;
  }

  async componentDidMount() {
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e09e2b9536ee44ddbeef888af85fdc3b&page=1&pageSize=6`;
         this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles,loading:false });
  }

  handlePrev = async () => {
    let newPage = this.state.page - 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e09e2b9536ee44ddbeef888af85fdc3b&page=${newPage}&pageSize=6`;
        this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: newPage,
      articles: parsedData.articles,
           loading:false
    });
  }

  handleNext = async () => {
    let newPage = this.state.page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e09e2b9536ee44ddbeef888af85fdc3b&page=${newPage}&pageSize=6`;
     this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: newPage,
      articles: parsedData.articles,
      loading:false
    });
  }

  render() {
    return (
      <div className="container mx-auto my-3" style={{padding:"30px"}}>
       <div style={{textAlign:"center"}}> <h2>Top {this.props.category} Headlines</h2></div>
              {this.state.loading && <Spinner/>}
        <div className='row my-3'>
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 40) : ""}
                  description={element.description ? element.description.slice(0, 80) : ""}
                  imgurl={element.urlToImage}
                  newsurl={element.url} 
                  author={element.author}
                  publishedAt={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page === 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrev}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
