import ApiService from './ApiService';

export async function list() {
  return ApiService.get('/revenues_expenditures');
}

export async function get(id) {
  return ApiService.get(`/revenues_expenditures/${id}`);
}

export async function create(data) {
  return ApiService.post('/revenues_expenditures', data);
}

export async function update(id, data) {
  return ApiService.put(`/revenues_expenditures/${id}`, data);
}

export async function destroy(id) {
  return ApiService.delete(`/revenues_expenditures/${id}`);
}
