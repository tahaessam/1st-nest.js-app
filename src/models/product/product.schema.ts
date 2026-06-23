import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  _id!: Types.ObjectId;

  @Prop({
    required: true,
    trim: true,
  })
  name!: string;

  @Prop({
    required: true,
    trim: true,
  })
  description!: string;

  @Prop({
    required: true,
    min: 0,
  })
  price!: number;

  @Prop({
    required: true,
    min: 0,
    default: 0,
  })
  quantity!: number;

  @Prop({
    required: true,
    trim: true,
  })
  category!: string;

  @Prop({
    default: [],
  })
  images!: string[];

  @Prop({
    default: true,
  })
  isAvailable!: boolean;

  @Prop({
    default: 0,
    min: 0,
  })
  soldCount!: number;

  @Prop({
    min: 0,
    max: 5,
    default: 0,
  })
  rating!: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
