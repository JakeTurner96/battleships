<template>
    <div v-if="!ship.isPlaced">
        <div
            @click="callback(ship)"
            @mouseenter="isShip = true"
            @mouseleave="isShip = false"
            class="flex w-max cursor-pointer space-x-1"
        >
            <div
                :class="
                    isShip
                        ? 'bg-red-400 flex w-9 h-9 shadow-xl'
                        : 'bg-red-400 flex w-8 h-8 '
                "
                v-for="index in length"
                :key="index"
            />
        </div>
        <label>{{ name }}</label>
    </div>
    <div v-if="ship.isPlaced">
        <div class="flex w-max space-x-1">
            <div
                class="bg-gray-300 flex w-8 h-8"
                v-for="index in length"
                :key="index"
            />
        </div>
        <del class="text-gray-300">{{ name }}</del>
    </div>
</template>

<script lang="ts">
// vue
import { defineComponent, ref } from "vue";

export default defineComponent({
    components: {},
    props: {
        ship: {
            type: Object,
        },
        length: {
            type: Number,
        },
        name: {
            type: String,
            default: "",
        },
        callback: {
            type: Function,
        },
    },
    setup(props: any) {
        const isShip = ref(false);

        return {
            isShip,
        };
    },
});
</script>
