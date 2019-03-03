import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './SearchBar.scss'

export default class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state= {
            search:''
        }
    }

    changeTextSearch = e => {
      this.setState({...this.state, search: e.target.value})
        this.props.changeTextSearch(e.target.value);
    };

    getPadding = () => {
      return (this.state.search.length === 0) ? 260 : 20;
    }

  render() {
    return (
      <div style={{padding: this.getPadding()}}>
        <input type="text" name="search" className="form-control" onChange={e => this.changeTextSearch(e)} placeholder="search"/>  
      </div>
    )
  }
}

