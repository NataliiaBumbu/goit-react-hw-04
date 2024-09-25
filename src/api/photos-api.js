import axios from 'axios';
const API_KEY = '45125188-29656ded7c12a384255e46c86';
const API_URL = 'https://pixabay.com/api/?';
export default class PostsApiService {
	constructor() {
	  this.searchQuery = '';
	  this.page = 1;
	}
	async fetchPost() {
	  const OPTIONS = new URLSearchParams({
		key: API_KEY,
		q: this.searchQuery,
		image_type: 'photo',
		orientation: 'horizontal',
		safesearch: true,
		page: this.page,
		per_page: 12,
	  });
	  const response = await axios.get(`${API_URL}?${OPTIONS.toString()}`);
	  this.incrementPage();
	  return response.data;
	}
	get query() {
	  return this.searchQuery;
	}
  
	set query(newQuery) {
	  this.searchQuery = newQuery;
	}
	incrementPage() {
	  this.page += 1;
	}
	resetPage() {
	  this.page = 1;
	}
  }