import React from 'react';

export default class Demo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        count: 0
    }
  }

  componentDidMount() {
    setTimeout(()=>{
        this.setState({
            count: 1
        });
        console.log('componentDidMount', this.state.count);
        this.setState({
            count: 2
        });
        console.log('componentDidMount', this.state.count);
        this.setState({
            count: 3
        });
        console.log('componentDidMount', this.state.count);
    });
  }
  render() {
      console.log('render:', this.state.count);
      return <div>{this.state.count}</div>;
  }
}