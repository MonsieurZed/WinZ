class ExtendableError extends Error {
  constructor(message, name) {
    super();
    this.message = message;
    this.stack = new Error().stack;
    this.name = name.length > 0 ? name : this.constructor.name;
  }
}

export class CommandNotFoundError extends ExtendableError {
  constructor(m) {
    super(m, "CommandNotFoundError");
  }
}

export class PackageNotFoundError extends ExtendableError {
  constructor(m) {
    super(m, "PackageNotFoundError");
  }
}

export class NotElevatedError extends ExtendableError {
  constructor(m) {
    super(m, "NotElevatedError");
  }
}

export class PackageInstallError extends ExtendableError {
  constructor(m) {
    super(m, "PackageInstallError");
  }
}
