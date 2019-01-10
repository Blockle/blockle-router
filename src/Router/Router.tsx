import { Component } from 'react';

interface Props {

}

export default class Router extends Component<Props> {
  render() {
    const { children } = this.props;

    return children;
  }
}
