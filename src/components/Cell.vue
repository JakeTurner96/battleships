<template>
    <div
        v-if="isAi"
        :class="`
            ${aiCellColor}
            items-center
            flex-cell
            pb-cell
            m-0.5
            cursor-pointer
        `"
        @click="callback(cell)"
    />
    <div
        v-if="!isAi"
        :class="`
            ${cellColor}
            items-center
            flex-cell
            pb-cell
            m-0.5
            cursor-pointer
        `"
        @click="callback(cell.id)"
        @mouseenter="hoverEnterCallback(cell.id)"
        @mouseleave="hoverLeaveCallback()"
    />
</template>

<script lang="ts">
// vue
import { defineComponent, computed } from "vue";

// model
import { Cell } from "@/models/cell";

export default defineComponent({
    components: {},
    props: {
        cell: {
            type: Object as () => Cell,
        },
        isAi: {
            type: Boolean,
            default: false,
        },
        callback: {
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
        // computed
        const cellColor = computed(() => {
            if (props.cell.isDestroyed) {
                return "bg-black";
            } else if (props.cell.isSelected) {
                return "bg-red-400";
            } else if (props.cell.isHover) {
                return "bg-gray-200";
            } else {
                return "bg-blue-300";
            }
        });

        const aiCellColor = computed(() => {
            if (props.cell.isDestroyed) {
                return "bg-gray-500";
            } else if (props.cell.isMiss) {
                return "bg-blue-500";
            } else {
                return "bg-blue-300";
            }
        });

        return { cellColor, aiCellColor };
    },
});
</script>
