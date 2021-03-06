<template>
    <div class="flex justify-center text-3xl bg-white shadow-md p-2 mb-10">
        Battleships
    </div>

    <div class="flex justify-center space-x-10">
        <ShipSelector
            v-if="placedShips < 5"
            :callback="setSelectedShip"
            :shipState="shipState"
        />
        <Grid
            playerName="You"
            :isAi="false"
            :gridState="p1GridState"
            :cellCallback="placeShip"
            :hoverEnterCallback="hoverEnterCallback"
            :hoverLeaveCallback="hoverLeaveCallback"
            :makeMove="makeMove"
        />
        <Grid
            v-if="placedShips == 5"
            playerName="Computer"
            :isAi="true"
            :gridState="p2GridState"
            :cellCallback="makeMove"
        />
    </div>
</template>

<script lang="ts">
// vue
import { defineComponent, onMounted, ref } from "vue";

// services
import { useGrid } from "@/hooks/gridHook";

// config
import shipConfig from "@/config/shipConfig";

// components
import Grid from "@/components/Grid.vue";
import ShipSelector from "@/components/ShipSelector.vue";

export default defineComponent({
    components: {
        Grid,
        ShipSelector,
    },
    setup() {
        // reactive
        const p1GridState = ref();
        const p2GridState = ref();
        const shipState = ref(shipConfig);
        const selectedShip = ref();
        const placedShips = ref(0);
        const previousMoves = ref([]);

        // services
        const { generateGrid, generateAiGridState } = useGrid();

        // methods
        const setState = (start: number, length: number) => {
            for (var i = 0; i < length; i++) {
                p1GridState.value.find(
                    (e: any) => e.id == start + 10 * i
                ).isSelected = true;
            }
        };

        const placeShip = (data: number) => {
            if (data + (selectedShip.value.length - 1) * 10 <= 100) {
                if (selectedShip.value.length) {
                    setState(data, selectedShip.value.length);
                    shipState.value.forEach((ship: any) => {
                        if (ship.id == selectedShip.value.id) {
                            ship.isPlaced = true;
                        }
                    });
                    placedShips.value = placedShips.value + 1;
                    selectedShip.value = {};
                }
            }
        };

        const hoverEnterCallback = (start: number) => {
            if (selectedShip.value) {
                for (var i = 0; i < selectedShip.value.length; i++) {
                    p1GridState.value.find(
                        (e: any) => e.id == start + 10 * i
                    ).isHover = true;
                }
            }
        };

        const hoverLeaveCallback = () => {
            p1GridState.value.forEach((cell: any) => {
                cell.isHover = false;
            });
        };

        const makeMove = async (selectedCell: any, grid: any) => {
            var cell = grid.find((e: any) => e.id == selectedCell.id);
            if (selectedCell.isSelected) {
                cell.isDestroyed = true;
            } else {
                cell.isMiss = true;
            }
        };

        const setSelectedShip = (ship: any) => {
            selectedShip.value = ship;
        };

        // lifecycle
        onMounted(() => {
            p1GridState.value = generateGrid();
            p2GridState.value = generateAiGridState();
        });

        return {
            p1GridState,
            p2GridState,
            placedShips,
            shipState,
            previousMoves,
            makeMove,
            placeShip,
            setSelectedShip,
            hoverEnterCallback,
            hoverLeaveCallback,
        };
    },
});
</script>
