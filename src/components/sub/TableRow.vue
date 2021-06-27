<template>
    <tr @click="handleRowClick(row, index)" ref="tr">
        <td
            v-if="allowMultipleRowSelection"
            :class="{
                freeze: freezeColumn === 0,
            }"
            column-key="checkbox"
        >
            <div class="custom-control custom-checkbox">
                <input
                    type="checkbox"
                    class="custom-control-input"
                    ref="rowCheckbox"
                    :id="`row-${index}-col-select`"
                    v-model="isChecked"
                    @change="handleRowCheck($event, row, index)"
                />
                <label
                    class="custom-control-label"
                    :for="`row-${index}-col-select`"
                ></label>
            </div>
        </td>
        <td
            v-for="(column, colIndex) in columns"
            :key="`row-${index}-col-${colIndex}`"
            :style="`text-align: ${textAlign(column)}`"
            :class="{
                'is-divider': getType(column) === 'divider',
                freeze: isFroze(column),
            }"
            :column-key="getKey(column)"
        >
            <input
                type="text"
                v-model="row[getKey(column)]"
                v-if="getType(column) === 'text'"
                readonly="readonly"
                @dblclick="handleInputDoubleClick($event, column, row)"
                @blur="handleInputBlur($event, column, row)"
                @keyup="handleInputKeyup($event, column, row)"
                @keydown="handleInputKeydown($event, column, row)"
                @change="handleInputChange($event, column, row)"
                @input="handleInput($event, column, row)"
            />
            <!-- <textarea
                rows="1"
                class="form-control"
                v-model="row[getKey(column)]"
                v-else-if="getType(column) === 'textarea'"
                readonly="readonly"
                @dblclick="handleInputDoubleClick($event, column, row)"
                @blur="handleInputBlur($event, column, row)"
                @keyup="handleInputKeyup($event, column, row)"
                @keydown="handleInputKeydown($event, column, row)"
                @change="handleInputChange($event, column, row)"
                @input="handleInput($event, column, row)"
            ></textarea> -->
            <input
                size="5"
                type="number"
                v-model.number="row[getKey(column)]"
                v-else-if="getType(column) === 'number'"
                readonly="readonly"
                @dblclick="handleInputDoubleClick($event, column, row)"
                @blur="handleInputBlur($event, column, row)"
                @keyup="handleInputKeyup($event, column, row)"
                @keydown="handleInputKeydown($event, column, row)"
                @change="handleInputChange($event, column, row)"
                @input="handleInput($event, column, row)"
            />
            <div
                class="custom-control custom-switch"
                v-else-if="getType(column) === 'switch'"
            >
                <input
                    type="checkbox"
                    class="custom-control-input"
                    :value="`${getKey(column)}`"
                    v-model="row[getKey(column)]"
                    :id="`row-${index}-col-${colIndex}-${getKey(column)}`"
                    @change="handleInputChange($event, column, row)"
                />
                <label
                    class="custom-control-label"
                    :for="`row-${index}-col-${colIndex}-${getKey(column)}`"
                ></label>
            </div>
            <div v-else-if="getType(column) === 'select'">
                <select
                    class="form-control"
                    @change="handleSelectChange($event, row, column)"
                    v-if="isset(column.options)"
                >
                    <option
                        v-for="option in column.options"
                        :key="`option-${index}-${option.value}`"
                        :value="option.value"
                        :selected="option.value === row[getKey(column)]"
                    >
                        {{ option.text }}
                    </option>
                </select>
            </div>
            <div v-else-if="getType(column) === 'actions'" class="flex">
                <component
                    v-for="(action, i) in column.actions"
                    :key="`action-${index}-${colIndex}-${i}`"
                    :is="action"
                    :column="column"
                    :row="row"
                    :index="i"
                    :parent="row"
                ></component>
            </div>
            <component
                v-else-if="getType(column) === 'template'"
                :is="column.template"
                :column="column"
                :row="row"
                :value="row[getKey(column)]"
                :index="index"
                :parent="row"
            ></component>
            <span
                class="text-only clickable d-block"
                role="button"
                v-else-if="getType(column) === 'prompt'"
                @click="handleClick($event, column, row)"
            >
                {{
                    isset(column.mutate)
                        ? column.mutate(row[getKey(column)], row)
                        : row[getKey(column)]
                }}
            </span>
            <span
                class="text-only"
                v-else-if="isSearchable(column)"
                v-html="
                    $options.filters.highlight(
                        isset(column.mutate)
                            ? column.mutate(row[getKey(column)], row)
                            : row[getKey(column)],
                        keyword,
                        $options._scopeId
                    )
                "
            >
                {{
                    isset(column.mutate)
                        ? column.mutate(row[getKey(column)], row)
                        : row[getKey(column)]
                }}
            </span>
            <span class="text-only" v-else-if="getType(column) !== 'divider'">
                {{
                    isset(column.mutate)
                        ? column.mutate(row[getKey(column)], row)
                        : row[getKey(column)]
                }}
            </span>
        </td>
    </tr>
