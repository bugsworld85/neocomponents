<template>
    <div class="col-md-12">
        <neo-table
            :data="products"
            :columns="columns"
            :multipleRows="false"
            :limit="25"
            maxHeight="600px"
            :freezeColumn="2"
            sortedColumn="name"
            :searchedKeyword="`peter`"
        >
            <template v-slot:search>test</template>
            <template v-slot:filter>test filter</template>
            <template v-slot:paginate>test paginate</template>
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
        msg: String
    },
    components: {
        NeoTable,
        NeoWindow,
        NeoPaginator
    },
    data() {
        return {
            meta: {
                current_page: 1,
                last_page: 1,
                per_page: 15,
                total: 25,
                to: 15,
                from: 1,
            },
            products: TestData,
            columns: [
                {
                    key: "sku",
                    title: "SKU",
                    searchable: true,
                    sortable: true,
                    freeze: true
                },
                {
                    key: "your_sku",
                    title: "Your SKU",
                    searchable: true,
                    sortable: true
                },
                {
                    key: "name",
                    title: "Name",
                    searchable: true,
                    sortable: true,
                    freeze: true
                },
                {
                    key: "brand_name",
                    title: "Brand",
                    searchable: true,
                    sortable: true,
                    freeze: true
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
                    sortable: true
                },
                {
                    key: "cases_per_layer",
                    title: "Cases / Layer",
                    sortable: true
                },
                {
                    key: "status",
                    title: "Status",
                    sortable: true
                },
                {
                    key: "updated_at",
                    title: "Updated At",
                    sortable: true
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
                                }
                            },
                            methods: {
                                testClick() {
                                    console.log(this.column);
                                    console.log(this.row);
                                }
                            }
                        })
                    ]
                }
            ]
        };
    },
    mounted() {
        this.$refs.neoWindow.open();
    },
    methods: {
        handleWindowClose() {}
    }
};
</script>

<style lang="scss" scoped></style>
