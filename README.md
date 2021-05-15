# Neo VueJS Components

Pre built VueJS components to make developer's life easier.

## Available Components!

  - NeoTable - with first row and multiple column freezing.
  - NeoWindow - movable, drag and drop window component.
  - NeoPaginator - pagination component.


Upcoming components:
  - NeoSwitch - checkbox in a form of a switch.
  - NeoFloater - an element that is draggable across the screen.

### Pre-Requisite

* [VueJS 2.x](https://vuejs.org/) - core frontend framework.

### Dependencies
* [Lodash](https://lodash.com/) - A modern JavaScript utility library delivering modularity, performance & extras.
* [MomentJS](https://momentjs.com/) - Parse, validate, manipulate, and display dates and times in JavaScript.

### Dev-Dependencies
* [Vue-CLI](https://cli.vuejs.org/)
* [Vue-CLI-Service](https://cli.vuejs.org/guide/cli-service.html)
* [Vue-CLI Service Global](https://www.npmjs.com/package/@vue/cli-service-global)
* [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
* [FontAwesome 4.7](https://fontawesome.com/v4.7.0/icons/)

Install global or within package, its up to you.

### Installation

NeoComponents requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install --save @bugsworld85/neocomponents
```
Include into your component.
```javascript
import { NeoTable, NeoWindow, NeoPaginator } from "neomart"
```


# Components
## NeoTable
Dynamic table component
```html
<neo-table
    :data="data"
    :columns="columns"
></neo-table>
```
```javascript
import moment from "moment";

export default {
    data() {
        return {
            data: [], // array of object data
            columns: [
                {
                    key: "id",
                    title: "ID",
                    freeze: true
                },
                {
                    key: "sku",
                    title: "SKU",
                    searchable: true,
                    sortable: true,
                    freeze: true
                },
                {
                    key: "name",
                    title: "Name",
                    searchable: true,
                    sortable: true
                },
                {
                    key: "created_at",
                    title: "Date Created",
                    sortable: true,
                    mutate: (value) => {
                        return moment(value).format("DD-MM-YYYY");
                    },
                },
                {
                    key: "actions",
                    type: "actions",
                    textAlign: "right",
                    width: 10,
                    actions: [
                        Vue.component("view-product", {
                            template: `<a class="btn" :href="link"><i class="fa fa-edit"></i></a>`,
                            props: ["column", "row"],
                            computed: {
                                link() {
                                    return `https://test.com/product/${this.row.id}`;
                                },
                            },
                        }),
                    ],
                },
            ],
        }
    }
}
```
#### Component Properties

Name | Type | Default | Description
------- | ---------------- | ---------- | ---------
`columns` |  `Array` | `[]` | Define column properties, cell value mutation or event callbacks.
`data` |  `Array` | `[]` | Data to be inserted into the table.
`emptyMessage` |  `String` | `"No data available"` | Message to display if data is empty.
`enableSearch` |  `Boolean` | `true` | Enable and display search field. Searches from given `data` only.
`exludeColumns` |  `Array` | `[]` | Exclude properties from given `data`.
`freezeColumn` |  `Integer` | `0` | Freeze number of columns starting from first column with index `0`.
`isAsc` |  `Boolean` | `true` | Sort direction. Ascending if `true`, descending if `false`
`limit` |  `Integer` | `15` | Number of data to be displayed in each pagination.
`loadingMessage` |  `String` | `"Loading..."` | Message to display when `data` is being loaded.
`maxHeight` |  `Integer` | `null` | The maximum height of the table. Screen height by default.
`multipleRows` |  `Boolean` | `true` | Enable multiple row selection.
`page` |  `Integer` | `1` | Page to display if `showAll` is `false` and pagination is present.
`placeholder` |  `String` | `"Search for..."` | Placeholder text on search input field.
`searchedKeyword` |  `String` | `null` | The search keyword string.
`enableDataFilter` |  `Boolean` | `true` | Enable or disable built-in data filtration. Useful if you are just passing data and does the filtration manually.
`enableDataSorting` |  `Boolean` | `true` | Enable or disable built-in data table sorting. Useful if you are sorting data manually.
`enableDataPagination` |  `Boolean` | `true` | Enable or disable built-in data pagination. Useful if you are paginating data manually.
`sortedColumn` |  `String` | `null` | The column to be sorted accordingly.
`totalTableRows` |  `Integer` | `0` | The length of data.

#### Component Events
Event | Accepts | Description
------- | ---------------- | ---------
`@onSearchInput` |  `event, NeoTable` | Listen to search input typing.
`@onClearSearch` |  | Triggered when you clear search.
`@paginationClick` | `event, pageNumber, { keyword, sortedColumn, asc }, NeoTable` | Triggered when you click on pagination buttons. Must return new page value.
`@onRowSelect` | `isChecked, row, index, data, event` | Fired when you selected a row via checkbox. Only when `multipleRows` is `true`. `data` contains all checked items.
`@onCheckAll` | `isChecked, data, event` | Fired when you check column header checkbox. Only when `multipleRows` is `true`.
`@sortClick` | `sortColumnKey, isAsc` | Fired when you click on column header title.
`@overrideSort` | `a, b, sortColumnKey` | Overrides how data is being sort. Must return `1`, `-1`, `0`.
`@rowClick` | `row` | Listen to row click.

#### Column Properties
Property | Type | Default | Required | Description
------- | ---------------- | ----------|- | ---------
`key` |  `String` | `null` | yes | Define column properties, cell value mutation or event callbacks.
`title` |  `String` | `null` | yes | Title of the column.
`searchable` |  `Boolean` | `false` | no | Includes the column from data searching.
`sortable` |  `Boolean` | `false` | no | Determines if the column is sortable.
`freeze` |  `Boolean` | `false` | no | Determines whether to freeze the column initially.
`textAlign` |  `String` | `left` | no | `left`, `center`, `right`
`width` |  `Integer` | `null` | no | Width of the column.
`mutate` |  `Function` | `null` | no | Callback function to mutate or alter column data value. Accepts 2 parameters which is the cell value and the `row` data.
`message` |  `String` | `null` | no | Message to display when column `prompt` type has been triggered.
`confirm` |  `Function` | `null` | no | Callback function after confirming the `prompt` input.
`type` |  `String` | `"string"` | no | `string`, `text`, `number`, `switch`, `checkbox`, `actions`, `template`, `options`, `prompt`, `divider`. Definition of each type is described below.
`hideFreezeButton` |  `Boolean` | `"false"` | no | Hide's the freeze button from the table header.

#### Column Types
Type | Description
------- | ---------
`string` | Regular string.
`text` | Input of type `text`.
`number` | Input of type `number`.
`switch` | Checkbox displayed as a switch.
`checkbox` | Input of type `checkbox`.
`actions` | Array of `Vue` components. Can be buttons.
`template` | A single `Vue` component. Can be anything you want to display within the column.
`options` | `select` dropdown options. Accepts `Array` of `{ text, value }` objects.
`prompt` | Opens browser input prompt.
`divider` | A simple divider column.

#### Slots
Name | Description
------- | ---------
`search` | Replaces table search component.
`filter` | Add additional components right next to table search field.
`paginate` | Replaces the pagination data in the footer.

### Todos

 - Write documentation on NeoWindow
 - Write documentation on NeoPaginator
 - Create and write NeoSwitch component and documentation
 - Include `textarea` in column types.
 - Add lazy loading capabilities.
 - Add slots to NeoTable.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

License
----

MIT © [Jovanni G](https://github.com/bugsworld85)
