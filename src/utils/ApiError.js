class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "something went wrong",
    errors = [],
    stack
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor); // creating a clean stack trace automatically
    }
  }
}

export { ApiError };
