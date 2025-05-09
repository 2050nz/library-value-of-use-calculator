<script setup lang="ts">
import type LineItem from '@/types/LineItem';
import { computed, defineModel, watch } from 'vue';
const props = defineProps({
    item: {
        type: Object as () => LineItem,
        required: true
    }
})
//this sets up the model for the v-model binding
//so the parent can use v-model to bind to this
//and the child can use the model to bind to the input
const model = defineModel<number | null>({
    default: null
});
const lineTotal = computed(() => {
    if (model.value === null) {
        return 0;
    }
    return model.value * props.item.cost;
});

const emit = defineEmits(['line-total-updated']);
watch(lineTotal, (newTotal) => {
    emit('line-total-updated', newTotal);
});

const fmt = (value: number) => {
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
const checkInput = (item: LineItem, event: Event) => {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    if (isNaN(value) || value < 0) {
        input.value = '';
        model.value = null;
    }
    else if (!isNaN(value) && value > 9999) {
        input.value = '9999';
        model.value = 9999;
    }
};

</script>
<template>
    <tr class="calculator-line-item-row">
        <td><input type="number" v-model="model" @input="checkInput(item, $event)" /></td>
        <td>{{ item.label }}</td>
        <td>{{ fmt(lineTotal) }}</td>
    </tr>
</template>