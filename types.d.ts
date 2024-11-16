declare namespace Express {
  export interface Request {
    user?: any; // Replace `any` with your JWT payload type if known
  }
}
