import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc:number,
  price_def:number,
  ratio:number;
  timestamp:Date,
  upper_bound:number,
  lower_bound:number,
  trigger_alert:number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]):Row {
    const priceABC: (serverRespond[0].top_ask_price + serverRespond[0].top_bid_price)/2;
    const priceDEF: (serverRespond[1].top_ask_price + serverRespond[1].top_bid_price)/2;
    const ratio:priceABC/priceDEF;
    const upperBound:1+0.05;
    const lowerBOund:1-0.05;
    return {
        price_abc:priceABC,
        price_def:priceDEF,
        ratio,
        timestamp:serverResponse[0].timestamp > serverRespond[1].timestamp ?
          serverRespond[0].timestamp : serverRespond[1].timestamp
        upper_bound :upperBound,
        lower_bound :lowerBound,
        trigger_alert :(ratio>upperBound || ratio<lowerBound) ? ratio :undefined
      };
    })
  }
}
