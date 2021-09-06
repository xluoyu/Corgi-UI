import CgMenuItem from './MenuItem.vue';
import CgMenuGroup from './MenuGroup.vue';
import CgMenuSubmenu from './SubMenu.vue';
import { h } from 'vue';
export default function itemRender(item, space) {
    if (item.children) {
        if (item.type === 'group') {
            return h(CgMenuGroup, { options: item, space });
        }
        if (item.type === 'submenu') {
            return h(CgMenuSubmenu, { options: item, space });
        }
    }
    else {
        return h(CgMenuItem, { options: item, space });
    }
}
