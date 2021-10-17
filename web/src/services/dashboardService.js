import ApiService from './ApiService';

export async function results() {
  return ApiService.get('/dashboards');
}

export async function get(id) {
  return ApiService.get(`/dashboards/${id}`);
}
