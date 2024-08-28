import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

class App extends Component<{}, IState> {
  private intervalId: NodeJS.Timeout | undefined;

  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      showGraph: false,
    };
  }

  componentWillUnmount() {
    // Clear the interval if the component is unmounted
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  renderGraph() {
    if (this.state.showGraph) {
      return (<Graph data={this.state.data}/>);
    }
    return null;
  }

  getDataFromServer() {
    let x = 0;
    this.intervalId = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
      });
      x++;
      if (x > 1000) {
        // Stop fetching after 1000 intervals
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
      }
    }, 100);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank Merge & Co Task 3
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button" onClick={() => {this.getDataFromServer()}}>Start Streaming Data</button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
