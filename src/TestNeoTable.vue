<template>
    <div class="col-md-12">
        <neo-table
            :data="products"
            :columns="columns"
            :limit="25"
            maxHeight="600px"
            :freezeColumn="0"
            sortedColumn="name"
            :searchedKeyword="`peter`"
            ref="neoTable"
            :allowMultipleRowSelection="true"
            @sortClick="handleSortClick"
            @onRowSelect="handleRowSelect"
            @onCheckAll="handleCheckAll"
            @rowMounted="handleRowMounted"
        >
            <template v-slot:search>test search</template>
            <template v-slot:filter>test filter</template>
            <template v-slot:before-table>before table</template>
            <template v-slot:paginate>test paginate</template>
            <template v-slot:loading>
                <div>testing</div>
            </template>
            <template v-slot:empty>
                <div>testing</div>
            </template>
            <template v-slot:row-dropdown="{ row }">
                {{ row.id }}
            </template>
        </neo-table>
        <neo-window
            title="Edit Notes"
            ref="neoWindow"
            @onclose="handleWindowClose"
            size="medium"
            maxHeight="400px"
        >
            This is a test
        </neo-window>
        <neo-paginator
            :current_page="meta.current_page"
            :last_page="meta.last_page"
            :per_page="meta.per_page"
            :total="meta.total"
            :to="meta.to"
            :from="meta.from"
        ></neo-paginator>
    </div>
</template>

<script>
import Vue from "vue";
import TestData from "./tests/data.js";
import NeoTable from "./components/Table.vue";
import NeoWindow from "./components/Window.vue";
import NeoPaginator from "./components/Paginator.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./assets/scss/neocomponents.scss";

export default {
    name: "TestNeoTable",
    props: {
        msg: String,
    },
    components: {
        NeoTable,
        NeoWindow,
        NeoPaginator,
    },
    data() {
        return {
            meta: {
                current_page: 1,
                last_page: 40,
                per_page: 15,
                total: 600,
                to: 15,
                from: 1,
            },
            products: TestData,
            columns: [
                {
                    type: "divider",
                },
                {
                    key: "sku",
                    title: "SKU",
                    searchable: true,
                    sortable: true,
                    freeze: true,
                },
                {
                    type: "divider",
                },
                {
                    key: "your_sku",
                    title: "Your SKU",
                    searchable: true,
                    sortable: true,
                    type: "text",
                    input(e) {
                        console.log(e.target.value);
                    },
                },
                {
                    key: "name",
                    title: "Name",
                    searchable: true,
                    sortable: true,
                    collapsed: (row, index, TableRow) => {
                        console.log(row);
                    },
                    // freeze: true,
                },
                // {
                //     key: "depots",
                //     title: "Depots",
                //     type: "columns", // disallow freezing on type columns
                //     columns: [
                //         {
                //             key: "depot-1",
                //             title: "Depot 1",
                //             sortable: true,
                //         },
                //         {
                //             key: "depot-2",
                //             title: "Depot 2",
                //             type: "template",
                //             template: Vue.component("testing", {
                //                 template: `<span>{{ row.qty }}</span>`,
                //                 props: ["column", "row"],
                //             }),
                //         },
                //     ],
                // },
                {
                    key: "active",
                    title: "Active",
                    sortable: true,
                    type: "switch",
                    textAlign: "center",
                    change: (e) => {
                        console.log(e.target.checked);
                    },
                },
                {
                    key: "brand_name",
                    title: "Brand",
                    searchable: true,
                    sortable: true,
                    // freeze: true,
                },
                {
                    key: "barcode",
                    title: "Barcode",
                    searchable: true,
                    hideFreezeButton: true,
                },
                {
                    key: "case_size",
                    title: "Case Size",
                    sortable: true,
                    type: "prompt",
                    message: "Please enter value",
                    confirmed(value) {
                        console.log(value);
                    },
                },
                {
                    key: "cases_per_layer",
                    title: "Cases / Layer",
                    sortable: true,
                },
                {
                    key: "status",
                    title: "Status",
                    sortable: true,
                },
                {
                    key: "updated_at",
                    title: "Updated At",
                    sortable: true,
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
                                    return "";
                                },
                            },
                            methods: {
                                testClick() {
                                    console.log(this.column);
                                    console.log(this.row);
                                },
                            },
                        }),
                    ],
                },
            ],
        };
    },
    mounted() {
        this.$refs.neoWindow.open();
        // this.$refs.neoTable.setLoading(true);
    },
    methods: {
        handleSortClick(key, isAsc) {
            console.log(key, isAsc);
        },
        handleRowMounted(row) {
            // console.log(row);
        },
        handleCheckAll(isChecked, data, e) {
            console.log(data);
        },
        handleRowSelect(check, row, index, checkedRows) {
            console.log(check, row);
            console.log(checkedRows);
        },
        handleWindowClose() {},
    },
};
</script>

<style lang="scss" scoped></style>
