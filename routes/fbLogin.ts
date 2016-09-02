/// <reference path="../_all.d.ts" />

"use strict";
import * as express from "express";
import * as oauth2fb from "oauth2-facebook";

module Route {

  export class FbLogin {

    public index(req: express.Request, res: express.Response, next: express.NextFunction) {
      //render page
      let config:any = {
        appId: 'abc123',
        redirectUrl: {
          protocol: 'http://',
          host: 'example.com',
          uri: '/auth/facebook/callback'
        }
      };
      res.send(oauth2fb.signIn(config));
    }
  }
}

export = Route;
