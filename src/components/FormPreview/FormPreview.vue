<template>
    <h2 class="fs-2">Так форму увидит пользователь</h2>
    <form class="form-preview" @submit.prevent="onSubmit">
        <div v-for="component in fields" class="field-line">
            <component
                :is="component.tag"
                v-bind="component"
                v-model="component.currentValue"
                v-model:options="component.options"
            />
            <UiButton text="✏" type="button" @click="editField(component)"/>
            <UiButton text="X" type="button" @click="removeField(component)"/>
            <hr/>
        </div>
    </form>
</template>

<script setup lang="ts">
import UiButton from "@/components/ui/UiButton.vue";
import {FormField} from "@/typespaces/types";

const props = defineProps(['fields'])


const emit = defineEmits(["edit-field", "delete-field"])

function removeField(component: FormField) {
    emit("delete-field", component);
}

function editField(component: FormField) {
    emit("edit-field", component)
}
function onSubmit() {
    props.fields.forEach((field: FormField) => {
        if (field.required && !field.currentValue) {
            field.errorMessage = "Поле обязательно для заполнения"
        }
    })
}

</script>

<style scoped lang="scss">
.form-preview {
    border: 1px solid #ccc;
    padding: 10px;
}

.field-line {
    display: grid;
    grid-template-columns: auto 45px 40px;
    align-items: start;
    gap: 8px
}
</style>
