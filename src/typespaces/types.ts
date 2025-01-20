export type FormField = {
    name: string,
    tag: FieldTag,
    label?: string,
    required?: boolean,
    options?: SelectOption[],
    apiEndpoint?: string,
    currentValue?: string | boolean,
    text?: string,
    type?: ButtonType,
    errorMessage?: string,
}

export type ValidatedFormField = FormField & {
    labelError?: string,
    buttonTextError?: string,
    currentValueError?: string,
    apiEndpointError?: string,
    optionsError?: string,
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

export enum ButtonType {
    SUBMIT = "submit",
    RESET = "reset",
    BUTTON = "button",
}

export type SelectOption = string | {value: string, title: string}

export enum DataSourceType {
    STATIC = "static",
    API = "api",
}
