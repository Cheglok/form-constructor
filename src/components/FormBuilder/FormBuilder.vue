<template>
    <FieldBuilder @save-field="addField"/>
</template>

<script setup lang="ts">
import UiSelect from "@/components/ui/UiSelect.vue";
import UiInput from "@/components/ui/UiInput.vue";
import UiCheckbox from "@/components/ui/UiCheckbox.vue";
import FieldBuilder from "@/components/FormBuilder/FieldBuilder.vue";
import {FormField} from "@/typespaces/types";



const props = defineProps(['modelValue'])
const emit = defineEmits(['update:model-value']);
function addField(event: FormField) {
    console.log("addField", event)
    emit("update:model-value", [...props.modelValue, event])
}
</script>
