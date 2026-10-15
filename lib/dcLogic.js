// Minimal stand-in for the Claude Design runtime's `DCLogic` base class.
// The host component (components/Home.jsx) owns rendering; setState here applies
// the patch to `this.state` synchronously (as the design runtime did) and then
// asks the host to re-render.
export class DCLogic {
  constructor(props) {
    this.props = props || {};
    this.state = {};
    this.__host = null;
  }
  setState(update, cb) {
    if (this.__host) this.__host.__setLogicState(update, cb);
  }
  forceUpdate() {
    if (this.__host) this.__host.forceUpdate();
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  renderVals() {
    return {};
  }
}
