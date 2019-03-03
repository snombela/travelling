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
            this.props.changeComment(comment)
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
        <div className="form-group">
         <label>Title:</label>
          <input type="text" name="title" className="form-control" value={this.state.title} onChange={ e => this.handleChange(e)}/>
          <label>Comment:</label>
          <textarea type="text" name="comment" className="form-control" value={this.state.comment} onChange={ e => this.handleChange(e)}/>
          
          <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
      </form>
      </div>
    )
  }
}
