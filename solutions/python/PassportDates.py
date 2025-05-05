def convert_date_format(input_date):
    parts = input_date.split()
    day = parts[0]
    icelandic_month_abbr = parts[1]
    english_month_abbr = parts[2][1:]  
    year = parts[3]
    month_mapping = {
        'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04',
        'MAÍ': '05', 'JÚN': '06', 'JÚL': '07', 'ÁGÚ': '08',
        'SEP': '09', 'OKT': '10', 'NÓV': '11', 'DES': '12'
    }
    month_number = month_mapping.get(icelandic_month_abbr)
    full_year = '20' + year
    iso_date = f"{full_year}-{month_number}-{day}"
    return iso_date
input_date = "08 OKT /OCT 24"
output_date = convert_date_format(input_date)
print(output_date)