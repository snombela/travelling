import React, { Component } from 'react'
import './SearchBar.scss'

export default class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state= {
            search:''
        }
    }

    handleFormSearch = e => {
        let newState = {
            ...this.state,
            search: e.target.value
        };
        this.props.handlerFunction(newState.search);
        this.setState(newState);
    };

  render() {
    return (
      <div>
        <input type="text" name="search" onChange={e => this.handleFormSearch(e)} placeholder="enter your query"/>  
      </div>
    )
  }
}

