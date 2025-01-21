<template>
    <form novalidate @submit.prevent="onSubmit" @reset.prevent="onReset" class="field-builder">
        <UiSelect
            label="Выберите тип элемента"
            name="tag"
            :required="true"
            :options="typeFieldSelect"
            :model-value="newField.tag"
            @update:model-value="changeFieldType"
            class="mb-3"
        />
        <template v-if="newField.tag !== 'UiButton'">
            <UiInput
                name="label"
                label="Подпись к элементу"
                required
                :model-value="newField.label"
                :error-message="newField.labelError"
                @update:model-value="updateLabelInput"
            />
            <UiCheckbox
                name="required"
                label="Обязательно к заполнению"
                v-model="newField.required"
                class="start-position"
            />
            <UiSelect
                label="Выберите источник данных"
                name="dataSourceType"
                :options="dataSourceSelect"
                :model-value="dataSourceType"
                @update:model-value="changeDataSourceType"
            />
            <UiInput
                v-if="dataSourceType === DataSourceType.API"
                name="apiEndpoint"
                label="Ссылка для загрузки данных"
                placeholder="/input-data, /select-data или /checkbox-data"
                required
                :error-message="newField.apiEndpointError"
                :model-value="newField.apiEndpoint"
                @update:model-value="updateApiEndpointInput"
            />
            <template v-if="dataSourceType === DataSourceType.STATIC">
                <UiInput
                    v-if="newField.tag === FieldTag.UI_INPUT || newField.tag === FieldTag.UI_SELECT"
                    name="startData"
                    label="Начальное значение в поле"
                    :error-message="newField.currentValueError"
                    :model-value="newField.currentValue"
                    @update:model-value="updateCurrentValue"
                />
                <UiCheckbox
                    v-if="newField.tag === FieldTag.UI_CHECKBOX"
                    name="startCheckboxValue"
                    label="Чекбокс выбран?"
                    :error-message="newField.currentValueError"
                    @update:model-value="updateCurrentValue"
                    :model-value="!!newField.currentValue"
                    class="start-position"
                />
                <UiInput
                    v-if="newField.tag === FieldTag.UI_SELECT"
                    name="options"
                    label="Опции в списке, через запятую"
                    required
                    :error-message="newField.optionsError"
                    :model-value="newField.options?.join(', ')"
                    @update:model-value="updateOptionsInput"
                />
            </template>
        </template>
        <template v-if="newField.tag === FieldTag.UI_BUTTON">
            <UiInput
                name="text"
                label="Надпись на кнопке"
                required
                :error-message="newField.buttonTextError"
                :model-value="newField.text"
                @update:model-value="updateButtonTextInput"
            />
            <UiSelect
                label="Выберите тип кнопки"
                name="buttonType"
                required
                :options="buttonTypeOptions"
                v-model="newField.type"
            />
        </template>
        <div class="row">
            <div class="col text-center">
                <UiButton :type="ButtonType.SUBMIT" :text="editing ? 'Сохранить' : 'Добавить'" />
            </div>
            <div class="col text-center">
                <UiButton :type="ButtonType.RESET" text="Отмена" />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import UiCheckbox from "@/components/ui/UiCheckbox.vue";
import UiInput from "@/components/ui/UiInput.vue";
import UiSelect from "@/components/ui/UiSelect.vue";
import { Ref, ref, watch } from "vue";
import UiButton from "@/components/ui/UiButton.vue";
import { ButtonType, DataSourceType, FieldTag, FormField, ValidatedFormField } from "@/typespaces/types";
import { buttonTypeOptions, dataSourceSelect, typeFieldSelect } from "@/constants/constants";
import { getDefaultField, validateFormBuilder } from "@/helpers/helpers";

const props = defineProps<{
    component: FormField | null;
    editing: boolean;
}>();

watch(
    () => props.component,
    (newValue) => {
        newField.value = newValue || getDefaultField(FieldTag.UI_INPUT);
    }
);

const emit = defineEmits(["saveField", "cancel"]);
const newField: Ref<ValidatedFormField> = ref(props.component || getDefaultField(FieldTag.UI_INPUT));

function changeFieldType(event: string) {
    const newDefault = getDefaultField(event as FieldTag);
    if (newField.value.name) {
        newDefault.name = newField.value.name;
    }
    newField.value = newDefault;
}

function updateLabelInput(event: string) {
    newField.value.label = event;
    delete newField.value.labelError;
}

function updateButtonTextInput(event: string) {
    newField.value.text = event;
    delete newField.value.buttonTextError;
}

function updateCurrentValue(event: string | boolean) {
    newField.value.currentValue = event;
    delete newField.value.currentValueError;
}

function updateApiEndpointInput(event: string) {
    newField.value.apiEndpoint = event;
    delete newField.value.apiEndpointError;
}

function updateOptionsInput(event: string) {
    newField.value.options = event
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);
    delete newField.value.optionsError;
}

const dataSourceType = ref(DataSourceType.STATIC);

function changeDataSourceType(event: string) {
    switch (event as DataSourceType) {
        case DataSourceType.STATIC: {
            dataSourceType.value = DataSourceType.STATIC;
            newField.value.currentValue = "";
            delete newField.value.apiEndpoint;
            if (newField.value.tag === FieldTag.UI_SELECT) {
                newField.value.options = [];
            }
            break;
        }
        case DataSourceType.API: {
            dataSourceType.value = DataSourceType.API;
            newField.value.apiEndpoint = "";
            delete newField.value.currentValue;
            delete newField.value.options;
        }
    }
}

function onSubmit() {
    const { isValid, validatedField } = validateFormBuilder({
        newFieldData: newField.value,
        sourceType: dataSourceType.value,
    });
    if (!isValid) {
        newField.value = validatedField;
        return;
    }
    emit("saveField", validatedField);
    newField.value = getDefaultField(FieldTag.UI_INPUT);
}

function onReset() {
    newField.value = getDefaultField(FieldTag.UI_INPUT);
    emit("cancel");
}
</script>

<style scoped lang="scss">
.field-builder {
    display: grid;
}

.start-position {
    justify-self: start;
}
</style>
