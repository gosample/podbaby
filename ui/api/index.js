import axios from 'axios';

axios.interceptors.request.use(config => {
  const headers = Object.assign({}, config.headers, { 'X-CSRF-Token': window.__DATA__.csrfToken });
  return Object.assign({}, config, { headers });
}, error => Promise.reject(error));

export function logout() {
  return axios.delete('/api/auth/logout/');
}

export function login(identifier, password) {
  return axios.post('/api/auth/login/', {
    identifier,
    password,
  });
}

export function recoverPassword(identifier) {
  return axios.post(`/api/auth/recoverpass/`, { identifier });
}

export function signup(name, email, password) {
  return axios.post('/api/auth/signup/', {
    name,
    email,
    password,
  });
}

export function isName(name) {
  return axios.get(`/api/auth/name/`, { params: { name } });
}

export function isEmail(email) {
  return axios.get(`/api/auth/email/`, { params: { email } });
}

export function search(query, type, page = 1) {
  return axios.get('/api/search/', { params: { q: query, t: type, page } });
}

export function searchChannel(query, id) {
  return axios.get(`/api/channels/${id}/search/`, { params: { q: query } });
}

export function searchBookmarks(query) {
  return axios.get('/api/member/bookmarks/search/', { params: { q: query } });
}

export function getCategory(id) {
  return axios.get(`/api/channels/category/${id}/`);
}

export function addChannel(url) {
  return axios.post('/api/member/new/', { url });
}

export function getRecommendations() {
  return axios.get('/api/channels/recommended/');
}

export function getChannel(id, page = 1) {
  return axios.get(`/api/channels/${id}/`, { params: { page } });
}

export function getLatestPodcasts(page = 1) {
  return axios.get('/api/podcasts/latest/', { params: { page } });
}

export function getPodcast(id) {
  return axios.get(`/api/podcasts/detail/${id}/`);
}

export function nowPlaying(id) {
  return axios.post(`/api/member/plays/${id}/`);
}

export function getRecentlyPlayed(page = 1) {
  return axios.get('/api/member/plays/', { params: { page } });
}

export function clearAllPlayed() {
  return axios.delete('/api/member/plays/');
}

export function getSubscriptions() {
  return axios.get('/api/member/subscriptions/');
}

export function subscribe(id) {
  return axios.post(`/api/member/subscriptions/${id}/`);
}

export function unsubscribe(id) {
  return axios.delete(`/api/member/subscriptions/${id}/`);
}

export function getBookmarks(page = 1) {
  return axios.get('/api/member/bookmarks/', { params: { page } });
}

export function addBookmark(id) {
  return axios.post(`/api/member/bookmarks/${id}/`);
}

export function deleteBookmark(id) {
  return axios.delete(`/api/member/bookmarks/${id}/`);
}

export function changeEmail(email) {
  return axios.patch(`/api/member/settings/email/`, { email });
}

export function changePassword(oldPassword, newPassword) {
  return axios.patch(`/api/member/settings/password/`, { oldPassword, newPassword });
}

export function deleteAccount() {
  return axios.delete('/api/member/settings/');
}
