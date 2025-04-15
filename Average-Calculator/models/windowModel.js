class AverageWindow {
    constructor(limit = 10) {
      this.limit = limit;
      this.window = [];
    }
  
    add(numbers) {
      const prevState = [...this.window];
      const uniqueNew = numbers.filter(num => !this.window.includes(num));
  
      for (const num of uniqueNew) {
        if (this.window.length >= this.limit) {
          this.window.shift();
        }
        this.window.push(num);
      }
  
      const avg = this.window.length
        ? (this.window.reduce((sum, n) => sum + n, 0) / this.window.length).toFixed(2)
        : '0.00';
  
      return {
        prevState,
        currState: [...this.window],
        avg
      };
    }
  }
  
  module.exports = new AverageWindow(10); // Singleton instance
  