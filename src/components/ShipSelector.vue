<template>
    <Button icon="pi pi-bars" @click="isVisible = true" />
    <Sidebar v-model:visible="isVisible" :baseZIndex="1000">
        <div class="space-y-2">
            <Ship
                v-for="ship in shipConfig"
                :key="ship.id"
                :length="ship.length"
                :name="ship.name"
                :callback="callback"
            />
        </div>
    </Sidebar>
</template>

<script lang="ts">
// vue
import { defineComponent, ref } from "vue";

// primevue
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";

// config
import shipConfig from "@/config/shipConfig";

// components
import Ship from "@/components/Ship.vue";

export default defineComponent({
    components: {
        Button,
        Sidebar,
        Ship,
    },
    props: {
        callback: {
            type: Object,
        },
    },
    setup(props: any) {
        const isVisible = ref(false);
        return { isVisible, shipConfig };
    },
});
</script>
