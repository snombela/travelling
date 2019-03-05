import React, { Component } from 'react'
import CommentService from './Comment-service';
import '../comment/Comment.scss'

export default class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      comment: ''
    }
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

  render() {
    return (
      <div>
        <p>
        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Button with data-target
        </button>
        </p>
        <div className="collapse" id="collapseExample">
        <div className="card card-body">
        Hola
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input type="text" name="title" className="form-control" value={this.state.title} onChange={e => this.handleChange(e)} placeholder="Title" />
            <label>Comment:</label>
            <textarea type="text" name="comment" className="form-control" value={this.state.comment} onChange={e => this.handleChange(e)} placeholder="comment" />

            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
        </div>
        </div>
      </div>
    )
  }
}


{/* <p>
  <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Link with href
  </a>
  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Button with data-target
  </button>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body">
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
</div> */}