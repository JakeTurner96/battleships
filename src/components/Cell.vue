<template>
    <div
        class="
            items-center
            bg-blue-300
            flex-cell
            pb-cell
            m-0.5
            hover:bg-gray-300
            cursor-pointer
        "
        v-if="!isSelected && !isHover"
        @mouseenter="hoverEnterCallback(id)"
    />
    <div
        class="items-center bg-red-400 flex-cell pb-cell m-0.5 cursor-pointer"
        v-if="isSelected"
    />
    <div
        class="items-center bg-gray-300 flex-cell pb-cell m-0.5 cursor-pointer"
        v-if="!isSelected && isHover"
        @click="callback(id)"
        @mouseleave="hoverLeaveCallback(id)"
    />
</template>

<script lang="ts">
// vue
import { defineComponent } from "vue";

export default defineComponent({
    components: {},
    props: {
        id: {
            type: Number,
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
        isHover: {
            type: Boolean,
            default: false,
        },
        callback: {
            type: Function,
        },
        hoverEnterCallback: {
            type: Function,
        },
        hoverLeaveCallback: {
            type: Function,
        },
    },
    setup(props: any) {
        return {};
    },
});
</script>
