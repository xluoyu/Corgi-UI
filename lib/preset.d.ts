import { App } from 'vue';
declare const create: {
    version: string;
    componentPrefix: string;
    install(app: App): void;
};
export default create;
