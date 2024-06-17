import { ServerResponse } from 'http';
import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number ,
      price_def: number,
      ratio: number,
      timestamp: Date,             
      upper_bound: number,
      lower_bound: number,
      trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const upperBound = 1 + 0.05;
    const lowerBound = 1 - 0.05;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ? 
                 serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
    };
  }
}

            /*Step 1: we compute price for abc and def and then compute ratio and set Upper and Lower bound.
              Step 2:  We have serverRespons upon changes in any elements of stocks,
              Step 3: BEFORE: return value was in ROW OBJ AFTER in a single Row Object.
              Step 4: Trigger Alert on any changes!!     
             */