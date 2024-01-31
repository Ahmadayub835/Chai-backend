//The ApiResponse class is created to provide a consistent and structured way to format API responses. It simplifies the process of sending responses back to clients by encapsulating the status code, data, and an optional message in a single object
class ApiResponse {
  constructor(statusCode, message = "message", data) {
// we are fillig this elements in constructor.
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400; //this code is worked under 400
  }
}

export { ApiResponse };
