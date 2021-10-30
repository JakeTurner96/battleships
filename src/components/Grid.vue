<template>
    <div>
        <div v-if="isAi" class="flex flex-wrap justify-center">
            <Cell
                v-for="cell in gridState"
                :key="cell.id"
                :cell="cell"
                :isAi="isAi"
                :callback="makeMove"
                :gridState="gridState"
            />
        </div>

        <div v-if="!isAi" class="flex flex-wrap justify-center">
            <Cell
                v-for="cell in gridState"
                :key="cell.id"
                :cell="cell"
                :callback="placeShipCallback"
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
        makeMove: {
            type: Function,
        },
        gridState: {
            type: Object,
        },
        placeShipCallback: {
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
