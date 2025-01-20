import {createServer, JSONAPISerializer} from "miragejs";

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
                            method: "/api/save-form",
                            name: "Новый разработчик",
                            fields: [
                                {
                                    "name": "0.5110964991950355",
                                    "tag": "UiInput",
                                    "required": true,
                                    "currentValue": "Михаил Чеглок",
                                    "label": "Имя"
                                }, {
                                    "name": "0.5110964991950355",
                                    "tag": "UiCheckbox",
                                    "required": true,
                                    "currentValue": true,
                                    "label": "Хочет в команду"
                                }, {
                                    "name": "0.5110964991950355",
                                    "tag": "UiSelect",
                                    "required": true,
                                    "label": "Возьмёте в команду?",
                                    "options": ["Да", "Конечно", "Определённо"],
                                }, {
                                    "name": "0.5110964991950355",
                                    "tag": "UiButton",
                                    "text": "Применить",
                                    "type": "submit"
                                }
                            ],
                        },
                        {
                            method: "/api/save-form",
                            name: "Создать заметку",
                            fields: [
                                {
                                    "name": "0.5110964991950355",
                                    "tag": "UiInput",
                                    "required": true,
                                    "currentValue": "",
                                    "label": "Текст заметки"
                                }, {
                                    "name": "0.5110964991950355",
                                    "tag": "UiButton",
                                    "text": "Отправить заметку",
                                    "type": "submit"
                                },
                                {
                                    "name": "0.5110964991950355",
                                    "tag": "UiButton",
                                    "text": "Очистить",
                                    "type": "reset"
                                }
                            ],
                        },
                    ]
                };
            }, {timing: 3000});
        },
    })
}
