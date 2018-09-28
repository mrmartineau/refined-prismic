import { h } from 'dom-chef'
import select from 'select-dom'
import onetime from 'onetime'
import domLoaded from 'dom-loaded'
import elementReady from 'element-ready'
import OptionsSync from 'webext-options-sync'
import ghInjection from 'github-injection'

const options = new OptionsSync().getAll()

/**
 * Enable toggling each feature via options.
 * Prevent fn's errors from blocking the remaining tasks.
 * https://github.com/sindresorhus/refined-github/issues/678
 */
export const enableFeature = async fn => {
	const { disabledFeatures = '', logging = false } = await options
	const log = logging ? console.log : () => {}

	const filename = fn.name.replace(/_/g, '-')
	if (/^$|^anonymous$/.test(filename)) {
		console.warn('This feature is nameless', fn)
	} else if (disabledFeatures.includes(filename)) {
		log('↩️', 'Skipping', filename)
		return
	}
	try {
		await fn()
		log('✅', filename)
	} catch (err) {
		console.log('❌', filename)
		console.error(err)
	}
}

export const isFeatureEnabled = async featureName => {
	const { disabledFeatures = '' } = await options
	return disabledFeatures.includes(featureName)
}

/**
 * Automatically stops checking for an element to appear once the DOM is ready.
 */
export const safeElementReady = selector => {
	const waiting = elementReady(selector)

	// Don't check ad-infinitum
	domLoaded.then(() => requestAnimationFrame(() => waiting.cancel()))

	// If cancelled, return null like a regular select() would
	return waiting.catch(() => null)
}

export const injectCustomCSS = async () => {
	const { customCSS = '' } = await options

	if (customCSS.length > 0) {
		document.head.append(<style>{customCSS}</style>)
	}
}
