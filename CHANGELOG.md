#### 0.2.12 (2021-07-16)
- added `editOnClick` table prop to `NeoTable`.
- fixed `v-html` overrides.

#### 0.2.11 (2021-06-30)
- added `column` and `TableRow` as additional arguments to `mutate` method.

#### 0.2.10 (2021-06-28)
- Added collapsible row. Will not be included in the documentation.

#### 0.2.6 (2021-06-27)
- fixed `freezeColumn` property not working.

#### 0.2.5 (2021-06-25)
- passed `TableRow` into confirmed as 4th argument.
- added ref tag to row checkbox.

#### 0.2.4 (2021-06-22)
- removed console logs.
- fixed `child.querySelectorAll` error

#### 0.2.2 (2021-06-21)
- moved table head into its own component.
- changed `options` column type to `select`
- added `table-head` and `table-row` slots.
- added `empty` slot and is shown when table is empty.

#### 0.2.1 (2021-06-16)
- fixed mobile responsiveness of paginator

#### 0.2.0 (2021-06-16)
- moved table row into actual row component
- couple of minor fixes
- added row mounted event.

#### 0.1.17 (2021-05-22)
- Removed freeze indicator when freeze is triggered.

#### 0.1.17 (2021-05-22)
- Fixed switch not working.

#### 0.1.16 (2021-05-22)
- `key` column property no longer required.
- `hideFreezeButton` column property changed to `disableFreezing`
- `multipleRows` changed to `allowMultipleRowSelection`
- `enableSearch` default to `false`
- `enableDataFilter` default to `false`
- `enableDataSorting` default to `false`
- `enableDataPagination` default to `false`
- added `@mounted` event hook
- added `before-table` slot
- column options placed on the right side of the column header
- enhanced column options hovering experience