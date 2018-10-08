import { h } from 'dom-chef'
import select from 'select-dom'
// import domify from '../libs/domify'
// import observeEl from '../libs/simplified-element-observer'
import { isDocumentEditPage } from '../libs/page-detect'

export default () => {
	if (!isDocumentEditPage) {
		return
	}

	const collapseMarkup = (title, html) => {
		return `
			<details class="slice">
				<summary class="slice-summary">${title}</summary>
				${html}
			</details>
		`
	}

	const slices = select.all('.widget-Slices .block.visible')
	slices.forEach(item => {
		// const title = select('.blockDef span:first-child', item).innerText
		const element = select('.widget-Slice', item)
		const html = element.innerHTML
		element.innerHTML = collapseMarkup('Toggle slice visibility', html)
	})
}
