<template>
    <ShipSelector :callback="setSelectedShip" :shipState="shipState" />
    <Grid
        :gridState="gridState"
        :placeShipCallback="placeShip"
        :hoverEnterCallback="hoverEnterCallback"
        :hoverLeaveCallback="hoverLeaveCallback"
    />
</template>

<script lang="ts">
// vue
import { defineComponent, onMounted, ref } from "vue";

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
        const gridState = ref();
        const shipState = ref(shipConfig);
        const selectedShip = ref();

        const setState = (start: number, length: number) => {
            for (var i = 0; i < length; i++) {
                gridState.value.find(
                    (e: any) => e.id == start + 10 * i
                ).isSelected = true;
            }
        };

        const placeShip = (data: number) => {
            if (selectedShip.value.length) {
                setState(data, selectedShip.value.length);
                shipState.value.forEach((ship: any) => {
                    if (ship.id == selectedShip.value.id) {
                        ship.isPlaced = true;
                    }
                });
                selectedShip.value = {};
            }
        };

        const hoverEnterCallback = (start: number) => {
            for (var i = 0; i < selectedShip.value.length; i++) {
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

        const setSelectedShip = (ship: any) => {
            selectedShip.value = ship;
        };

        onMounted(() => {
            const cells = [];
            for (var i = 1; i <= 100; i++) {
                cells.push({
                    id: i,
                    isSelected: false,
                    isDestroyed: false,
                    isHover: false,
                });
            }
            gridState.value = cells;
        });

        return {
            placeShip,
            gridState,
            shipState,
            setSelectedShip,
            hoverEnterCallback,
            hoverLeaveCallback,
        };
    },
});
</script>
