import { BaseRepository } from './BaseRepository';
import { Products } from '../models/products';

 // @ts-ignore
export class ProductsRepo extends BaseRepository<products> {


  constructor() {
    super(Products);
  }
}