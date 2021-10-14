<template>
    <div class="space-y-2">
        <ShipSelector
            v-if="placedShips < 5"
            :callback="setSelectedShip"
            :shipState="shipState"
        />
        <Button @click="logData" />
        <div class="flex justify-center space-x-10">
            <Grid
                :gridState="gridState"
                :placeShipCallback="placeShip"
                :hoverEnterCallback="hoverEnterCallback"
                :hoverLeaveCallback="hoverLeaveCallback"
            />
            <Grid
                :gridState="aiGridState"
                :placeShipCallback="placeShip"
                :hoverEnterCallback="hoverEnterCallback"
                :hoverLeaveCallback="hoverLeaveCallback"
            />
        </div>
        <div class="flex justify-center">
            <Button v-if="placedShips == 5" label="Begin" />
        </div>
    </div>
</template>

<script lang="ts">
// vue
import { defineComponent, onMounted, ref } from "vue";

// services
import { useAiService } from "@/ai/ai";

// primevue
import Button from "primevue/button";

// config
import shipConfig from "@/config/shipConfig";

// components
import Grid from "@/components/Grid.vue";
import ShipSelector from "@/components/ShipSelector.vue";

export default defineComponent({
    components: {
        Grid,
        ShipSelector,
        Button,
    },
    setup() {
        // reactive
        const gridState = ref();
        const aiGridState = ref();
        const shipState = ref(shipConfig);
        const selectedShip = ref();
        const placedShips = ref(0);

        // services
        const aiService = useAiService();

        // methods
        const logData = () => {
            console.log(aiGridState.value);
            console.log(gridState.value);
        };

        const setState = (start: number, length: number) => {
            for (var i = 0; i < length; i++) {
                gridState.value.find(
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
                    gridState.value.find(
                        (e: any) => e.id == start + 10 * i
                    ).isHover = true;
                }
            }
        };

        const hoverLeaveCallback = () => {
            gridState.value.forEach((e: any) => {
                e.isHover = false;
            });
        };

        const setSelectedShip = (ship: any) => {
            selectedShip.value = ship;
        };

        // lifecycle
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
            aiGridState.value = aiService.generateAiGridState();
        });

        return {
            placeShip,
            gridState,
            shipState,
            setSelectedShip,
            hoverEnterCallback,
            hoverLeaveCallback,
            logData,
            placedShips,
            aiGridState,
        };
    },
});
</script>
