import React, { Component } from 'react'
import './index.css'

class Comment extends Component {
  render () {
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{this.props.comment.username} </span>：
          <p>{this.props.comment.content}</p>
        </div>
      </div>
    )
  }
}
export default Comment