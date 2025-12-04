const CommonGen = require('./CommonGen');

class BirthdateGen extends CommonGen {
  constructor(from, to) {
    super();
    this.yearStart = from;
    this.yearEnd = to;
  }

  generate() {
    const year = Math.floor(Math.random() * (this.yearEnd - this.yearStart)) + this.yearStart;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 30 + 1);

    return `${year}-${month}-${day}`;
  }
}

module.exports = BirthdateGen;
