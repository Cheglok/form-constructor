<template>
    <FormConstructor/>
</template>
<script setup lang="ts">
import {onMounted} from "vue";
import axios from 'axios';
import FormConstructor from "./components/FormConstructor/FormConstructor.vue";
onMounted(async () => {
    // const response = await axios.get('/api/saved-forms');
    // console.log(await response.data);
})
</script>

<style scoped>
</style>
