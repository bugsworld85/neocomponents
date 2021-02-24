<template>
    <div id="app">
        <TestNeoTable />
    </div>
</template>

<script>
import TestNeoTable from "./TestNeoTable";

export default {
    name: "App",
    components: {
        TestNeoTable,
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
