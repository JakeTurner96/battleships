<template>
    <div class="shadow-md bg-white rounded-md">
        <div class="text-xl pl-4 pt-4 pb-2 border-b">
            {{ playerName }}
        </div>
        <div class="flex flex-wrap justify-center p-4">
            <Cell
                v-for="cell in gridState"
                :key="cell.id"
                :isAi="isAi"
                :cell="cell"
                :callback="cellCallback"
                :hoverEnterCallback="hoverEnterCallback"
                :hoverLeaveCallback="hoverLeaveCallback"
                :gridState="gridState"
            />
        </div>
    </div>
</template>

<script lang="ts">
// vue
import { defineComponent } from "vue";

// components
import Cell from "@/components/Cell.vue";

export default defineComponent({
    components: {
        Cell,
    },
    props: {
        isAi: {
            type: Boolean,
            default: false,
        },
        playerName: {
            type: String,
            default: "",
        },
        cellCallback: {
            type: Function,
        },
        gridState: {
            type: Object,
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
