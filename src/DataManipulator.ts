import { ServerRespond } from './DataStreamer';

export interface Row {
  pirce_abc:number,
  price_def:number,
  ratio:number,
  timestamp:Date,
  upper_bound:number,
  lower_bound:number,
  trigger_alert:number | undefined,
}


export class DataManipulator {
  static generateRow(ServerRespond:ServerRespond[]):Row{
    const priceABC=(ServerRespond[0].top_ask_price+ServerRespond[0].top_bid)/2;
    const priceDEF=(ServerRespond[1].top_ask_price+ServerRespond[1].top_bid)/2;
    const ratio = priceABC / priceDEF;
    const upper_bound=1+0.0.5;
    const lower_bound=1-0.05;
    return {
      pirce_abc:priceABC,
      price_def:priceDEF,
      ratio,
      timestamp: ServerRespond[0].timestamp>ServerRespond[1].timestamp ?
        ServerRespond[0].timestamp : ServerRespond[1].timestamp,
      upper_bound: upper_bound,
      lower_bound: lower_bound,
      trigger_alert: (ratio> upper_bound || ratio < lowerBound) ? ratioe : undefined,

    }
  }
};
