import React, { Component } from "react";
import AuthService from "../auth/Auth-service";
import './Addphoto.css'

class AddPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl:
        "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png"
    };
    this.service = new AuthService();
  }

  componentDidMount() {
      if (this.props.imageUrl !== undefined) {
          this.setState({ ...this.state, imageUrl: this.props.imageUrl });
      }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, imageUrl: nextProps["imageUrl"] });
  }

  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    this.service
      .handleUpload(uploadData)
      .then(response => {
        this.setState({ imageUrl: response.imageUrl });
        this.service
          .updatePhotoProfile({ imageUrl: response.imageUrl })
          .then(response => {
            console.log(response);
          });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    return (
      <div>
        <div className="photo">
          <img src={this.state.imageUrl} alt="user profile" />
          <form>
            <input type="file" onChange={e => this.handleFileUpload(e)} />
          </form>
        </div>
      </div>
    );
  }
}

export default AddPhoto;
