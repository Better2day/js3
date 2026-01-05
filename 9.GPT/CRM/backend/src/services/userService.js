
import * as model from '../models/userModel.js';

export async function fetchUsers(page, pageSize) {
  const offset = (page - 1) * pageSize;
  return {
    users: await model.getUsers(pageSize, offset),
    total: await model.countUsers()
  };
}
