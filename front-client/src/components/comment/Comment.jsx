import React, { Component } from 'react'
import CommentService from './Comment-service';
import '../comment/Comment.scss'
import { Collapse, Button, CardBody, Card } from 'reactstrap';


export default class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      collapse: false,
      comment: ''
    }
    this.toggle = this.toggle.bind(this);
    this.service = new CommentService();
  }
  handleFormSubmit = (event) => {
    const { comment, title } = this.state;
    this.service.sendComment(this.props.locationId, comment, title)
      .then(comment => {
        this.setState({
          ...this.state,
          title: '',
          comment: ''
        })
        this.props.changeComment(comment)
      }).catch(error => console.log(error))

    event.preventDefault()
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle} style={{ marginBottom: '1rem' }}>Show comment</Button>
        <Collapse isOpen={this.state.collapse}>
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input type="text" name="title" className="form-control" value={this.state.title} onChange={e => this.handleChange(e)} placeholder="Title" />
              <label>Comment:</label>
              <textarea type="text" name="comment" className="form-control" value={this.state.comment} onChange={e => this.handleChange(e)} placeholder="comment" />

              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </Collapse>
      </div>
    )
  }
}