</template>

<script>
import mixins from "../../lib/mixins.js";
import filters from "../../lib/filters.js";

if (typeof _ === "undefined" || _ === null) {
    window._ = require("lodash");
}

export default {
    name: "table-row",
    mixins,
    filters,
    props: {
        row: {
            type: Object,
            default: () => {
                return {
                    check: false,
                };
            },
        },
        index: {
            type: Number,
            default: 0,
        },
        allowMultipleRowSelection: {
            type: Boolean,
            default: false,
        },
        freezeColumn: {
            type: Number,
            default: -1,
        },
        columns: {
            type: Array,
            default: () => [],
        },
        keyword: {
            type: String,
            default: "",
        },
        checked: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            oldInputValue: null,
        };
    },
    computed: {
        isChecked: {
            get() {
                return this.checked;
            },
            set(value) {
                this.row.checked = value;
            },
        },
    },
    updated() {
        this.$emit("updated", this.row, this.index, this);
    },
    mounted() {
        this.$emit("mounted", this.row, this.index, this);
    },
    methods: {
        handleSelectChange: _.debounce(function (e, row, column) {
            if (
                !this.isString(column) &&
                {}.hasOwnProperty.call(column, "change")
            ) {
                column.change(e, row, column);
            }
        }, 100),
        handleClick: _.debounce(function (e, column = {}, row) {
            if (
                !this.isString(column) &&
                {}.hasOwnProperty.call(column, "message") &&
                {}.hasOwnProperty.call(column, "confirmed")
            ) {
                const oldValue = row[this.getKey(column)];

                var value = prompt(
                    column.message,
                    this.isset(row[this.getKey(column)])
                        ? row[this.getKey(column)]
                        : ""
                );

                if (this.isset(value)) {
                    row[this.getKey(column)] = value;
                    column.confirmed(value, row, oldValue, this);
                }
            }
        }, 100),
        handleInputChange: _.debounce(function (e, column, row) {
            if (
                !this.isString(column) &&
                {}.hasOwnProperty.call(column, "change") &&
                e.target.readOnly === false
            ) {
                column.change(e, row, column);
            }
        }),
        handleInputKeydown: _.debounce(function (e, column, row) {
            if (
                !this.isString(column) &&
                {}.hasOwnProperty.call(column, "keydown") &&
                e.target.readOnly === false &&
                e.location === 0
            ) {
                column.keydown(e, row, column);
            }
        }, 500),
        handleInputKeyup: _.debounce(function (e, column, row) {
            if (
                !this.isString(column) &&
                {}.hasOwnProperty.call(column, "keyup") &&
                e.target.readOnly === false &&
                e.location === 0
            ) {
                column.keyup(e, row, column);
            }
        }, 500),
        handleInput: _.debounce(function (e, column, row) {
            if (
                !this.isString(column) &&
                {}.hasOwnProperty.call(column, "input") &&
                e.target.readOnly === false
            ) {
                column.input(e, row, column);
            }
        }, 500),
        handleInputBlur: _.debounce(function (e, column, row) {
            e.target.readOnly = true;

            if (
                !this.isString(column) &&
                {}.hasOwnProperty.call(column, "blur") &&
                e.target.readOnly === false
            ) {
                column.blur(e, row, column);
            }
        }),
        handleInputDoubleClick: _.debounce(function (e, column, row) {
            this.oldInputValue = e.target.value;
            e.target.readOnly = false;

            if (
                !this.isString(column) &&
                {}.hasOwnProperty.call(column, "doubleClick") &&
                e.target.readOnly === false
            ) {
                column.doubleClick(e, row, column);
            }
        }),
        handleRowClick: _.debounce(function (row, index) {
            this.$emit("rowClick", row, index);
        }, 50),
        handleRowCheck: _.debounce(function (e, row, index) {
            this.$emit("rowCheck", e, row, index);
        }, 50),

        textAlign(column) {
            return this.isset(column.textAlign) ? column.textAlign : "left";
        },
    },
};
</script>

<style lang="scss" scoped>
</style>