import 'webext-dynamic-content-scripts'
// import { h } from 'dom-chef'
import select from 'select-dom'
import domLoaded from 'dom-loaded'

// import markUnread from './features/mark-unread'
// import addOpenAllNotificationsButton from './features/open-all-notifications'
// import openAllSelected from './features/open-all-selected'
// import addUploadBtn from './features/upload-button'
// import enableCopyOnY from './features/copy-on-y'
// import addReactionParticipants from './features/reactions-avatars'
// import showRealNames from './features/show-names'
// import addCopyFilePathToPRs from './features/copy-file-path'
// import addPrevNextButtonsToPRs from './features/prev-next-commit-buttons'
// import addFileCopyButton from './features/copy-file'
// // - import copyMarkdown from './features/copy-markdown';
// import linkifyCode from './features/linkify-urls-in-code'
// import autoLoadMoreNews from './features/auto-load-more-news'
// import addOPLabels from './features/op-labels'
// import addMoreDropdown from './features/more-dropdown'
// import addReleasesTab from './features/add-releases-tab'
// import addGistsLink from './features/add-gists-link-to-profile'
// import addTimeMachineLinksToComments from './features/add-time-machine-links-to-comments'
// import removeUploadFilesButton from './features/remove-upload-files-button'
// import scrollToTopOnCollapse from './features/scroll-to-top-on-collapse'
// import removeDiffSigns from './features/remove-diff-signs'
// import linkifyBranchRefs from './features/linkify-branch-refs'
// import hideEmptyMeta from './features/hide-empty-meta'
// import hideInactiveDeployments from './features/hide-inactive-deployments'
// import hideOwnStars from './features/hide-own-stars'
// import moveMarketplaceLinkToProfileDropdown from './features/move-marketplace-link-to-profile-dropdown'
// import addTrendingMenuItem from './features/add-trending-menu-item'
// import addProfileHotkey from './features/add-profile-hotkey'
// import addYoursMenuItem from './features/add-yours-menu-item'
// import addCommentedMenuItem from './features/add-commented-menu-item'
// import addToggleFilesButton from './features/add-toggle-files-button'
// import hideReadmeHeader from './features/hide-readme-header'
// import addBranchButtons from './features/add-branch-buttons'
// import addDeleteForkLink from './features/add-delete-fork-link'
// import linkifyIssuesInTitles from './features/linkify-issues-in-titles'
// import addPatchDiffLinks from './features/add-patch-diff-links'
// import markMergeCommitsInList from './features/mark-merge-commits-in-list'
// import showRecentlyPushedBranches from './features/show-recently-pushed-branches'
// import addDiffViewWithoutWhitespaceOption from './features/add-diff-view-without-whitespace-option'
// import preserveWhitespaceOptionInNav from './features/preserve-whitespace-option-in-nav'
// import addMilestoneNavigation from './features/add-milestone-navigation'
// import addFilterCommentsByYou from './features/add-filter-comments-by-you'
// import removeProjectsTab from './features/remove-projects-tab'
// import fixSquashAndMergeTitle from './features/fix-squash-and-merge-title'
// import fixSquashAndMergeMessage from './features/fix-squash-and-merge-message'
// import addTitleToEmojis from './features/add-title-to-emojis'
// import sortMilestonesByClosestDueDate from './features/sort-milestones-by-closest-due-date'
// import openCIDetailsInNewTab from './features/open-ci-details-in-new-tab'
// import focusConfirmationButtons from './features/focus-confirmation-buttons'
// import addKeyboardShortcutsToCommentFields from './features/add-keyboard-shortcuts-to-comment-fields'
// import addCreateReleaseShortcut from './features/add-create-release-shortcut'
// import addConfirmationToCommentCancellation from './features/add-confirmation-to-comment-cancellation'
// import addCILink from './features/add-ci-link'
// import embedGistInline from './features/embed-gist-inline'
// import extendStatusLabels from './features/extend-status-labels'
// import highlightClosingPrsInOpenIssues from './features/highlight-closing-prs-in-open-issues'
// import toggleAllThingsWithAlt from './features/toggle-all-things-with-alt'
// import addJumpToBottomLink from './features/add-jump-to-bottom-link'
// import addQuickReviewButtons from './features/add-quick-review-buttons'
// import extendDiffExpander from './features/extend-diff-expander'
// import sortIssuesByUpdateTime from './features/sort-issues-by-update-time'
// import makeDiscussionSidebarSticky from './features/make-discussion-sidebar-sticky'
// import shortenLinks from './features/shorten-links'
// import waitForBuild from './features/wait-for-build'
// import addDownloadFolderButton from './features/add-download-folder-button'
// import hideUselessNewsfeedEvents from './features/hide-useless-newsfeed-events'
// import closeOutOfViewModals from './features/close-out-of-view-modals'
// import monospaceTextareas from './features/monospace-textareas'
// import improveShortcutHelp from './features/improve-shortcut-help'
// import hideNavigationHoverHighlight from './features/hide-navigation-hover-highlight'
// import displayIssueSuggestions from './features/display-issue-suggestions'
// import addPullRequestHotkey from './features/add-pull-request-hotkey'
// import openSelectionInNewTab from './features/add-selection-in-new-tab'
// import addSwapBranchesOnCompare from './features/add-swap-branches-on-compare'
// import showFollowersYouKnow from './features/show-followers-you-know'
// import hideCommentsFaster from './features/hide-comments-faster'
// import linkifyCommitSha from './features/linkify-commit-sha'
// import hideIssueListAutocomplete from './features/hide-issue-list-autocomplete'

import * as pageDetect from './libs/page-detect'
import { safeElementReady, injectCustomCSS } from './libs/utils'
import observeEl from './libs/simplified-element-observer'

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
	console.log('Refined Prismic	')
	await Promise.resolve()
}

init()