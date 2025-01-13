import React, { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

interface ReviewDeadlineCountdownProps {
    deadline: string;
}

const ReviewDeadlineCountdown: React.FC<ReviewDeadlineCountdownProps> = ({ deadline }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const deadlineDate = new Date(deadline);

            if (deadlineDate <= now) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0 });
                return;
            }

            const days = differenceInDays(deadlineDate, now);
            const hours = differenceInHours(deadlineDate, now) % 24;
            const minutes = differenceInMinutes(deadlineDate, now) % 60;

            setTimeLeft({ days, hours, minutes });
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

        return () => clearInterval(timer);
    }, [deadline]);

    const isPastDeadline = new Date(deadline) <= new Date();

    if (isPastDeadline) {
        return (
            <div className="px-2 py-1 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 text-sm">
                Bírálati időszak lezárult
            </div>
        );
    }

    return (
        <div className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded-full border border-yellow-500/20 text-sm">
            <span className="font-medium">Hátralévő idő: </span>
            {timeLeft.days > 0 && <span>{timeLeft.days}n </span>}
            {timeLeft.hours > 0 && <span>{timeLeft.hours}ó </span>}
            <span>{timeLeft.minutes}p</span>
        </div>
    );
};

export default ReviewDeadlineCountdown;