<template>
    <ShipSelector :callback="setSelectedShip" />
    <Button @click="logTest" />
    <div class="flex flex-wrap justify-center">
        <Cell
            v-for="cell in gridState"
            :key="cell.id"
            :id="cell.id"
            :isHover="cell.isHover"
            :isSelected="cell.isSelected"
            :callback="test"
            :hoverEnterCallback="hoverEnterCallback"
            :hoverLeaveCallback="hoverLeaveCallback"
        />
    </div>
</template>

<script lang="ts">
// vue
import { defineComponent, onMounted, ref } from "vue";

// components
import Cell from "../components/Cell.vue";
import ShipSelector from "../components/ShipSelector.vue";

// primevue
import Button from "primevue/button";

export default defineComponent({
    components: {
        Cell,
        ShipSelector,
        Button,
    },
    setup() {
        const gridState = ref();
        const selectedShip = ref();
        const placedShips = ref<number[]>([]);

        const setState = (start: number, length: number) => {
            for (var i = 0; i < length; i++) {
                gridState.value.find(
                    (e: any) => e.id == start + 10 * i
                ).isSelected = true;
            }
        };

        const hoverEnterCallback = (start: number) => {
            for (var i = 0; i < selectedShip.value; i++) {
                gridState.value.find(
                    (e: any) => e.id == start + 10 * i
                ).isHover = true;
            }
        };

        const hoverLeaveCallback = (start: number) => {
            gridState.value.forEach((e: any) => {
                e.isHover = false;
            });
        };

        const test = (data: number) => {
            if (selectedShip.value) {
                setState(data, selectedShip.value);
                placedShips.value.push(selectedShip.value);
            }
        };

        const logTest = () => {
            console.log(placedShips.value);
        };

        const setSelectedShip = (ship: number) => {
            selectedShip.value = ship;
        };

        onMounted(() => {
            const cells = [];
            for (var i = 1; i <= 100; i++) {
                const cell = {
                    id: i,
                    isSelected: false,
                    isDestroyed: false,
                    isHover: false,
                };
                cells.push(cell);
            }
            gridState.value = cells;
        });

        return {
            test,
            logTest,
            gridState,
            setSelectedShip,
            hoverEnterCallback,
            hoverLeaveCallback,
        };
    },
});
</script>
