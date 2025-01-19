import {defineAsyncComponent} from "vue";

export function resolveUiComponent(tag: string) {
    return defineAsyncComponent(() => import(`./Ui${tag.charAt(0).toUpperCase() + tag.slice(1)}.vue`));
}