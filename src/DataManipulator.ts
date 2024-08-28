import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row[] {
    // Generate an array of rows
    return serverResponds.map((serverRespond) => {
      const priceABC = (serverRespond.top_ask.price + serverRespond.top_bid.price) / 2;
      const priceDEF = (serverRespond.top_ask.price + serverRespond.top_bid.price) / 2;
      const ratio = priceABC / priceDEF;
      const upperBound = 1 + 0.05;
      const lowerBound = 1 - 0.05;

      return {
        price_abc: priceABC,
        price_def: priceDEF,
        ratio,
        timestamp: serverRespond.timestamp,
        upper_bound: upperBound,
        lower_bound: lowerBound,
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
      };
    });
  }
}
