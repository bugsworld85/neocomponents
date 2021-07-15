<template>
    <thead class="sticky" ref="thead">
        <tr>
            <th
                v-if="allowMultipleRowSelection"
                width="10"
                class="checkboxes"
                :class="{
                    freeze: freezeColumn === 0,
                }"
                :rowspan="hasSubColumns ? 2 : 1"
            >
                <div class="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        id="select-all"
                        v-model="checkAll"
                        @change="handleCheckAll"
                    />
                    <label
                        class="custom-control-label"
                        for="select-all"
                    ></label>
                </div>
            </th>
            <th
                v-for="(column, i) in columns"
                :key="`thead-col-${i}`"
                :width="getWidth(column)"
                :style="{
                    textAlign: isset(column.textAlign)
                        ? column.textAlign
                        : 'left',
                }"
                :class="{
                    'is-divider': getType(column) === 'divider',
                    freeze: isFroze(column),
                    'active-column': currentColumn === getKey(column),
                }"
                :column-key="getKey(column)"
                :rowspan="hasSubColumns ? 2 : 1"
                :frozenColumns="frozenColumns"
            >
                <button
                    @click="handleColumnSort(getKey(column))"
                    v-if="isSortable(column)"
                    type="button"
                >
                    <span v-html="getTitle(column)"></span>
                    <i
                        class="fa fa-sort-up text-primary"
                        v-if="isAscending(column, currentColumn, asc)"
                    ></i>
                    <i
                        class="fa fa-sort-down text-primary"
                        v-else-if="isAscending(column, currentColumn, !asc)"
                    ></i>
                    <i class="fa fa-sort" v-else></i>
                </button>
                <span v-else-if="getType(column) !== 'divider'">
                    <span v-html="getTitle(column)"></span>
                </span>
                <span
                    v-if="
                        getType(column) !== 'divider' &&
                        getType(column) !== 'actions'
                    "
                    class="column-options"
                >
                    <button
                        type="button"
                        class="btn btn-sm"
                        v-if="
                            !isset(column.disableFreezing) ||
                            (isset(column.disableFreezing) &&
                                column.disableFreezing === false)
                        "
                        :class="{
                            'btn-light':
                                isset(column.freeze) && column.freeze === false
                                    ? true
                                    : !(isset(column.freeze) && column.freeze),
                            'btn-primary':
                                isset(column.freeze) && column.freeze === true,
                            'is-freeze': isFroze(column),
                        }"
                        @click="handleFreeze(column, i)"
                        title="Freeze Column"
                    >
                        <i class="fa fa-snowflake-o fa-snowflake"></i>
                    </button>
                </span>
            </th>
        </tr>
        <tr v-if="hasSubColumns">
            <th
                v-for="(column, i) in columns"
                :key="`thead-col-dummy-${i}`"
            ></th>
        </tr>
    </thead>
</template>

<script>
import mixins from "../../lib/mixins.js";
import filters from "../../lib/filters.js";

if (typeof _ === "undefined" || _ === null) {
    window._ = require("lodash");
}

export default {
    name: "table-head",
    mixins,
    filters,
    props: {
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
        currentColumn: null,
        asc: false,
        value: {
            type: Boolean,
            default: false,
        },
        hasSubColumns: {
            type: Boolean,
            default: false,
        },
        frozenColumns: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            checkAll: this.value,
            dummyColumns: [],
        };
    },
    updated() {
        this.updateComponents();
    },
    methods: {
        handleFreeze: _.debounce(function (column, index) {
            column.freeze = !column.freeze;
            this.$emit("freeze", column, index);
        }, 200),
        handleCheckAll: _.debounce(function (e) {
            this.$emit("checked", e);
        }, 200),
        handleColumnSort: _.debounce(function (key) {
            this.$emit("click", key);
        }, 200),
        updateComponents() {
            if (this.$refs.thead) {
                setTimeout(() => {
                    this.$refs.thead.childNodes.forEach((child) => {
                        var offsetLeft = 0;
                        if (child.nodeName !== "#comment") {
                            child
                                .querySelectorAll("th, td")
                                .forEach((element, i) => {
                                    if (element.classList.contains("freeze")) {
                                        let left = offsetLeft;
                                        if (
                                            this.isset(
                                                element.previousElementSibling
                                            ) &&
                                            element.previousElementSibling.classList.contains(
                                                "is-divider"
                                            )
                                        ) {
                                            left -= 1;
                                        }

                                        element.style.left = `${left}px`;

                                        offsetLeft += element.offsetWidth;
                                    } else {
                                        element.style.left = "initial";
                                    }
                                });
                        }
                    });
                }, 0);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
</style>