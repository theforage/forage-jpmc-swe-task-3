import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row[] {
    const priceABC = serverResponds.find(d => d.stock === 'ABC')?.top_ask.price;
    const priceDEF = serverResponds.find(d => d.stock === 'DEF')?.top_ask.price;
    const ratio = priceABC && priceDEF ? priceABC / priceDEF : 0;
    const upperBound = 1.05;
    const lowerBound = 0.95;
    const triggerAlert = (ratio > upperBound || ratio < lowerBound) ? ratio : undefined;

    return serverResponds.map((el: any) => ({
      price_abc: el.stock === 'ABC' ? el.top_ask.price : priceABC || 0,
      price_def: el.stock === 'DEF' ? el.top_ask.price : priceDEF || 0,
      ratio,
      timestamp: el.timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: triggerAlert,
    }));
  }
}

