
<template>
    <div class="card flex justify-center">
        <TreeSelect v-model="selectedValue" :options="nodes" selectionMode="checkbox" placeholder="Select Item" class="md:w-80 w-full" />
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { NodeService } from '@/service/NodeService';

const nodes = ref(null);
const selectedValue = ref(null);

onMounted(() => {
    NodeService.getTreeNodes().then((data) => (nodes.value = data));
});

watch(selectedValue, (newValue, oldValue) => {
    console.log("Selection changed:", { newValue, oldValue });
});
</script>
