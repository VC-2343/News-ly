import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
    let {title,description,imgurl,newsurl,author,publishedAt}=this.props;
    return (
      <div className='my-3 mx-auto' style={{display:"flex",justifyContent:'space-evenly'}}>
          <div className="card" style={{ width: "25rem", height: "30rem" ,padding:"20px,20px"
}}>
  <img src={imgurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={newsurl} className="btn btn-sm btn-primary">Read more</a>
    <p className="card-text"><small className="text-body-secondary">Last updated {publishedAt} ago by {!author?"unknown":author}</small></p>
  </div>
</div>
      </div>
    )
  }
}
