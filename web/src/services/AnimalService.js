import ApiService from './ApiService';

export async function create(data) {
  return ApiService.post('/animals', data);
}

export async function get() {
  return ApiService.get('/animals');
}
