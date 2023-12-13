import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ProductImage } from "./productimage.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import sequelize from "sequelize";
import {
  CreateProductImageDto,
  UpdateProductImageDto,
} from "./dto/createProductImage.dto";
import { Products } from "../PRODUCTS/products.entity";
import { Transaction } from "sequelize";
import { ImgcompressService } from "../IMAGE_COMPRESS/img_compress.service";

@Injectable()
export class ProductImageService {
  constructor(
    @Inject("ProductImageRepository")
    private readonly ProductImageRepository: typeof ProductImage,
    private readonly imageUploadService: ImgcompressService
  ) {}
  async create(
    product: Products,
    image: CreateProductImageDto[],
    transaction: Transaction
  ) {
    try {
      const images = [];
      for (const item of image) {
        if (item?.url?.url) {
          //only if url is found
          const img = await this.ProductImageRepository.create(
            {
              url: item.url?.url,
              productId: product._id,
              type: item.type,
              Key: item.url?.Key,
            },
            {
              transaction: transaction,
            }
          );
          images.push(img);
        }
      }
      if (images?.length == 0) {
        //no product image is added
        throw new Error("No Images for product is found");
      }
      return images;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async updateProductImages(
    pId: number,
    newImages: CreateProductImageDto[],
    imgtoRemove: UpdateProductImageDto[]
  ) {
    try {
      const result = await this.ProductImageRepository.sequelize.transaction(
        {
          isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
        },
        async (transaction) => {
          const newImg = await this.addNewImages(pId, newImages, transaction);
          const removeImg = await this.removeImages(imgtoRemove, transaction);
          return { newImg, removeImg };
        }
      );
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async addNewImages(
    pId: number,
    newImages: CreateProductImageDto[],
    t: Transaction
  ) {
    try {
      const images = [];
      if (Array.isArray(newImages) && pId) {
        //if the payload is an array and productId is found.
        for (const img of newImages) {
          if (img?.url?.url && img?.url?.Key) {
            //if url and key is found for each image.
            const newImg = await this.ProductImageRepository.create(
              {
                url: img.url?.url,
                productId: pId,
                type: img.type,
                Key: img.url?.Key,
              },
              { transaction: t }
            );
            images.push(newImg);
          }
        }
        return images;
      }
      return [];
    } catch (err) {
      throw new Error("Failed to Add Product Image");
    }
  }
  async removeImages(removeImages: UpdateProductImageDto[], t: Transaction) {
    const images = [];
    try {
      if (Array.isArray(removeImages)) {
        //if the payload is an array
        for (const img of removeImages) {
          if (img.id && img.Key) {
            //first we remove file from s3 then remove from db
            // const removedS3 = await this.imageUploadService.deleteFromS3(
            //   img.Key
            // );
            const removed = await this.ProductImageRepository.destroy({
              where: {
                id: img.id,
              },
              transaction: t,
            });
            removed == 1 ? images.push(img) : null;
          }
        }
        return images;
      }
      return [];
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
