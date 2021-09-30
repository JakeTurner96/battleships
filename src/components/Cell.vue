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
        v-if="!isSelected"
        @click="callback(id)"
    ></div>
    <div
        class="
            items-center
            bg-red-400
            flex-cell
            pb-cell
            m-0.5
            hover:bg-blue-500
            cursor-pointer
        "
        v-if="isSelected"
        @click="callback(id)"
    ></div>
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
        callback: {
            type: Object,
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
    },
    setup(props: any) {
        return {};
    },
});
</script>
