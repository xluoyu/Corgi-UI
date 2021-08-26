import { defineComponent, onMounted, reactive, ref } from 'vue';
import styleVar from './styleVar';
export default defineComponent({
    name: 'CgScrollbar',
    props: {
        y: Boolean,
        x: Boolean,
        show: {
            type: String,
            default: 'hover'
        },
        thrumbClass: String,
        thrumbStyle: String,
        scrollClass: String,
        scrollStyle: String,
        loadHeight: Number,
        loadMore: Function
    },
    setup(props) {
        const containerEl = ref(null);
        let containerHeight = 0;
        const contentEl = ref(null);
        const verticalEl = ref(null);
        const vertical = reactive < IVertical > ({
            el: null,
            height: 0,
            thrumbHeight: 0,
            thrumbY: 0
        });
        const getVerticalHeight = () => {
            let contentH = contentEl.value.clientHeight;
            vertical.thrumbHeight = containerHeight / contentH * vertical.height;
        };
        let hasLoad = false;
        const addScroll = () => {
            containerEl.value?.addEventListener('scroll', () => {
                let boxScrollTop = containerEl.value.scrollTop;
                let contentH = contentEl.value.clientHeight;
                vertical.thrumbY = boxScrollTop / contentH * vertical.height;
                if (props.loadMore && contentH - (boxScrollTop + containerHeight) < 50 && !hasLoad) {
                    hasLoad = true;
                    props.loadMore();
                }
            });
        };
        const update = () => {
            hasLoad = false;
            getVerticalHeight();
        };
        onMounted(() => {
            containerHeight = containerEl.value.clientHeight;
            vertical.height = vertical.el.clientHeight;
            getVerticalHeight();
            addScroll();
        });
        const thrumbVerticalMouseDown = (e) => {
            e.stopPropagation();
            let start = e.pageY;
            let contentH = contentEl.value.clientHeight;
            let scrollTop = containerEl.value.scrollTop;
            // let thrumbH = thrumbY.value
            console.log('开始');
            const move = (event) => {
                let distance = event.pageY - start;
                containerEl.value.scrollTop = scrollTop + distance / vertical.height * contentH;
            };
            const up = () => {
                console.log('up');
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
            };
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
        };
        return {
            verticalEl,
            vertical,
            containerEl,
            update,
            thrumbVerticalMouseDown,
            contentEl,
            styleVar
        };
    }
});
