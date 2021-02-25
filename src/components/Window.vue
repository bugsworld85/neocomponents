<template>
    <div ref="window" class="window" v-if="show" :class="classes">
        <div class="header ns" @mousedown="onDrag" @dragstart="onDragStart">
            <span class="title" v-html="title">{{ title }}</span>
            <span class="controls">
                <!-- <button
                    type="button"
                    class="btn btn-default"
                    @click.prevent="onMinimize"
                >
                    <i>&#95;</i>
                    <i>&square;</i>
                </button> -->
                <button
                    type="button"
                    class="btn btn-default"
                    @click.prevent="handleOnClose"
                >
                    &#10005;
                </button>
            </span>
        </div>
        <div class="body col-md-12" :style="{ maxHeight }">
            <slot></slot>
        </div>
        <div class="footer text-right" v-if="hasFooterSlot && showFooter">
            <slot name="footer"></slot>
        </div>
        <div class="footer text-right" v-else-if="showFooter">
            <button
                type="button"
                class="btn btn-default"
                @click.prevent="handleOnClose"
            >
                Cancel
            </button>
            <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="handleOnOkay"
            >
                Save
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "neo-window",
    props: {
        title: {
            type: String,
            default: "",
        },
        showFooter: {
            type: Boolean,
            default: true,
        },
        size: {
            type: String,
            default: "normal",
        },
        startLocation: {
            type: String,
            default: "top-right",
        },
        maxHeight: {
            type: String,
            default: "500px",
        },
    },
    data() {
        return {
            isLoading: false,
            show: false,
            isMinimized: false,
            isGrabbed: false,
        };
    },
    computed: {
        classes() {
            var location = this.startLocation;
            var classes = {
                minimize: this.isMinimized,
                grab: this.isGrabbed,
                large: this.isLarge,
                medium: this.isMedium,
                normal: this.isNormal,
                small: this.isSmall,
            };

            classes[location] = true;

            return classes;
        },
        isLarge() {
            return this.size === "large";
        },
        isMedium() {
            return this.size === "medium";
        },
        isNormal() {
            return this.size === "normal";
        },
        isSmall() {
            return this.size === "small";
        },
        hasFooterSlot() {
            return !!this.$slots["footer"];
        },
    },
    methods: {
        open() {
            this.show = true;
        },
        close() {
            this.show = false;
        },
        toggle() {
            this.show = !this.show;
        },
        handleOnOkay(e) {
            this.$emit("onokay", e, this.show);
            this.show = false;
        },
        handleOnClose(e) {
            this.$emit("onclose", e, this.show);
            this.show = false;
        },
        onMinimize(e) {
            this.isMinimized = !this.isMinimized;
            // let { window } = this.$refs;

            // if (window.classList.contains("minimize")) {
            // }

            // if ($(target).hasClass("minimize")) {
            //     $(target).css("top", "calc(100vh / 4)");
            //     $(target).removeClass("minimize");
            // } else {
            //     $(target).addClass("minimize");
            // }
        },
        onDrag(e) {
            let { window } = this.$refs;
            window.classList.add("grab");

            let shiftX = e.screenX - window.getBoundingClientRect().left;
            let shiftY = e.screenY - window.getBoundingClientRect().top;

            // centers the ball at (pageX, pageY) coordinates
            function moveAt(pageX, pageY) {
                window.style.left = pageX - shiftX + "px";
                window.style.top = pageY - shiftY + "px";
            }
            function onMouseMove(e) {
                moveAt(e.screenX, e.screenY);
            }

            // moveAt(e.pageX, e.pageY);

            document.addEventListener("mousemove", onMouseMove);

            document.onmouseup = (e) => {
                document.removeEventListener("mousemove", onMouseMove);
                window.onmouseup = null;
                window.classList.remove("grab");
            };
            document.oncontextmenu = () => {
                document.removeEventListener("mousemove", onMouseMove);
                window.onmouseup = null;
                window.classList.remove("grab");
            };
        },
        onDragStart(e) {
            e.preventDefault();
            return false;
        },
    },
};
</script>

<style lang="scss" scoped></style>