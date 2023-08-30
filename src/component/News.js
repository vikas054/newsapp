import React, { Component } from 'react'
import NewsItem from './NewsItem.js'
import Spinner from './Spinner.js';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps={
    country:'in',
    pageSize:8,
    category:'general',
    author:'UnKnown',
    data : 'Unavailiable'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    author:PropTypes.string,
    data:PropTypes.string,
    apiKey:PropTypes.string
  }

/*
  articles =[
    {
        "source": {
            "id": "espn-cric-info",
            "name": "ESPN Cric Info"
        },
        "author": null,
        "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
        "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
        "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
        "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
        "publishedAt": "2020-04-27T11:41:47Z",
        "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    },
    {
        "source": {
            "id": "espn-cric-info",
            "name": "ESPN Cric Info"
        },
        "author": null,
        "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
        "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
        "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
        "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
        "publishedAt": "2020-03-30T15:26:05Z",
        "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    }
]*/
  constructor(props){
    super(props);
    //console.log("Hello i am a constructor for News Component");
    this.state={
       articles:[],
       loading : true ,
       page:1,
       totalResults:0

    }
    document.title =  `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }


  async componentDidMount(){
    //console.log("cdm")
    // this.setState({loading:true})
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a655b9b4d70c49b0acbff2ea653b62e6&page=1&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({page:1,articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    this.updateNews()
 
  }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json();
    this.props.setProgress(60);
    this.setState({
      page:this.state.page,
      articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })
    this.props.setProgress(100)
  }

  handlePreClick=async()=>{
    // console.log('previous')
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a655b9b4d70c49b0acbff2ea653b62e6&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json();

    // this.setState({
    //   page:this.state.page - 1,
    //   articles:parsedData.articles,
    //   loading:false
    // })

    this.setState({page:this.state.page -1})
    this.updateNews();
  }

  handleNextClick =async()=>{
    //console.log('next');
    if(this.state.page +1> (Math.ceil(this.state.totalResults/this.props.pageSize))){

    }else{
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a655b9b4d70c49b0acbff2ea653b62e6&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true})
      // let data = await fetch(url);
      // let parsedData = await data.json();

      // this.setState({
      //   page:this.state.page +1,
      //   articles:parsedData.articles,
      //   loading:false
      // })
      this.setState({page:(this.state.page+1)})
      this.updateNews();
    }

  }

  fetchMoreData = async() => {
    this.setState({page:this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
   
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page:this.state.page,
      articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
     
    })

    // setTimeout(() => {
    //   this.setState({
    //     items: this.state.items.concat(Array.from({ length: 20 }))
    //   });
    // }, 1500);
  };

  render() {
    return (
      <>
        <h2 className='text-center' style={{margin:'35px 0px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && < Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.state.totalResults}
          loader={< Spinner/>}
        >
          
       
        <div className='container'>
          <div className="row">
          {/* {!this.state.loading && this.state.articles.map((element)=>{  */}
          {this.state.articles.map((element)=>{ 
            return <div className="col-md-4" key={element.url}>
              <NewsItem  tittle={element.title?element.title.slice(0,30)+'...':""} description={element.description?element.description.slice(0,88)+'...':""} imageUrl={element.urlToImage?element.urlToImage:""} 
              newsUrl={element.url?element.url:""} author={element.author} date={element.publishedAt} source={element.source} />
              
            </div>
            
            })}  
          
          </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
              <button disabled={this.state.page +1> (Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
      </>

    )
  }
}

export default News