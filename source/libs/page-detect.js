/* eslint-disable no-use-before-define, Allows alphabetical order */
/* eslint-disable unicorn/prefer-starts-ends-with, The tested var might not be a string */

// Drops leading and trailing slash to avoid /\/?/ everywhere
export const getCleanPathname = () =>
	location.pathname.replace(/^[/]|[/]$/g, '')

export const isDashboard = () => getCleanPathname() === 'dashboard'

export const isCustomTypeListing = () => getCleanPathname() === 'masks'

export const isCustomTypeEditPage = () =>
	getCleanPathname()
		.slice()
		.split('/', 2)[0] === 'masks'

export const isDocumentListing = () =>
	getCleanPathname() === 'documents/working'

export const isDocumentEditPage = () =>
	getCleanPathname().includes('documents~')

export const getCustomTypeName = () =>
	getCleanPathname()
		.slice()
		.split('/', 2)[1]
