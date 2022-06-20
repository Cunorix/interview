import express, { Express, Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";

// FIXME: How could we inject the service instead of tighly coupling this index.ts file?
import Coupon from "./services/coupon.class";
import * as CouponService from "./services/coupon";

const APPLICATION: Express = express();
const PORT = 5000;

// FIXME: Why do we lose updates when we restart the application?
const coupons = fs.readFileSync(path.join("./src/db", "coupons.json"), "utf8");

const couponClass = new Coupon(coupons);

// TODO: What is this doing?
APPLICATION.use(express.json());

// TODO: How can we handle errors?
APPLICATION.get(
  `/coupon/:id`,
  async (request: Request, response: Response, next: any) => {
    const {
      params: { id },
    } = request;

    const coupon = await couponClass.FindById(id);

    response.send(JSON.stringify(coupon));
  }
);

APPLICATION.get(
  `/coupons`,
  async (request: Request, response: Response, next: any) => {
    const coupons = await couponClass.FindAll();

    response.json(coupons);
  }
);

APPLICATION.post(
  `/coupon`,
  async (request: Request, response: Response, next: any) => {
    const { amount, code, endDate, startDate } = request.body;

    const coupons = await couponClass.Create(code, amount, startDate, endDate);

    response.json(coupons);
  }
);

APPLICATION.post(
  "/coupon/:id",
  async (request: Request, response: Response, next: any) => {
    const {
      params: { id },
    } = request;

    const coupons = await couponClass.Update(id, request.body);

    response.send(coupons);
  }
);

APPLICATION.delete(
  "/coupon/:id",
  async (request: Request, response: Response, next: any) => {
    const {
      params: { id },
    } = request;

    const coupons = await couponClass.Delete(id);

    response.json({
      idDeleted: id,
      coupons,
    });
  }
);

APPLICATION.listen(PORT, () => {
  // TODO: Interpolate this string
  console.log("Server running on port: ", PORT);
});
