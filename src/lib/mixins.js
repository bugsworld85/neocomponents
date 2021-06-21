module.exports = [
    {
        methods: {
            isString(variable) {
                return typeof variable === "string";
            },
            isset(variable) {
                return typeof variable !== "undefined" && variable !== null;
            },
            isObject(variable) {
                return (
                    variable instanceof Object &&
                    variable.constructor === Object
                );
            },
            moneyFormat(value = 0) {
                var formatter = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "Php",
                });

                return formatter.format(value);
            },
            numberFormat(value = 0) {
                return new Intl.NumberFormat().format(value);
            },
            search(value, keyword) {
                if (this.isset(value)) {
                    return (
                        value
                            .toLowerCase()
                            .search(
                                keyword.replace(/\\|\//g, "").toLowerCase()
                            ) > -1
                    );
                }
                return value;
            },
            isSearchable(column) {
                return this.isset(column.searchable) && column.searchable;
            },
            isMutate(column) {
                return this.isset(column.mutate);
            },
            isSortable(column) {
                return this.isset(column.sortable) && column.sortable;
            },
            columnToKey(column) {
                return column.toLowerCase().replace(/[^a-zA-Z0-9/-]/, "_");
            },
            getWidth(column) {
                return this.isset(column.width) ? column.width : false;
            },
            getType(column) {
                var allowed = [
                    "string",
                    "text",
                    "number",
                    "switch",
                    // "textarea",
                    "checkbox",
                    "actions",
                    "template",
                    "options",
                    "prompt",
                    "divider",
                    "columns",
                ];

                if (!this.isString(column)) {
                    if (typeof column.type !== "undefined") {
                        if (allowed.includes(column.type)) {
                            return column.type;
                        }
                    }
                }
                return "string";
            },
            getKey(column) {
                return this.isString(column)
                    ? this.columnToKey(column)
                    : column.key;
            },
            getTitle(column) {
                if (this.isString(column)) {
                    return column.charAt(0).toUpperCase() + column.slice(1)
                }
                return this.isset(column.title) ? column.title : "";
            },
            isAscending(column, currentColumn, asc) {
                return currentColumn === this.getKey(column) && asc;
            },
            isFroze(column) {
                return this.isset(column.freeze) && column.freeze
                    ? column.freeze
                    : false;
            },
        },
    },
];