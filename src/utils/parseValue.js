export const parseValue = (waterValue) => {
    if (typeof waterValue === 'string' && waterValue.endsWith('ml')) {
        return waterValue = parseInt(waterValue.replace('ml', ''), 10);
    };
    if (typeof waterValue === 'string') {
        return waterValue = parseInt(waterValue);
    };
    if (typeof waterValue === 'number') {
        return waterValue;
    }
};