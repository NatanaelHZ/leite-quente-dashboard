import ApiService from './ApiService';

export async function list() {
  return ApiService.get('/animals');
}

export async function get(id) {
  return ApiService.get(`/animals/${id}`);
}

export async function create(data) {
  return ApiService.post('/animals', data);
}

export async function update(id, data) {
  return ApiService.put(`/animals/${id}`, data);
}

export async function destroy(id) {
  return ApiService.delete(`/animals/${id}`);
}
