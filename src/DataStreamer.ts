export interface Order {
  price: number,
  size: number,
}

export interface ServerRespond {
  stock: string,
  top_bid: Order,
  top_ask: Order,
  timestamp: Date,
}

class DataStreamer {
  static API_URL: string = 'http://localhost:8080/query?id=1';

  static async getData(callback: (data: ServerRespond[]) => void): Promise<void> {
    try {
      const response = await fetch(DataStreamer.API_URL);
      
      if (response.ok) {
        const data = await response.json();
        callback(data);
      } else {
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

export default DataStreamer;
