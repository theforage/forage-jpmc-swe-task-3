import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc : number,
  price_def : number,
  ratio : number,
  timestamp : Date,
  upper_bound : number,
  lower_bound : number,
  trigger_alert : number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;

    const historicalAverageRatio = this.getHistoricalAverageRatio();

    const upperBound = historicalAverageRatio * 1.1;
    const lowerBound = historicalAverageRatio * 0.99;

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

  static getHistoricalAverageRatio(): number {
    // Implement this method to calculate or retrieve the 12-month historical average ratio
    // For now, returning a placeholder value
    return 1.0; // Replace with actual calculation
  }
}
