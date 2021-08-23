import version from './version';
import { componentPrefix } from './config';
import * as components from './components';
const componentArray = Object.keys(components).map(key => components[key]);
const create = {
    version,
    componentPrefix,
    install(app) {
        componentArray.forEach(component => {
            app.use(component.default);
        });
    }
};
export default create;
