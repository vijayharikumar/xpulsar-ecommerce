// 1.Convert snake_case to camelCase

function snakeToCamel(snakeStr) {
    return snakeStr.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

console.log(snakeToCamel("snake_case"));






// 2.Sum Nested Object Values 

function sumValues(obj) {
    return Object.values(obj).reduce((sum, val) => sum + (typeof val === 'object' ? sumValues(val) : (typeof val === 'number' ? val : 0)), 0);
}


console.log(sumValues({ a: 1, b: { c: 2, d: { e: 3 } } })); // ➝ 6


// 3.Human-Readable Time Formatter 

function formatTimeAgo(dateStr) {
    const now = new Date();
    const past = new Date(dateStr);

    // Calculate the difference in days
    const diffInDays = Math.floor((now - past) / (24 * 60 * 60 * 1000));

    if (diffInDays === 0) return "today";
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInDays / 365)} year${Math.floor(diffInDays / 365) > 1 ? 's' : ''} ago`;
}

console.log(formatTimeAgo('2024-01-01'));
