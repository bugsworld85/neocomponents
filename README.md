# Neo VueJS Components

Pre built VueJS components to make developer's life easier.

## Available Components!

  - NeoTable - with first row and multiple column freezing.
  - NeoWindow - movable, drag and drop window component.
  - NeoPaginator - pagination component.


Upcoming components:
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
import { NeoTable, NeoWindow, NeoPaginator } from "@bugsworld85/neocomponents"
```
### Component Testing
```sh
$ npm run serve
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
import { NeoTable } from "@bugsworld85/neocomponents";
import moment from "moment";

export default {
    components: {
        NeoTable
    },
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
                    freeze: true, // freezed initially
                    type: 'template',
                    template: Vue.components("your-component", {
                        template: `<span>${row.sku}</span>`,
                        props: ["row", "column", "index"],
                    }),
                    // ---- OR ----
                    // template: YourComponent
                },
                {
                    key: "name",
                    title: "Name",
                    searchable: true,
                    sortable: true,
                    type: 'text' // double click to edit
                    // available events
                    change(e, row, column) {},
                    keydown(e, row, column) {},
                    keyup(e, row, column) {},
                    input(e, row, column) {},
                    blur(e, row, column) {},
                    doubleClick(e, row, column) {},
                },
                {
                    key: "qty",
                    title: "Quantity",
                    searchable: true,
                    sortable: true,
                    type: 'number' // double click to edit
                    disableFreezing: true // do not show freeze button in this column
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
`enableSearch` |  `Boolean` | `false` | Enable and display search field. Searches from given `data` only.
`exludeColumns` |  `Array` | `[]` | Exclude properties from given `data`.
`freezeColumn` |  `Integer` | `0` | Freeze number of columns starting from first column with index `0`.
`isAsc` |  `Boolean` | `true` | Sort direction. Ascending if `true`, descending if `false`
`limit` |  `Integer` | `15` | Number of data to be displayed in each pagination.
`loadingMessage` |  `String` | `"Loading..."` | Message to display when `data` is being loaded.
`maxHeight` |  `Integer` | `null` | The maximum height of the table. Screen height by default.
`allowMultipleRowSelection` |  `Boolean` | `true` | Enable multiple row selection.
`page` |  `Integer` | `1` | @deprecated Page to display if `showAll` is `false` and pagination is present.
`placeholder` |  `String` | `"Search for..."` | Placeholder text on search input field.
`searchedKeyword` |  `String` | `null` | The search keyword string.
`enableDataFilter` |  `Boolean` | `false` | @deprecated Enable or disable built-in data filtration. Useful if you are just passing data and does the filtration manually.
`enableDataSorting` |  `Boolean` | `false` | @deprecated Enable or disable built-in data table sorting. Useful if you are sorting data manually.
`enableDataPagination` |  `Boolean` | `false` | @deprecated Enable or disable built-in data pagination. Useful if you are paginating data manually.
`sortedColumn` |  `String` | `null` | The sorted column.
`totalTableRows` |  `Integer` | `0` | The length of data.

#### Component Events
Event | Accepts | Description
------- | ---------------- | ---------
`@onRowSelect` | `isChecked, row, index, data, event` | Fired when you selected a row via checkbox. Only when `allowMultipleRowSelection` is `true`. `data` contains all checked items.
`@onCheckAll` | `isChecked, data, event` | Fired when you check column header checkbox. Only when `allowMultipleRowSelection` is `true`.
`@sortClick` | `sortColumnKey, isAsc` | Fired when you click on column header title.
`@rowClick` | `row` | Listen to row click.
`@mounted` | `NeoTable` | Hook when NeoTable is mounted.
`@rowMounted` | `row` | Hook when table row is mounted.

#### Column Properties
Property | Type | Default | Required | Description
------- | ---------------- | ----------|- | ---------
`key` |  `String` | `null` | yes | Serves as the column identifier and can be any property of an object from the data and will render the value of that property instantly. But you can use any column identifier and use along side `mutate`.
`title` |  `String` | `null` | no | Title of the column. Can be empty string.
`searchable` |  `Boolean` | `false` | no | Includes the column from data searching.
`sortable` |  `Boolean` | `false` | no | Determines if the column is sortable.
`freeze` |  `Boolean` | `false` | no | Determines whether to freeze the column initially.
`textAlign` |  `String` | `left` | no | `left`, `center`, `right`
`width` |  `Integer` | `null` | no | Width of the column.
`message` |  `String` | `null` | no | Message to display when column `prompt` type has been triggered.
`type` |  `String` | `"string"` | no | `string`, `text`, `number`, `switch`, `checkbox`, `actions`, `template`, `options`, `prompt`, `divider`, `columns`. Definition of each type is described below.
`disableFreezing` |  `Boolean` | `false` | no | Hide's the freeze button from the table header.
`options` |  `Array` | `[]` | no | Options for `select` column type. Accepts `Array` of `{ value: text }` object.

#### Column Methods
Property | Type | Default | Accepts  | Required | Description
------- | ---------------- | ------- | ---------- | - | ---------
`mutate` |  `Function` | `null` | `value`, `row` | no | Callback function to mutate or alter column data value. Accepts 2 parameters which is the cell value and the `row` data. Must return desired output.
`confirm` |  `Function` | `null` | `value` | no | Callback function after confirming the `prompt` input.

#### Column Available Events (`text` and `number` column types only)
Property | Type | Accepts  | Description
------- | ---------------- | ---------- | ---------
`change` |  `Function` | `e`, `value`, `row` | `change` event of a `text`, `number`, `checkbox`, `select` input elements.
`keydown` |  `Function` | `e`, `value`, `row` | `keydown` event of a `text`, `number` input elements.
`keyup` |  `Function` | `e`, `value`, `row` | `keyup` event of a `text`, `number` input elements.
`input` |  `Function` | `e`, `value`, `row` | `input` event of a `text`, `number` input elements.
`blur` |  `Function` | `e`, `value`, `row` | `blur` event of a `text`, `number` input elements.
`doubleClick` |  `Function` | `e`, `value`, `row` | `doubleClick` event of a `text`, `number` input elements.

#### Column Types
Type | Description
------- | ---------
`string` | Regular string. No events attached.
`text` | Input of type `text`. Double click to edit.
`number` | Input of type `number`. Double click to edit.
`switch` | Checkbox displayed as a switch. Capture input value via `change` column method.
`checkbox` | Input of type `checkbox`. Capture input value via `change` column method.
`select` | `select` dropdown options. `options` property is required when using this type.
`prompt` | Opens browser input prompt. Capture input value via `confirm` column method.
`actions` | Array of `Vue` components and can be anything you want.
`template` | A single `Vue` component. Can be anything you want to display within the column and handle column cell events independently from `NeoTable`.
`divider` | A simple column divider. Does not require `key` column property.

##### Coming Soon!
Type | Description
------- | ---------
`columns` | Sub columns. Array of columns. `key` and `title` properties are required. `key` should match object property from your data array.

#### Slots
Name | Description
------- | ---------
`search` | Replaces table search component.
`filter` | Add additional components right next to table search field.
`before-table` | Add additional components before table.
`paginate` | Replaces the pagination data in the footer.
`loading` | Replaces the loading section.
`empty` | Displays when table is empty.
`table-head` | Replace the table header (`thead`) with your your custom component.
`table-row` | Replace the table row (`tr`) with your your custom component.

### Todos
 - Write documentation on NeoWindow
 - Write documentation on NeoPaginator
 - Include `textarea` in column types.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

License
----

MIT © [Jovanni G](https://github.com/bugsworld85)
