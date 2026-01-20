// // mongodb queires global service
// interface Pagination {
//   skip?: number;
//   limit?: number;
// }
// export const create = async (model: any, body: any) => {
//     console.log("🚀 ~ create ~ body:", body)

//   return await model.create(body);
// };
// // // create Many
// // exports.createMany = async (model: any, body: any) => {
// //   return await model.insertMany(body, { validateBeforeSave: true });
// // };

// // // find and filter
// export const find = async (
//   model: any,
//   filter = {},
//   pagination: Pagination = {},
//   sort = {},
//   projection = {}
// ) => {
//   return await model
//     .find(filter, projection)
//     .sort(sort)
//     .skip(pagination.skip || 0)
//     .limit(pagination.limit || 0);
// };

// export const findOne = async (model: any, filter: any, projection = {}) => {
//   return await model.findOne(filter, projection);
// };

// export const findByID = async (model: any, id: any) => {
//   return await model.findById(id);
// };

// // exports.countDocuments = async (model: any, filter: any) => {
// //   return await model.countDocuments(filter);
// // };

// // // updates
// // exports.bulkWrite = async (model: any, body: any) => {
// //   return await model.bulkWrite(body);
// // };

// export const findOneAndUpdate = async (model: any, filter: any, body: any) => {
//   return await model.findOneAndUpdate(filter, body, {
//     new: true,
//     useFindAndModify: false,
//   });
// };

// // exports.findOneAndUpdateArray = async (model: any, filter: any, body: any, arrayFilters: any) => {
// //   return await model.findOneAndUpdate(filter, body, arrayFilters);
// // };

// // exports.findOneAndUpsert = async (model: any, filter: any, body: any) => {
// //   return await model.findOneAndUpdate(filter, body, {
// //     new: true,
// //     upsert: true,
// //     runValidators: true,
// //     context: "query",
// //     setDefaultsOnInsert: true,
// //   });
// // };

// // exports.updateMany = async (model: any, filter: any, body: any) => {
// //   return await model.updateMany(filter, body, { new: true });
// // };

// // delete
// export const findOneAndDelete = async (model: any, filter: any) => {
//   return await model.findOneAndDelete(filter);
// };

// // exports.deleteMany = async (model: any, filter: any) => {
// //   return await model.deleteMany(filter);
// // };

// // // aggregation
// // exports.aggregate = async (model: any, query: any) => {
// //   return await model
// //     .aggregate(query)
// //     .collation({ locale: "en_US", strength: 1 });
// // };

// // //distinct values
// // exports.distinct = async (model: any, field: any, query = {}, options = {}) => {
// //   return await model.distinct(field, query);
// // };

import {
  FilterQuery,
  UpdateQuery,
  Document,
  Model,
  ProjectionType,
} from "mongoose";

// For pagination
interface Pagination {
  skip?: number;
  limit?: number;
}

// Generic Create
export const create = async <T extends Document>(
  model: Model<T>,
  body: Partial<T>
): Promise<T> => {
  return await model.create(body);
};

// Generic Find
export const find = async <T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T> = {},
  pagination: Pagination = {},
  sort: Record<string, 1 | -1> = {},
  projection: ProjectionType<T> = {}
): Promise<T[]> => {
  return await model
    .find(filter, projection)
    .sort(sort)
    .skip(pagination.skip || 0)
    .limit(pagination.limit || 0);
};

// Find One
export const findOne = async <T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
  projection: ProjectionType<T> = {}
): Promise<T | null> => {
  return await model.findOne(filter, projection);
};

// Find By ID
export const findByID = async <T extends Document>(
  model: Model<T>,
  id: string
): Promise<T | null> => {
  return await model.findById(id);
};

// Find One and Update
export const findOneAndUpdate = async <T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
  body: UpdateQuery<T>
): Promise<T | null> => {
  return await model.findOneAndUpdate(filter, body, {
    new: true,
    useFindAndModify: false,
  });
};

// Find One and Delete
export const findOneAndDelete = async <T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>
): Promise<T | null> => {
  return await model.findOneAndDelete(filter);
};
