<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type configType from '@/types/config';
import TableRow from './components/TableRow.vue';
import type LineItem from './types/LineItem';

declare global {
    interface Window {
        calculatorConfig?: {
            headings: string[];
            items: Array<LineItem>
        };
    }
}
// Use ref for the config object
const config = ref<configType>({
    headings: [],
    items: []
});
if (window.calculatorConfig && window.calculatorConfig.headings && window.calculatorConfig.items) {
    config.value.items = window.calculatorConfig.items;
    config.value.headings = window.calculatorConfig.headings;
}
else {
    const configPath = document.getElementById('app')?.getAttribute('data-config') ?? '/items.json';

    fetch(configPath)
        .then((response) => response.json())
        .then((data) => {
            config.value.headings = data.headings; // Update properties reactively
            config.value.items = data.items;
        })
        .catch((error) => {
            console.error('Error fetching config:', error);
        });
}
const totals: number[] = reactive([]); // Use reactive for reactivity
const lineValues: number[] = reactive([]); // Use reactive for reactivity

const grandTotal = computed(() => {
    return totals.reduce((acc, total) => acc + total, 0).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
});
const reset = () => {
    lineValues.splice(0, lineValues.length, ...Array(config.value.items.length).fill(null));
};

</script>

<template>

    <table class="calculator-table">
        <thead>
            <tr class="calculator-heading-row">
                <th v-for="heading in config.headings">{{ heading }}</th>
            </tr>
        </thead>
        <tbody>
            <TableRow v-for="(item, index) in config.items" :key="index" @line-total-updated="totals[index] = $event"
                :item="item" v-model="lineValues[index]" />
            <tr>
                <td colspan="2">Grand Total</td>
                <td>{{ grandTotal }}</td>
            </tr>
            <tr>
                <td colspan="2">
                    <button class="calculator-reset-button" @click="reset">Reset</button>
                </td>
                <td></td>
            </tr>

        </tbody>
    </table>

</template>

<style>
.calculator-table {
    width: 100%;
    border-collapse: collapse;
}

.calculator-table th,
.calculator-table td {
    border: 1px solid #ddd;
}

.calculator-table th {
    background-color: #f2f2f2;
    text-align: left;
}



.calculator-table input[type="number"] {
    width: 100%;
    box-sizing: border-box;
}

.calculator-table input[type="number"]:focus {
    outline: none;
}
</style>
