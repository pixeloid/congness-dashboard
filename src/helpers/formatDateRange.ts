import { format, parseISO } from 'date-fns';
import { hu } from 'date-fns/locale';

export const formatDateRange = (startDate: string, endDate: string): string => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    if (format(start, 'yyyy. MMMM d.', { locale: hu }) === format(end, 'yyyy. MMMM d.', { locale: hu })) {
        return format(start, 'yyyy. MMMM d.', { locale: hu });
    }

    const startFormatted = format(start, 'yyyy. MMMM d.', { locale: hu });
    const startFormattedNoDot = format(start, 'yyyy. MMMM d', { locale: hu });
    const endFormattedDay = format(end, 'd.', { locale: hu });
    const endFormattedNoYear = format(end, 'MMMM d.', { locale: hu });

    const startMonth = format(start, 'MMMM', { locale: hu });
    const endMonth = format(end, 'MMMM', { locale: hu });

    if (startMonth === endMonth) {
        return `${startFormattedNoDot.split(' ')[0]} ${startMonth} ${startFormattedNoDot.split(' ')[2]}-${endFormattedDay}`;
    } else {
        return `${startFormatted} - ${endFormattedNoYear}`;
    }
};