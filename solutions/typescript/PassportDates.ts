function convertDate(input: string): string {
    const parts = input.split(' ');
    const day = parts[0];
    const yearTwoDigits = parts[3];
    const icelandicMonth = parts[1];
    const englishMonth = parts[2];
    const monthMapIcelandic: { [key: string]: number } = {
        'JAN': 1, 'FEB': 2, 'MAR': 3, 'APR': 4, 'MAÍ': 5, 'JÚN': 6,
        'JÚL': 7, 'ÁGÚ': 8, 'SEP': 9, 'OKT': 10, 'NÓV': 11, 'DES': 12
    };
    const monthMapEnglish: { [key: string]: number } = {
        'JAN': 1, 'FEB': 2, 'MAR': 3, 'APR': 4, 'MAY': 5, 'JUN': 6,
        'JUL': 7, 'AUG': 8, 'SEP': 9, 'OCT': 10, 'NOV': 11, 'DEC': 12
    };
    const monthNumber = monthMapIcelandic[icelandicMonth];
    if (monthNumber !== monthMapEnglish[englishMonth]) {
        throw new Error("Invalid month abbreviations");
    }
    const currentYear = new Date().getFullYear();
    const century = Math.floor(currentYear / 100) * 100;
    let yearFourDigits = parseInt(yearTwoDigits, 10) + century;
    if (yearFourDigits < 2015 || yearFourDigits > 2035) {
        throw new Error("Year out of valid range");
    }
    const formattedDay = day.padStart(2, '0');
    const formattedMonth = monthNumber.toString().padStart(2, '0');
    return `${yearFourDigits}-${formattedMonth}-${formattedDay}`;
}
const input = "08 OKT /OCT 24";
const output = convertDate(input);
console.log(output);