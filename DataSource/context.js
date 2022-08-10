class Context {
  static services = new Map();

  static addService(token, value) {
    this.services.set(token, value);
  }

  static getService(token) {
    return this.services.get(token);
  }

  static hasService(token) {
    return this.services.has(token);
  }
}

exports.Context = Context;

/**
 * token
 * value
 */
