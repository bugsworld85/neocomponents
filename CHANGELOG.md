#### 0.2.2 (2021-06-19)
- moved table head into its own component.


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