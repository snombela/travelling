import React, { Component } from 'react'
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
      return (this.state.search.length === 0) ? "20% 20%" : "10px 20px";
    }

  render() {
    return (
      <div style={{padding: this.getPadding()}}>
        <input type="search" results="5" name="search" className="form-control search" onChange={e => this.changeTextSearch(e)} placeholder="Search..."/>  
      </div>
    )
  }
}

