import NeoTable from "./components/Table";
import NeoPaginator from "./components/Paginator";
import NeoWindow from "./components/Window";
import NeoSwitch from "./components/Switch";

const NAME = 'NeoComponents';

const NeoComponents = {
    install(Vue) {
        Vue.component("neo-table", NeoTable);
        Vue.component("neo-paginator", NeoPaginator);
        Vue.component("neo-window", NeoWindow);
        Vue.component("neo-switch", NeoSwitch);
    },
    NAME
}

export {
    NeoTable,
    NeoPaginator,
    NeoWindow,
    NeoSwitch
}

export default NeoComponents;

// if (typeof window !== "undefined" && window.Vue) {
//     window.Vue.use(NeoTable);
// }

// export default NeoTable;
