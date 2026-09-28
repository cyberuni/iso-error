import type { rpc } from './index.js'

describe('rpc.Status', () => {
	it('can specify specific detail types', () => {
		const json = {
			code: 200,
			status: 'OK',
			message: 'msg',
			details: [
				{
					'@type': 'type.googleapis.com/google.rpc.RetryInfo',
					retry_delay: { seconds: 0, nanos: 0 }
				},
				{
					'@type': 'type.googleapis.com/google.rpc.DebugInfo',
					stack_entries: [],
					detail: ''
				},
				{
					'@type': 'custom',
					description: 'some description'
				}
			]
		}

		json satisfies rpc.Status
	})
})

describe('rpc.CauseInfo', () => {
	it('requires message but causes is optional', () => {
		;({
			'@type': 'google-cloud-api/CauseInfo',
			message: ''
		}) satisfies rpc.CauseInfo
	})
	it('accepts an array of causes', () => {
		// eventthough `error-cause` turns out to be singular,
		// making `causes` singular creates inconsistent data structure.

		;({
			'@type': 'google-cloud-api/CauseInfo',
			message: '',
			causes: []
		}) satisfies rpc.CauseInfo
	})
	it('accepts nested causes', () => {
		;({
			'@type': 'google-cloud-api/CauseInfo',
			message: '',
			causes: [
				{
					message: '',
					causes: [{ message: '' }]
				}
			]
		}) satisfies rpc.CauseInfo
	})
	it('can contain module', () => {
		;({
			'@type': 'google-cloud-api/CauseInfo',
			message: '',
			causes: [
				{
					module: 'some_module',
					message: '',
					causes: [{ message: '' }]
				}
			]
		}) satisfies rpc.CauseInfo
	})
})
