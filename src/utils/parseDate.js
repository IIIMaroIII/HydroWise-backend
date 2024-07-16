export const parseDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Місяці починаються з 0
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = {
        day,
        month,
        year,
        hours,
        minutes
    };

    return formattedDate;
};