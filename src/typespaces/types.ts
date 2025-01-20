export type FormField = {
    name: string,
    tag: FieldTag,
    label?: string,           // Заголовок
    required?: boolean,       // Обязательность
    options?: SelectOption[],      // Для dropdown
    optionsError?: string,
    apiEndpoint?: string,    // URL для загрузки данных
    currentValue?: string | boolean,
    text?: string,
    type?: "reset" | "submit",
    errorMessage?: string,
    labelError?: string,
    buttonTextError?: string,
    currentValueError?: string,
    apiEndpointError?: string,
}

export type Form = {
    name: string
    method: string,
    fields: FormField[],
}

export enum FieldTag {
    UI_INPUT = "UiInput",
    UI_CHECKBOX = "UiCheckbox",
    UI_SELECT = "UiSelect",
    UI_BUTTON = "UiButton",
}

export type SelectOption = string | {value: string, title: string}

export enum DataSourceType {
    STATIC = "static",
    API = "api",
}
