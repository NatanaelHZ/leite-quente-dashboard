import ApiService from './ApiService';

export async function list() {
  return ApiService.get('/users');
}

export async function get(id) {
  return ApiService.get(`/users/${id}`);
}

export async function create(data) {
  return ApiService.post('/users', data);
}

export async function update(id, data) {
  return ApiService.put(`/users/${id}`, data);
}

export async function destroy(id) {
  return ApiService.delete(`/users/${id}`);
}
