
import type { AxiosResponse } from "axios";
import axios from "axios";
import {useMessagesStore} from "@/stores/message";


export const handleApiError = (error: any) => {
    if (axios.isCancel(error)) {
        return;
    }
    const messagesStore = useMessagesStore();

    if (error.message === "Network Error") {
        messagesStore.setMessage("Нет соединения с сервером.");
        return;
    }

    if (axios.isAxiosError(error)) {
        if (error.response) {
            // The server responded with a status code outside 2xx
            if (error.response.status === 500) {
                messagesStore.setMessage("Ошибка на сервере, статус 500. Пожалуйста, обратитесь к администратору.");
            } else {
                messagesStore.setMessage(`Ошибка на сервере: ${error.response.status}: ${error.response.statusText}`);
            }
        }
        return;
    }
    messagesStore.setMessage(error);
};

export const validateApiResponseSuccess = (response: AxiosResponse) => {
    if (!response.data.success) {
        throw (
            response.data.error ||
            response.data.errors?.join(", ") ||
            "Неизвестная ошибка. Сервер не предоставил описания"
        );
    }
};

