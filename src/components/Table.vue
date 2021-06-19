<template>
    <div class="neo-table">
        <div class="table-filter">
            <div class="row">
                <div class="col-md-6 flex middle" v-if="!hasSearchSlot">
                    <form
                        method="get"
                        ref="searchForm"
                        @submit.prevent
                        v-if="enableSearch"
                    >
                        <div class="input-group">
                            <input
                                type="text"
                                :placeholder="placeholder"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                                class="form-control bg-light small search-field"
                                ref="searchField"
                                v-model="keyword"
                                @input="handleSearchTyping"
                                v-if="realTime"
                                size="38"
                            />
                            <input
                                type="text"
                                :placeholder="placeholder"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                                class="form-control bg-light small search-field"
                                ref="searchField"
                                name="keyword"
                                v-model="searchedKeywordModel"
                                @input="handleSearchTyping"
                                v-else
                                size="38"
                            />
                            <div
                                class="input-group-append"
                                v-if="keyword !== null && keyword !== ''"
                            >
                                <button
                                    type="button"
                                    class="btn btn-danger"
                                    @click="handleClearSearch"
                                >
                                    <i class="fa fa-times fa-sm"></i>
                                </button>
                            </div>
                            <div
                                class="input-group-append"
                                v-else-if="realTime === false"
                            >
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    @click="handleSearchClick"
                                    v-if="
                                        isSearching &&
                                        searchedKeywordModel !== null &&
                                        searchedKeywordModel !== ''
                                    "
                                >
                                    <i class="fa fa-search fa-sm"></i>
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-danger"
                                    @click="handleClearSearch"
                                    v-if="
                                        searchedKeywordModel !== null &&
                                        searchedKeywordModel !== ''
                                    "
                                >
                                    <i class="fa fa-times fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-md-12" v-if="hasSearchSlot || hasFilterSlot">
                    <div v-if="hasSearchSlot" class="flex">
                        <slot name="search"></slot>
                    </div>
                    <div v-if="hasFilterSlot" class="flex">
                        <slot name="filter"></slot>
                    </div>
                </div>
                <div class="col-md-12" v-if="hasBeforeTableSlot">
                    <slot name="before-table"></slot>
                </div>
            </div>
        </div>
        <div
            class="table-container"
            :style="{ maxHeight: maxHeight !== null ? maxHeight : 'initial' }"
        >
            <table class="table" ref="table">
                <TableHead
                    v-if="tableColumns.length > 0"
                    :allowMultipleRowSelection="allowMultipleRowSelection"
                    v-model="checkAll"
                    :currentColumn="currentColumn"
                    :asc="asc"
                    :columns="tableColumns"
                    @freeze="handleFreeze"
                    @checked="handleCheckAll"
                    @click="handleColumnSort"
                ></TableHead>
                <tbody v-if="loading || searching">
                    <tr>
                        <td
                            :colspan="tableColumns.length + 1"
                            v-if="loading"
                            class="loading-container"
                        >
                            <div v-if="hasLoadingSlot" class="table-loading">
                                <slot name="loading"></slot>
                            </div>
                            <span v-else>
                                {{ loadingMessage }}
                            </span>
                        </td>
                        <td :colspan="tableColumns.length + 1" v-else>
                            Searching
                            <code> {{ keyword }} </code>...
                        </td>
                    </tr>
                </tbody>
                <tbody v-else-if="rows().length > 0" class="sticky" ref="tbody">
                    <TableRow
                        v-for="(row, i) in rows()"
                        :key="`row-${i}`"
                        :ref="`row${i}`"
                        :index="i"
                        :row="row"
                        :keyword="keyword"
                        :columns="columns"
                        :allowMultipleRowSelection="allowMultipleRowSelection"
                        :checked="row.checked"
                        @rowClick="handleRowClick"
                        @rowCheck="handleRowSelect"
                        @mounted="handleRowMounted"
                    ></TableRow>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td
                            :colspan="tableColumns.length + 1"
                            style="padding: 8px 10px; pointer-events: none"
                        >
                            {{ emptyMessage }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table-footer">
            <div class="row" v-if="enableDataPagination && !hasPaginateSlot">
                <div class="col-md-4 text-left">
                    <span
                        class="nowrap ml-2"
                        v-if="rows().length > 0 && !showAll"
                        >{{ start }}-{{ end }} of {{ totalRows }}</span
                    >
                </div>
                <div class="col-md-8 text-right" v-if="!showAll">
                    <nav aria-label="..." v-if="totalRows > limit">
                        <ul class="pagination mb-0 justify-content-end">
                            <li
                                class="page-item"
                                :class="{ disabled: currentPage <= 3 }"
                            >
                                <a
                                    class="page-link"
                                    href="#"
                                    @click.prevent="
                                        handlePaginationClick($event, 1)
                                    "
                                    v-if="currentPage > 3"
                                >
                                    <i class="fa fa-angle-double-left"></i>
                                </a>
                                <span class="page-link" v-else>
                                    <i class="fa fa-angle-double-left"></i>
                                </span>
                            </li>
                            <li
                                class="page-item"
                                :class="{ disabled: currentPage === 1 }"
                            >
                                <a
                                    class="page-link"
                                    href="#"
                                    @click.prevent="
                                        handlePaginationClick(
                                            $event,
                                            currentPage - 1
                                        )
                                    "
                                    v-if="currentPage > 1"
                                >
                                    <i class="fa fa-angle-left"></i>
                                </a>
                                <span class="page-link" v-else>
                                    <i class="fa fa-angle-left"></i>
                                </span>
                            </li>
                            <li
                                class="page-item"
                                v-for="page in maxPages"
                                :key="`pagination-${page.page}`"
                                :class="{ active: page.isCurrent }"
                            >
                                <span class="page-link" v-if="page.isCurrent">
                                    {{ page.page }}
                                    <span class="sr-only">(current)</span>
                                </span>
                                <a
                                    class="page-link"
                                    href="#"
                                    v-else
                                    @click.prevent="
                                        handlePaginationClick($event, page.page)
                                    "
                                    >{{ page.page }}</a
                                >
                            </li>
                            <li
                                class="page-item"
                                :class="{
                                    disabled: currentPage === totalPages,
                                }"
                            >
                                <a
                                    class="page-link"
                                    href="#"
                                    @click.prevent="
                                        handlePaginationClick(
                                            $event,
                                            currentPage + 1
                                        )
                                    "
                                    v-if="currentPage < totalPages"
                                >
                                    <i class="fa fa-angle-right"></i>
                                </a>
                                <span class="page-link" v-else>
                                    <i class="fa fa-angle-right"></i>
                                </span>
                            </li>
                            <li
                                class="page-item"
                                :class="{
                                    disabled: currentPage > totalPages - 3,
                                }"
                            >
                                <a
                                    class="page-link"
                                    href="#"
                                    @click.prevent="
                                        handlePaginationClick(
                                            $event,
                                            totalPages
                                        )
                                    "
                                    v-if="currentPage <= totalPages - 3"
                                >
                                    <i class="fa fa-angle-double-right"></i>
                                </a>
                                <span class="page-link" v-else>
                                    <i class="fa fa-angle-double-right"></i>
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div v-if="hasPaginateSlot" class="row">
                <slot name="paginate"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from "../lib/mixins.js";
