export function convertDate(date: string): string {
    
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    return new Date(date).toLocaleDateString('en-GB', options); // Use 'en-GB' for day-month order
    
}
