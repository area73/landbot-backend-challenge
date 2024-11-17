declare namespace Express {
  export interface Request {
    user?: Record<string, string>;
  }
  export interface Error {
    name: string;
    message: string;
    code?: string;
    stack?: string;
  }
}
