import React, { Component } from 'react';
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      comments: [],
    }
  }
  handleSubmit = (comment) => {
    this.setState({ comments: [...this.state.comments, comment] }, () => {
      console.log(this.state.comments)
    });
  }
  render() {
    return (
      <div className="App">
        <CommentInput 
          onSubmit={this.handleSubmit}
        />
        <CommentList 
          comments={this.state.comments}
        />
      </div>
    );
  }
}

export default App;
