/// <reference path="../_all.d.ts" />
import * as express from "express";
declare module Route {
    class FbLogin {
        index(req: express.Request, res: express.Response, next: express.NextFunction): void;
    }
}
export = Route;
