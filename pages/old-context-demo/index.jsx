import React from 'react';
const PropTypes = require('prop-types');

class Children extends React.Component {
  static contextTypes = {
    text: PropTypes.string
  }
  render() {
    return (
      <div>{ this.context.text }</div>
    )
  }
}

class Parent extends React.Component {
  render() {
    return (
      <Children/>
    )
  }
}

class GrandParent extends React.Component {
  static childContextTypes = {
    text: PropTypes.string,
  }
  getChildContext() {
    return {
      text: 'Hi, my babyssdd'
    }
  }
  render() {
    return (
      <Parent text="Hi, my baby" />	
    )
  }
}


export default GrandParent;