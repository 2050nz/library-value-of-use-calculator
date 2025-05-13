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
const config = ref<configType>({
    headings: [],
    items: []
});
const totals: number[] = reactive([]);
const lineValues: number[] = reactive([]);

if (window.calculatorConfig && window.calculatorConfig.headings && window.calculatorConfig.items) {
    config.value.items = window.calculatorConfig.items;
    config.value.headings = window.calculatorConfig.headings;
}
else {
    const configPath = document.getElementById('app')?.getAttribute('data-config') ?? '/items.json';

    fetch(configPath)
        .then((response) => response.json())
        .then((data) => {
            config.value.headings = data.headings;
            config.value.items = data.items;
        })
        .catch((error) => {
            console.error('Error fetching config:', error);
        });
}


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
            <tr class="calculator-grand-total-row">
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
    table-layout: auto;

}

.calculator-table th,
.calculator-table td {
    border: 1px solid #dee2e6;
    padding: 0.5rem;
}

.calculator-table th {
    background-color: #f2f2f2;
    text-align: left;
    font-weight: bold;
    border-width: 0 0 1px 0;
    font-weight: 700;
    color: #343a40;
    background: #f8f9fa;
    transition: box-shadow 0.2s;
}



.calculator-table input[type="number"] {
    width: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    color: #495057;
    background: #ffffff;
    padding: 0.5rem;
    border: 1px solid #ced4da;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    appearance: none;
    border-radius: 6px;
}

.calculator-table input[type="number"]:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 0.2rem #BFDBFE;
    border-color: #3B82F6;
}

.calculator-grand-total-row {
    font-weight: bold;
    background-color: #f9f9f9;
}

.calculator-reset-button {
    color: #ffffff;
    background: #3B82F6;
    border: 1px solid #3B82F6;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    border-radius: 6px;
    cursor: pointer;
}

.calculator-reset-button:hover {
    background: #2563eb;
    color: #ffffff;
    border-color: #2563eb;
}
</style>
