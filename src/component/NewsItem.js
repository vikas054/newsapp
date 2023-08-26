import React, { Component } from 'react'

export class NewsItem extends Component {


  // constructor(){
  //   super();
  //   console.log("Hello i am a constructor")
    
  // }

  render() {
    let {tittle,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className="container my-3">

       <div className="card" >
          <img src={imageUrl?imageUrl:"https://euaa.europa.eu/sites/default/files/styles/width_600px/public/default_images/news-default-big.png?itok=NNXAZZTc"} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{tittle}
            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}} >
             {source.name}
            </span>
            </h5>
            <p className="card-text">{description}</p>
            <p class="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark">Read More</a>
          </div>
        </div>
        
      </div>
    )
  }
}

export default NewsItem