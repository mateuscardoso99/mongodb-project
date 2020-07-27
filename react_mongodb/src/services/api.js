import axios from 'axios'

export const baseUrl = (path) => {
	return `http://localhost:3333${path}`
}

export const apiCreate = (path,data = {}) => {
	const url = baseUrl(path)
	return axios.post(url,data)
}

export const apiGet = (path) => {
	const url = baseUrl(path)
	return axios.get(url)
}

export const apiUpdate = (path,data = {}) => {
	const url = baseUrl(path)
	return axios.put(url,data)
}

export const apiDelete = (path) => {
	const url = baseUrl(path)
	return axios.delete(url)
}