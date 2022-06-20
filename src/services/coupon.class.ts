import e from "express";
import { function as F } from "fp-ts";
import { v4 } from "uuid";

import { Coupon } from "../types/coupon";

export default class CouponService {
  private coupons: any; // FIXME: Define this type

  // FIXME: Fix the coupons type
  // TODO: Inject a FS client to manipulate the .json file
  constructor(coupons: any) {
    this.coupons = JSON.parse(coupons);
  }

  // TODO: Should we provide types here from the incoming parameters?
  // FIXME: Add their return types
  // FIXME: Does this need to be async? Why or Why not?
  public Create = async (
    code: any,
    amount: any,
    startDate: Date,
    endDate: Date
  ) => {
    const coupon = {
      id: v4(),
      code,
      amount,
      startDate,
      endDate,
    };

    this.coupons.push(coupon);

    // FIXME: Should we return all the coupons?
    return this.coupons;
  };

  // What type is this Id?
  // FIXME: Use ramda to make this cleaner
  // FIXME: How do we avoid mutability here?
  public Delete = async (idToDelete: any) =>
    this.coupons.filter((coupon: any) => coupon.id !== idToDelete);

  // Should this be async?
  public FindAll = async () => this.coupons;

  // What type is this Id?
  // FIXME: Use ramda to make this cleaner
  public FindById = async (idToFind: any) =>
    // FIXME: implicitly return
    this.coupons.find((coupon: any) => {
      return coupon.id === idToFind;
    });

  // What type is this Id?
  // FIXME: Use ramda to make this cleaner
  public Update = async (idToUpdate: any, newValues: any) => {
    const index = this.coupons.findIndex(
      (coupon: any) => coupon.id === idToUpdate
    );
    const coupon = this.coupons[index];

    this.coupons[index] = {
      ...coupon,
      ...newValues,
    };

    return this.coupons;
  };

  // TODO:
  public GetActiveCoupons = async () => F.constVoid();

  // TODO: What other useful methods could we add?
}
