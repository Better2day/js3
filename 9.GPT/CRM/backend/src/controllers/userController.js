
import * as service from '../services/userService.js';

export async function listUsers(req, res) {
  const page = parseInt(req.query.page || '1');
  const pageSize = 20;

  const { users, total } = await service.fetchUsers(page, pageSize);
  res.json({ data: users, total, page, pageSize });
}
