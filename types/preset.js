import * as components from './components';
import version from './version';
import { componentPrefix } from './config';
const componentArray = Object.keys(components).map(key => components[key]);
const create = {
    version,
    componentPrefix,
    install(app) {
        componentArray.forEach(component => {
            app.use(component);
        });
    }
};
export default create;
