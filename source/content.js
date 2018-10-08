import 'webext-dynamic-content-scripts'
// import { h } from 'dom-chef'
import select from 'select-dom'
import domLoaded from 'dom-loaded'

import collapseSlices from './features/collapse-slices'

// import * as pageDetect from './libs/page-detect'
import { safeElementReady, injectCustomCSS, enableFeature } from './libs/utils'
// import observeEl from './libs/simplified-element-observer'

// Add globals for easier debugging
window.select = select

async function init() {
	await safeElementReady('body')

	// if (pageDetect.is404() || pageDetect.is500()) {
	// 	return
	// }

	if (document.body.classList.contains('logged-out')) {
		console.warn(
			'%cRefined Prismic%c only works when you’re logged in to Prismic.',
			'font-weight: bold',
			''
		)
		return
	}

	if (select.exists('html.refined-prismic')) {
		console.warn(
			'Refined Prismic has been loaded twice. If you didn’t install the developer version, this may be a bug. Please report it to: https://github.com/mrmartineau/refined-prismic/issues/565'
		)
		return
	}

	document.documentElement.classList.add('refined-prismic')

	injectCustomCSS()

	await domLoaded
	onDomReady()
}

async function onDomReady() {
	console.log('✌️ Refined Prismic')

	await Promise.resolve()

	window.addEventListener('load', function() {
		enableFeature(collapseSlices)
		console.log('All assets are loaded')
	})
}

init()
