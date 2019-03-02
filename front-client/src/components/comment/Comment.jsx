import React, { Component } from 'react'
import CommentService from './Comment-service';

export default class Comment extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            comment: ''
        }
        this.service = new CommentService();
    }
    handleFormSubmit = (event) => {
        const {comment, title} = this.state;
        this.service.sendComment(this.props.locationId, comment, title)
        .then(comment => {
            this.setState({...this.state,
                title: '',
                comment: ''
            })
        }).catch( error => console.log(error))
        event.preventDefault()
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    
  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>

         <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
          <label>Comment:</label>
          <textarea type="text" name="comment" value={this.state.comment} onChange={ e => this.handleChange(e)}/>
          
          <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}
