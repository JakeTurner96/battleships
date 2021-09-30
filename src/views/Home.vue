<template>
    <ShipSelector />
    <div class="flex flex-wrap justify-center">
        <Cell
            v-for="cell in gridState"
            :key="cell.id"
            :id="cell.id"
            :isSelected="cell.isSelected"
            :callback="test"
        />
    </div>
</template>

<script lang="ts">
// vue
import { defineComponent, onMounted, ref } from "vue";

// components
import Cell from "../components/Cell.vue";
import ShipSelector from "../components/ShipSelector.vue";

export default defineComponent({
    components: {
        Cell,
        ShipSelector,
    },
    setup() {
        const gridState = ref();

        const setState = (start: number, length: number) => {
            for (var i = 0; i < length; i++) {
                gridState.value.find(
                    (e: any) => e.id == start + 10 * i
                ).isSelected = true;
            }
        };

        const test = (data: number) => {
            console.log(data);
            setState(data, 5);
        };

        onMounted(() => {
            const cells = [];
            for (var i = 1; i <= 100; i++) {
                const cell = {
                    id: i,
                    isSelected: false,
                };
                cells.push(cell);
            }
            gridState.value = cells;
        });

        return {
            test,
            gridState,
        };
    },
});
</script>
