<template>
    <form>
        <h2 class="fs-2">Это превью формы</h2>
        <template v-for="component in components">
            <div class="field-line">
            <component :is="component.tag" v-bind="component" v-model="component.currentValue" v-model:options="component.options"/>
                <UiButton text="✏" type="button" @click="editField(component)"/>
                <UiButton text="X" type="button" @click="removeField(component)"/>
            </div>
        </template>
    </form>
</template>

<script setup lang="ts">
import UiButton from "@/components/ui/UiButton.vue";
import {FormField} from "@/typespaces/types";

const components = defineModel<FormField[]>();

const emit = defineEmits(["edit-field", "delete-field"])

function removeField(component: FormField) {
    emit("delete-field", component);
}
function editField(component: FormField) {
    emit("edit-field", component)
}
</script>

<style scoped lang="scss">
.field-line {
    display: grid;
    grid-template-columns: auto 45px 40px;
    align-items: start;
    gap: 8px
}
</style>
