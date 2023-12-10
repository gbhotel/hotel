

export default function formatElapsedTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = [];

    if (hours > 0) {
        formattedTime.push(`${hours} ч.`);
    }

    if (minutes > 0) {
        formattedTime.push(`${minutes} мин.`);
    }

    if (remainingSeconds > 0) {
        formattedTime.push(`${remainingSeconds} сек.`);
    }

    return formattedTime.join(' ');
};
