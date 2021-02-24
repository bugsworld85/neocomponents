<template>
    <div class="col-md-12">
        <neo-table
            :showAll="true"
            :data="products"
            :columns="columns"
            :multipleRows="false"
            :limit="25"
            maxHeight="600px"
            :freezeColumn="2"
            :enableSearch="false"
            sortedColumn="name"
        ></neo-table>
        <neo-window
            title="Edit Notes"
            ref="neoWindow"
            @onclose="handleWindowClose"
            size="medium"
            maxHeight="400px"
        >
            This is a test
        </neo-window>
    </div>
</template>

<script>
import TestData from "./tests/data.js";
import NeoTable from "./components/Table.vue";
import NeoWindow from "./components/Window.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

export default {
    name: "TestNeoTable",
    props: {
        msg: String,
    },
    components: {
        NeoTable,
        NeoWindow
    },
    data() {
        return {
            products: TestData,
            columns: [
                {
                    key: "sku",
                    title: "SKU",
                    searchable: true,
                    sortable: true,
                    freeze: true,
                },
                {
                    key: "your_sku",
                    title: "Your SKU",
                    searchable: true,
                    sortable: true,
                },
                {
                    key: "name",
                    title: "Name",
                    searchable: true,
                    sortable: true,
                    freeze: true,
                },
                {
                    key: "brand_name",
                    title: "Brand",
                    searchable: true,
                    sortable: true,
                    freeze: true,
                },
                {
                    key: "barcode",
                    title: "Barcode",
                    searchable: true,
                },
                {
                    key: "case_size",
                    title: "Case Size",
                    sortable: true,
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
                    key: "actions",
                    type: "actions",
                    textAlign: "right",
                    width: 10,
                    actions: [
                        window.Vue.component("view-product", {
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
    mounted () {
        this.$refs.neoWindow.open();
    },
    methods: {
        handleWindowClose() {
            
        }
    },
};
</script>

<style lang="scss" scoped></style>