import filters from "../lib/filters.js";
import props from "../lib/props.js";
import TableRow from "./sub/TableRow";
import TableHead from "./sub/TableHead";
// import "font-awesome/css/font-awesome.min.css";
// import "../assets/scss/table.scss";

if (typeof _ === "undefined" || _ === null) {
    window._ = require("lodash");
}

if (typeof moment === "undefined" || moment === null) {
    window.moment = require("moment");
}

export default {
    name: "neo-table",
    mixins,
    filters,
    props,
    components: {
        TableRow,
        TableHead,
    },
    computed: {
        hasBeforeTableSlot() {
            return !!this.$slots["before-table"];
        },
        hasLoadingSlot() {
            return !!this.$slots["loading"];
        },
        hasPaginateSlot() {
            return !!this.$slots["paginate"];
        },
        hasSearchSlot() {
            return !!this.$slots["search"];
        },
        hasFilterSlot() {
            return !!this.$slots["filter"];
        },
        maxPages() {
            var pages = [];
            var start = 1;
            var limit = this.totalPages;

            if (this.currentPage > this.totalPages - 2) {
                start = this.totalPages - 4;
            } else if (this.currentPage < 3) {
                start = 1;
            } else if (this.currentPage >= 3) {
                start = this.currentPage - 2;
            }
            // if total pages is below 5, always start at 1
            if (this.totalPages < 5) {
                start = 1;
            }

            if (this.totalPages >= 5) {
                limit = 5;
            }

            for (let i = 0; i < limit; i++) {
                pages.push({
                    page: start + i,
                    isCurrent: this.currentPage === start + i,
                });
            }

            return pages;
        },
        start() {
            return (this.currentPage - 1) * this.limit + 1;
        },
        end() {
            var end = this.currentPage * this.limit;

            if (this.totalRows < this.limit) {
                return this.totalRows;
            }

            if (end > this.totalRows) {
                return this.totalRows;
            }
            return end;
        },
    },
    data() {
        return {
            checkAll: false,
            loading: true,
            tableColumns: this.columns,
            currentColumn: null,
            asc: true,
            columnMethods: {},
            keyword: null,
            searching: false,
            totalPages: Math.ceil(this.data.length / this.limit),
            currentPage: this.page,
            totalRows:
                this.totalTableRows > 0
                    ? this.totalTableRows
                    : this.data.length,
            isSearching: false,
            searchedKeywordModel: this.searchedKeyword,
        };
    },
    created() {
        if (this.columns.length <= 0) {
            if (this.data.length > 0) {
                this.tableColumns = Object.keys(this.data[0]).filter((key) => {
                    return !this.exludeColumns.includes(key);
                });
            }
        }
        this.data.map((row) => {
            row.checked = false;

            return row;
        });
    },
    mounted() {
        // console.log(this.columns);
        this.loading = false;
        this.asc = this.isAsc;
        if (this.isset(this.sortedColumn)) {
            this.currentColumn = this.sortedColumn;
        }
        this.$emit("mounted", this);
    },
    updated() {
        this.updateComponents();
    },
    methods: {
        handleRowMounted(row, index) {
            this.$emit("rowMounted", row, index);
        },
        setLoading(loading = true) {
            this.loading = loading;
        },
        handleRowClick(row, index) {
            this.$emit("rowClick", row, index);
        },
        updateComponents() {
            // if (this.$refs.thead) {
            //     this.$refs.thead.childNodes.forEach((child) => {
            //         var offsetLeft = 0;

            //         child.querySelectorAll("th, td").forEach((element, i) => {
            //             if (element.classList.contains("freeze")) {
            //                 element.style.left = `${offsetLeft}px`;

            //                 offsetLeft += element.offsetWidth;
            //             } else {
            //                 element.style.left = "initial";
            //             }
            //         });
            //     });
            // }

            if (this.isset(this.$refs.tbody)) {
                this.$refs.tbody.childNodes.forEach((child) => {
                    var offsetLeft = 0;

                    child.querySelectorAll("th, td").forEach((element, i) => {
                        if (element.classList.contains("freeze")) {
                            element.style.left = `${offsetLeft}px`;

                            offsetLeft += element.offsetWidth;
                        }
                    });
                });
            }
        },
        isFroze(column) {
            if (column.disableFreezing) {
                return false;
            }
            return this.isset(column.freeze) && column.freeze
                ? column.freeze
                : false;
        },
        handleFreeze(column, colIndex) {
            column.freeze = !column.freeze;
            this.$forceUpdate();
        },
        handleSearchClick() {
            this.$refs.searchForm.submit();
        },
        handlePaginationClick(e, page) {
            var currentPage = page;

            if (this.isset(this.$listeners.paginationClick)) {
                currentPage = this.$emit(
                    "paginationClick",
                    e,
                    page,
                    {
                        keyword: this.isset(this.searchedKeyword)
                            ? this.searchedKeyword
                            : this.keyword,
                        sortedColumn: this.isset(this.sortedColumn)
                            ? this.sortedColumn
                            : this.sortedColumn,
                        asc: this.asc,
                    },
                    this
                );
            }

            if (this.isset(currentPage)) {
                this.currentPage = currentPage;
            }
        },
        handleClearSearch() {
            this.searching = false;
            this.keyword = null;
            this.currentPage = 1;
            this.isSearching = false;
            if (!this.realTime) {
                this.searchedKeywordModel = null;
                this.$emit("onClearSearch");
            }
        },
        handleSearchTyping: _.debounce(function (e) {
            var keyword = e.target.value;

            if (this.isset(this.$listeners.onSearchInput)) {
                keyword = this.$emit("onSearchInput", e, this);
            }

            if (this.isset(keyword) === false) {
                this.isSearching = true;
                return;
            }
            if (keyword !== "") {
                this.keyword = keyword;
            } else {
                this.handleClearSearch();
            }
            this.currentPage = 1;
        }, 500),
        handleRowSelect(e, row, index) {
            if (!e.target.checked) {
                this.checkAll = false;
            }
            this.$emit(
                "onRowSelect",
                e.target.checked,
                row,
                index,
                this.data.filter((row) => {
                    return row.checked;
                }),
                e
            );
        },
        handleCheckAll(e) {
            this.checkAll = e.target.checked;

            for (let i = 0; i < this.data.length; i++) {
                this.data[i].checked = this.checkAll;
            }
            this.$emit("onCheckAll", e.target.checked, this.data, e);
        },
        handleColumnSort(key) {
            this.$emit(
                "sortClick",
                key,
                key === this.currentColumn ? !this.asc : true
            );

            if (key === this.currentColumn) {
                this.asc = !this.asc;
            } else {
                this.asc = true;
            }

            this.currentColumn = key;
        },
        rows() {
            var data = this.data;

            if (this.enableDataFilter) {
                data = this.filterData(data);
            }

            if (this.enableDataSorting) {
                var sortKey = this.currentColumn;

                // used when you are mutating
                this.columns.find((column) => {
                    if (
                        column.key === sortKey &&
                        column.sortable &&
                        this.isset(column.sortKey)
                    ) {
                        sortKey = column.sortKey;
                        return true;
                    }
                    return false;
                });

                data = this.sortData(data, sortKey);
            }

            if (this.enableDataPagination) {
                data = this.paginate(data);
            }

            return data;
        },
        paginate(data) {
            var start = (this.currentPage - 1) * this.limit;
            var end = start + this.limit;

            if (this.keyword === null) {
                this.totalRows =
                    this.totalTableRows > 0
                        ? this.totalTableRows
                        : this.data.length;
                this.totalPages = Math.ceil(this.totalRows / this.limit);
            } else {
                this.totalRows = this.data.length;
                this.totalPages = Math.ceil(this.totalRows / this.limit);
            }

            if (data.length < start) {
                return data;
            } else {
                return data.slice(start, end);
            }
        },
        sortData(data, sortKey) {
            if (this.isset(this.$listeners.overrideSort)) {
                data.sort((a, b) => {
                    return this.$emit("overrideSort", a, b, sortKey);
                });
            } else {
                // // sort rows by column
                data.sort((a, b) => {
                    if (
                        moment(a[sortKey]).isValid() &&
                        moment(b[sortKey]).isValid()
                    ) {
                        if (moment(a[sortKey]) - moment(b[sortKey]) > 0) {
                            return this.asc ? -1 : 1;
                        }
                        if (moment(a[sortKey]) - moment(b[sortKey]) < 0) {
                            return this.asc ? 1 : -1;
                        }
                    } else {
                        if (!isNaN(a[sortKey]) && !isNaN(b[sortKey])) {
                            // is both a and b a number.
                            if (
                                parseFloat(a[sortKey]) < parseFloat(b[sortKey])
                            ) {
                                return this.asc ? -1 : 1;
                            }
                            if (
                                parseFloat(a[sortKey]) > parseFloat(b[sortKey])
                            ) {
                                return this.asc ? 1 : -1;
                            }
                        } else {
                            if (
                                a[sortKey].toLowerCase() <
                                b[sortKey].toLowerCase()
                            ) {
                                return this.asc ? -1 : 1;
                            }
                            if (
                                a[sortKey].toLowerCase() >
                                b[sortKey].toLowerCase()
                            ) {
                                return this.asc ? 1 : -1;
                            }
                        }

                        if (a[sortKey].length < b[sortKey].length) {
                            return this.asc ? -1 : 1;
                        }
                        if (a[sortKey].length > b[sortKey].length) {
                            return this.asc ? 1 : -1;
                        }
                    }

                    return 0;
                });
            }

            return data;
        },
        filterData(data) {
            return data.filter((row) => {
                if (this.keyword !== null) {
                    var found = false;
                    // get searchable columns
                    for (let i = 0; i < this.columns.length; i++) {
                        if (
                            this.isSearchable(this.columns[i]) &&
                            this.isString(this.keyword)
                        ) {
                            if (
                                this.search(
                                    row[this.columns[i].key],
                                    this.keyword
                                )
                            ) {
                                found = true;
                            }
                        }
                    }
                    return found;
                }
                return true;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.custom-switch {
    padding: 0;
    width: 1.75rem;
    display: inline-block;
    min-height: 1rem;
    height: 1rem;
    .custom-control-input {
        width: 100%;
        z-index: 1;
        height: 1rem;
        &:checked {
            & ~ .custom-control-label {
                &:after {
                    transform: translate(100%, -50%);
                }
            }
        }
    }
    .custom-control-label {
        height: 1rem;
        &:before {
            top: 0;
            left: 0;
            position: relative;
        }
        &:after {
            left: 2px;
            top: 50%;
            transform: translate(0, -50%);
        }
    }
}
.table-loading {
    min-height: 300px;
    display: flex;
    width: 100%;
    align-items: center;
    > div {
        width: 100%;
    }
}
</style>
