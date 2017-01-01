# Tabbie

The missing tab manager for Chrome.

Friday evening comes along and you want to save your chrome tabs from the week so you can pick em back up on Monday.

Chrome Web Store: https://chrome.google.com/webstore/detail/tabbie/aingjdeimmekeknhjcbnigfbfbboffeo

![screenshot](store/screenshot.png)

## Release Notes

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
