export const decodeHtmlEntities = (text?: string): string => {
    if (!text) return '';
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
};
