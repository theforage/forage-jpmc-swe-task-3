import React, { Component } from 'react';
import { Table } from '@finos/perspective';
import { ServerRespond } from './DataStreamer';
import { DataManipulator } from './DataManipulator';
import './Graph.css';

interface IProps {
  data: ServerRespond[],
}

interface PerspectiveViewerElement extends HTMLElement {
  load: (table: Table) => void,
}

// Modify the schema to include new fields for ratio calculation
const schema = {
  stock: 'string',
  top_ask_price: 'float',
  top_bid_price: 'float',
  timestamp: 'date',
  ratio: 'float', // Added for ratio calculation
  price_abc: 'float', // Added for ratio calculation
  price_def: 'float', // Added for ratio calculation
  lower_bound: 'float', // Added for threshold calculation
  upper_bound: 'float', // Added for threshold calculation
  trigger_alert: 'float', // Added for threshold calculation
};

class Graph extends Component<IProps, {}> {
  table: Table | undefined;

  render() {
    return React.createElement('perspective-viewer');
  }

  componentDidMount() {
    // Get element from the DOM.
    const elem = document.getElementsByTagName('perspective-viewer')[0] as PerspectiveViewerElement;

    if (window.perspective && window.perspective.worker()) {
      this.table = window.perspective.worker().table(schema);
    }
    if (this.table) {
      // Load the `table` in the `<perspective-viewer>` DOM reference.
      elem.load(this.table);
      elem.setAttribute('view', 'y_line');
      elem.setAttribute('row-pivots', '["timestamp"]');
      elem.setAttribute('columns', '["ratio", "lower_bound", "upper_bound", "trigger_alert"]');
      elem.setAttribute('aggregates', '{"ratio":"avg","lower_bound":"avg","upper_bound":"avg","trigger_alert":"avg"}');
    }
  }

  componentDidUpdate() {
    if (this.table) {
      // Update the Perspective table with processed data from DataManipulator
      this.table.update(DataManipulator.generateRow(this.props.data));
    }
  }
}

export default Graph;
