import isomorphicFetch from 'isomorphic-fetch'
import utils from '../common/utils'

const GET_OPTION = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		'auth': 'true'
	},
	credentials: 'same-origin'
}

let plat = utils.platId()

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response
	} else {
		var error = new Error(response.statusText)
		error.response = response
		throw error
	}
}

function fetch(url, option) {
	let start = new Date()
	return isomorphicFetch(url, option).then(response => {
		if(window.WebWatcher) {
			WebWatcher.timeLog({
				type: 'ajax',
				duration: new Date() - start,
				status: response.status,
				url:url
			})
		}
		return response
	})
}
const {baseUrl,isProd,isQA} = require('../../env_config.js')
let baseurl = baseUrl;
let isprod = isProd;
let isqa = isQA;
let orderlistLab = '771ac401-adf1-4646-8e0b-c1c61431b80e'

if (isprod || isqa) {
	orderlistLab = 'e543bd95-e3ba-44a6-8136-8b0178af9a15'
}
