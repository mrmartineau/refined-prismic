<div align="center">
  <h1>
		<img src="source/icon.png" />
		<br>
		Refined Prismic
	</h1>

</div>

#### Browser extension that simplifies the Prismic.io interface and adds useful features

[link-cws]: https://chrome.google.com/webstore/detail/refined-prismic/hlepfoohegkhhmjieoechaddaejaokhf 'Version published on Chrome Web Store'
[link-amo]: https://addons.mozilla.org/en-US/firefox/addon/refined-prismicp/ 'Version published on Mozilla Add-ons'

We use Prismic a lot and notice many annoyances we'd like to fix. So here be dragons.

## Existing features and fixes

- <kbd>UI</kbd> increased label size on the content edit page
- <kbd>UI</kbd> increased contrast for icons in left navigation
- <kbd>UI</kbd> reduced sidebar width on the content edit page on thinner viewports
- <kbd>UI</kbd> reduced padding within for items on the content edit page
- <kbd>UI</kbd> increased button hit-target for rich-text features on content edit page
- <kbd>UI</kbd> increased height for new/empty rich-text fields on the content edit page
- <kbd>JS</kbd> collapsible slice areas on content edit page. Basic version implemented. Disable this feature using this string: `collapse-slices`

## Upcoming features and fixes

- <kbd>UI</kbd> larger keys for inputs within custom types interface so that devs can copy the name more easily
- <kbd>UI</kbd> always show labels in repo navigation

## Install

Clone this repo, install dependencies and run `yarn build`

## Customization

We're happy to receive suggestions and contributions, but be aware this is a highly opinionated project. There's a very high bar for adding options. Users will always disagree with something. That being said, we're open to discussing things. If something doesn't make the cut, you can [build your customized Refined Prismic locally](https://prismic.com/mrmartineau/refined-prismic/blob/master/contributing.md#workflow), rather than installing it from the Chrome Store.

## Contribute

See the [contribution guide](contributing.md) and join the [contributors](https://github.com/mrmartineau/refined-prismic/graphs/contributors)!

## License

MIT

### Prior art

The source code for this Chrome extension was forked from the fantastic [Refined Github](https://github.com/sindresorhus/refined-github) Chrome/Firefox extension.
