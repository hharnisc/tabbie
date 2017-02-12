# Tabbie

The missing tab manager for Chrome.

Friday evening comes along and you want to save your chrome tabs from the week so you can pick em back up on Monday.

Chrome Web Store: https://chrome.google.com/webstore/detail/tabbie/aingjdeimmekeknhjcbnigfbfbboffeo

![screenshot](store/screenshot.png)

## Usage
- Use-case 1: You are leaving work on Friday and you would like to save all the tabs in this group. Click on Tabbie, populate the `New Tab Group Name`, click `Save & Close All Tabs`, go home, open different tabs, go to work on Monday, find the `Saved Tab Group` that you need, click `Open`
- Use-case 2: You are at work on Tuesday and have started to look at some docs (which may be unrealated to the tabs currently open) and you would like to save a selection of the tabs for this group. If your tabs are contiguous, click on the head tab, shift click the tail tab/or command/ctrl click for fragmented tabs, go to Tabbie, check `Only Save Selected Tabs`, and either `Save Selected Tabs` or `Save & Close Selected Tabs`

## Release Notes

**0.3.4**

- Show a tab count in tab group items
- Fixes #10

**0.3.4**

- Re-implemented with [React](https://facebook.github.io/react/)

**0.3.3**

- Preserve pinned tabs (fixes #13)

**0.3.2**

- Show invalid state on input when no value is set (fixes #8)

**0.3.1**

- Form items get focus before tab groups (fixes #7)

**0.3.0**

- Default to save all chrome tabs in the current window
- Toggle checkbox to save selected tabs
- a11y fixes (Thanks [Rahul](https://github.com/Primigenus)!)
- Display extension icon in Chrome extensions manager

## Google Analytics

Google Analytics is connected to make informed decisions about which features should be default, which features to remove and to prioritize which languages to translate. The goal here is to be 100% transparent about what is being collected and to not personally identifiable information. It's the patterns that emerge from the group that are in important, not so much the individual.

The following events are tracked in Google analytics:

**save**

Someone clicks on the "Save All Tabs" or "Save Selected Tabs" button.

value: number of tabs in the group

**saveAndClose**

Someone clicks on the "Save & Close All Tabs" or "Save & Close Selected Tabs" button.

value: number of tabs in the group

**remove**

Someone removes a tab group.

value: number of tabs in the group

**open**

Someone opens a tab group.

value: number of tabs in the group

**pageview**

Someone opens the Tabbie chrome extension

## Contributing

Pull requests welcome!
