<template>
<div class="container container-fluid text-center">
    <div class="row">
        <div class="col col-7">
            <FormPreview :model-value="components" @edit-field="editField" @delete-field="deleteField"/>
        </div>
        <div class="col col-5">
            <FieldBuilder @save-field="saveField" :component="currentComponent"/>
        </div>
    </div>
    <div class="col text-center save-button">
        <UiButton text="Сохранить форму" type="submit" @click="saveConstructedForm"/>
    </div>
</div>
    <hr>
    Текущий компонент
    {{ currentComponent }}
</template>

<script setup lang="ts">
import FormPreview from "@/components/FormPreview/FormPreview.vue";
import FormBuilder from "@/components/FormBuilder/FormBuilder.vue";

import {Ref, ref} from "vue";
import UiButton from "@/components/ui/UiButton.vue";
import {FormField} from "@/typespaces/types";
import FieldBuilder from "@/components/FormBuilder/FieldBuilder.vue";

const components: Ref<FormField[]> = ref([]);

const currentComponent: Ref<FormField | null> = ref(null);

function saveConstructedForm() {
    console.log(components.value);
}
function saveField(event: FormField) {
    if (!currentComponent.value) {
        components.value.push(event);
    }
    else {
        components.value = components.value.map(item => {
            if(item.name === event.name) {
                return event;
            }
            return item;
        })
        currentComponent.value = null;
    }
}

function editField(event: FormField) {
    currentComponent.value = event;
}
function deleteField(event: FormField) {
    if (currentComponent.value?.name === event.name) {
        currentComponent.value = null;
    }
    components.value = components.value.filter(item => {
        return item.name !== event.name;
    })
}
</script>


<style scoped lang="scss">
.container {
    width: 1200px;
}
.save-button {
    padding: 20px;
}
</style>
