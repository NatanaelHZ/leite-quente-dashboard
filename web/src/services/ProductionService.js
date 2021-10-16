import ApiService from './ApiService';

export async function list() {
  return ApiService.get('/productions');
}

export async function get(id) {
  return ApiService.get(`/productions/${id}`);
}

export async function create(data) {
  return ApiService.post('/productions', data);
}

export async function update(id, data) {
  return ApiService.put(`/productions/${id}`, data);
}

export async function destroy(id) {
  return ApiService.delete(`/productions/${id}`);
}
