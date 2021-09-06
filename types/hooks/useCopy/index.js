export const useCopy = (content) => {
    return navigator.clipboard.writeText(content);
};
