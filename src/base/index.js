module.exports.Response = class {
    constructor(status, message) {
      this.status = status;
      this.message = message;
    }
  };
  module.exports.ResponseError = class extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  };
  