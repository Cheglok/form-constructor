import {DataSourceType, FieldTag, Form, FormField} from "@/typespaces/types";
import {makeUniqueName} from "@/helpers/helpers";

export const typeFieldSelect = [
    {value: "UiButton", title: "Кнопку"},
    {value: "UiCheckbox", title: "Чекбокс"},
    {value: "UiInput", title: "Текстовое поле"},
    {value: "UiSelect", title: "Селект"},
]
export const buttonTypeOptions = [
    {value: "submit", title: "Кнопка подтверждения"},
    {value: "reset", title: "Кнопка отмены"},
]
export const dataSourceSelect = [
    {value: DataSourceType.STATIC, title: "Введу сам"},
    {value: DataSourceType.API, title: "Загрузка с сервера"},
]

export const defaultFields: Record<FieldTag, FormField> = {
    [FieldTag.UI_INPUT]: {
        name: makeUniqueName(),
        tag: FieldTag.UI_INPUT,
        required: true,
        currentValue: "",
        label: "",
    },
    [FieldTag.UI_CHECKBOX]: {
        name: makeUniqueName(),
        tag: FieldTag.UI_CHECKBOX,
        required: true,
        currentValue: true,
        label: "",
    },
    [FieldTag.UI_BUTTON]: {
        name: makeUniqueName(),
        tag: FieldTag.UI_BUTTON,
        text: "",
        type: "submit",
    },
    [FieldTag.UI_SELECT]: {
        name: makeUniqueName(),
        tag: FieldTag.UI_SELECT,
        required: true,
        label: "",
        options: [],
    },
}

export const defaultForm: Form = {
    name: "",
    method: "",
    fields: [],
}
