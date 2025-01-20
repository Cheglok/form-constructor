import {createServer, JSONAPISerializer} from "miragejs";
import {makeUniqueName} from "@/helpers/helpers.ts";

export function startMockServer() {
    createServer({
        serializers: {
            application: JSONAPISerializer,
        },
        routes() {
            this.namespace = "api"

            this.get("/input-data", () => {
                return "Значение из Апи";
            }, {timing: 1000});

            this.get("/checkbox-data", () => {
                return {
                    checked: false,
                };
            }, {timing: 1000});

            this.get("/select-data", () => {
                return {
                    options: [
                        "Server Option 1",
                        "Server Option 2",
                        "Server Option 3"
                        ],
                    value: "Server Option 2",
                }
            });

            // Сохранение формы
            this.post("/save-form", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                return {success: true, message: "Форма сохранена", fields: attrs};
            });

            // Получение сохранённых форм
            this.get("/saved-forms", () => {
                return {
                    forms: [
                        {
                            id: 1,
                            name: "Sample Form",
                            fields: [
                                {
                                    tag: "UiInput",
                                    props: {
                                        label: "Enter your name",
                                        required: true,
                                        name: makeUniqueName(),
                                        apiEndpoint: "/api/input-data",
                                        model: "test",
                                    },
                                },
                                {
                                    tag: "UiButton",
                                    props: {
                                        type: "button",
                                        text: "Submit",
                                    },
                                },
                                {
                                    tag: "UiCheckbox",
                                    props: {
                                        label: "checkbox label",
                                        required: true,
                                        apiEndpoint: "/api/checkbox-data",
                                        name: makeUniqueName(),
                                        model: true,
                                    },
                                },
                                {
                                    tag: "UiSelect",
                                    props: {
                                        label: "text",
                                        options: ["Option 1", "Option 2", "Option 3", "Option selected"],
                                        required: true,
                                        placeholder: "Enter your name",
                                        apiEndpoint: "/api/select-data",
                                        model: "Option selected"
                                    },
                                }
                            ],
                        },
                    ]
                };
            });
        },
    })
}
