import './App.css';

import React, { Component } from 'react'
import NavBar from './component/NavBar';
import News from './component/News';
import {BrowserRouter as Router,Routes , Route} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 5;
  apiKey= "a655b9b4d70c49b0acbff2ea653b62e6" ;
 
  state={
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar/>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
            // onLoaderFinished={() => setProgress(0)}
          />
          {/* <News setProgress={this.setProgress} pageSize={5} category="sports" country="in"/> */}
          <Routes> 
            <Route exact  path="/" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} apiKey={this.apiKey} category="general" country="in"/>} /> 
            <Route exact  path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} apiKey={this.apiKey} category="business" country="in"/>} /> 
            <Route exact  path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} apiKey={this.apiKey} category="entertainment" country="in"/>} /> 
            <Route exact  path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} apiKey={this.apiKey} category="general" country="in"/>} /> 
            <Route exact  path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} apiKey={this.apiKey} category="health" country="in"/>} /> 
            <Route exact  path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} apiKey={this.apiKey} category="science" country="in"/>} /> 
            <Route exact  path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} apiKey={this.apiKey} category="sports" country="in"/>} /> 
            <Route exact  path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} apiKey={this.apiKey} category="technology" country="in"/>} /> 

           
            </Routes>
        </Router>
      </div>
    )
  }
}

