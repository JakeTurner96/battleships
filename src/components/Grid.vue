<template>
    <div class="flex flex-wrap justify-center">
        <Cell
            v-for="cell in gridState"
            :key="cell.id"
            :id="cell.id"
            :isHover="cell.isHover"
            :isSelected="cell.isSelected"
            :callback="placeShipCallback"
            :hoverEnterCallback="hoverEnterCallback"
            :hoverLeaveCallback="hoverLeaveCallback"
        />
    </div>
</template>

<script lang="ts">
// vue
import { defineComponent } from "vue";

// components
import Cell from "../components/Cell.vue";

export default defineComponent({
    components: {
        Cell,
    },
    props: {
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
    setup() {
        return {};
    },
});
</script>
