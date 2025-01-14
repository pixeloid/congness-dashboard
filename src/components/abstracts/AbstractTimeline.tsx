import React from 'react';
import { useAbstractSubmissionStore } from '@/store/abstractSubmissionStore';
import { format, isAfter, isBefore, isWithinInterval, differenceInDays } from 'date-fns';
import { hu } from 'date-fns/locale';
import clsx from 'clsx';
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';

const AbstractTimeline: React.FC = () => {
    const { process } = useAbstractSubmissionStore();

    if (!process) return null;

    const now = new Date();
    const startDate = new Date(process.startDate);
    const submissionDeadline = new Date(process.submissionDeadline);
    const reviewDeadline = new Date(process.reviewDeadline);
    const chiefReviewDeadline = new Date(process.chiefReviewDeadline);
    const endDate = new Date(process.endDate);

    const totalDuration = endDate.getTime() - startDate.getTime();
    const getPosition = (date: Date) => {
        return ((date.getTime() - startDate.getTime()) / totalDuration) * 100;
    };

    const getProgress = () => {
        if (isBefore(now, startDate)) return 0;
        if (isAfter(now, endDate)) return 100;
        return ((now.getTime() - startDate.getTime()) / totalDuration) * 100;
    }
    const getDaysRemaining = (date: Date) => {
        const days = differenceInDays(date, now);
        if (days < 0) return 'Expired';
        if (days === 0) return 'Today';
        return `${days} days remaining`;
    };

    const getStatusIcon = (date: Date) => {
        if (isAfter(now, date)) {
            return <CheckCircleIcon className="h-5 w-5 text-green-400" />;
        }
        if (isWithinInterval(now, { start: startDate, end: date })) {
            return <ClockIcon className="h-5 w-5 text-yellow-400 animate-pulse" />;
        }
        return <XCircleIcon className="h-5 w-5 text-white/30" />;
    };


    //  const getCurrentPhase = () => {
    //      if (isBefore(now, startDate)) return 'not_started';
    //      if (isBefore(now, submissionDeadline)) return 'submission';
    //      if (isBefore(now, reviewDeadline)) return 'review';
    //      if (isBefore(now, chiefReviewDeadline)) return 'chief_review';
    //      if (isBefore(now, endDate)) return 'completed';
    //      return 'completed';
    //  };

    // const currentPhase = getCurrentPhase();

    return (
        <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 py-6 px-24 mb-8">
            <div className="relative h-48">
                {/* Timeline bar */}
                <div className="absolute top-24 left-0 right-0 h-2 bg-white/10 rounded-full">
                    <div
                        className={clsx(
                            "absolute h-full rounded-full transition-all duration-500 shadow-glow bg-accent",
                        )}
                        style={{ width: `${getProgress()}%` }}
                    />
                </div>

                {/* Timeline points */}
                {[
                    { date: startDate, label: 'Kezdés', phase: 'start' },
                    { date: submissionDeadline, label: 'Beadási határidő', phase: 'submission' },
                    { date: reviewDeadline, label: 'Bírálati határidő', phase: 'review' },
                    { date: chiefReviewDeadline, label: 'Főbírálói határidő', phase: 'chief_review' },
                    { date: endDate, label: 'Lezárás', phase: 'end' }
                ].map(({ date, label, phase }) => {
                    const position = getPosition(date);
                    const isActive = isAfter(now, date) || isWithinInterval(now, {
                        start: startDate,
                        end: date
                    });
                    const daysRemaining = getDaysRemaining(date);
                    const statusIcon = getStatusIcon(date);

                    return (
                        <div
                            key={phase}
                            className="absolute top-8 transform -translate-x-1/2 w-40 flex flex-col items-center"
                            style={{ left: `${position}%` }}
                        >
                            <span className="text-sm text-white/70 mb-1 text-center">
                                {format(date, 'yyyy. MM. dd.', { locale: hu })}
                            </span>
                            <div
                                className={clsx(
                                    "w-6 h-6 rounded-full border-2 transition-all duration-300 mb-2 flex items-center justify-center",
                                    isActive
                                        ? "border-accent bg-accent/20"
                                        : "border-white/30 bg-navy"
                                )}
                            >
                                {statusIcon}
                            </div>
                            <span className={clsx(
                                "text-sm font-medium text-center",
                                isActive ? "text-white" : "text-white/50"
                            )}>
                                {label}
                            </span>
                            <span className={clsx(
                                "text-xs mt-1",
                                isActive ? "text-accent" : "text-white/30"
                            )}>
                                {daysRemaining}
                            </span>
                        </div>
                    );
                })}

                {/* Current time indicator */}
                <div
                    className="absolute top-20 bottom-20 w-px bg-accent shadow-glow transition-all duration-300"
                    style={{ left: `${getPosition(now)}%` }}
                >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-accent text-navy-dark rounded text-xs font-medium whitespace-nowrap">
                        Most
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AbstractTimeline;