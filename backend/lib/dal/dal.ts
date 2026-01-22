

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
