<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        // label: 'Basemaps',
        items: [
        { label: 'Webmap', icon: 'pi pi-fw pi-map', to: {name: 'webmap'} },
        ],
    },
    {
        items: [
            { 
                label: 'Survey', 
                icon: 'pi pi-fw pi-id-card', 
                to: {name: 'survey-layer'},
            },
            { 
                label: 'Webmap Test', 
                icon: 'pi pi-fw pi-id-card', 
                to: {name: 'webmap-test'},
            },
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
