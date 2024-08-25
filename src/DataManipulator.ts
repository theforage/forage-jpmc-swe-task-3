import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number, 
  price_def: number,
  ratio: number
  timestamp: Date,
  upper_bound: number,
  lower_bound:number,
  trigger_alert: number,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceABC =(serverRespound[0].top_ask.price + serverRespound[0].top_bird.price)/2;
    const priceDEF =(serverRespound[1].top_ask.price + serverRespound[1].top_bird.price)/2;
    const upperBound = 1 + 0.05;
    const lowerBound = 1 - 0.05;
    return {
      price_abc: priceABC,
      Price_def: priceDEF,
      ratio,
      timestamp: serverRespound[0].timestamp > serverRespound[1].timestamp ?
        serverRespound[0].timestamp : serverRespound[1].timestamp,
      upper_bound:upperBound,
      lower_bound:lowerBound,
      trigger_alert : (ratio > upperBound || ratio < LowerBound) ? ratio : undefined ,
  };
}
