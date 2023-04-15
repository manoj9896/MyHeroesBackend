
export class ResponseEntity {
    statusCode
    body
    constructor({statusCode, body}) {
      this.statusCode = statusCode;
      this.body = body;
    }
}