import mongoose from "mongoose";
import { boolean, string } from "joi";

export interface newBox {
  name: string;
}

export interface box {
  _id: string;
  UserId: string;
  name: string;
  visible: string;
  created_at: Date;
  updated_at: Date;
}
