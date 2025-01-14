import React from 'react';
import { useAbstractSubmissionStore } from '@/store/abstractSubmissionStore';
import { format, isAfter, isBefore, isWithinInterval } from 'date-fns';
import { hu } from 'date-fns/locale';
import clsx from 'clsx';

const AbstractTimeline: React.FC = () => {
    const { process } = useAbstractSubmissionStore();

    if (!process) return null;

    const now = new Date();
    const startDate = new Date(process.startDate);
    const submissionDeadline = new Date(process.submissionDeadline);
    const reviewDeadline = new Date(process.reviewDeadline);
    const endDate = new Date(process.endDate);

    const totalDuration = endDate.getTime() - startDate.getTime();
    const getPosition = (date: Date) => {
        return ((date.getTime() - startDate.getTime()) / totalDuration) * 100;
    };

    const getCurrentPhase = () => {
        if (isBefore(now, startDate)) return 'not_started';
        if (isBefore(now, submissionDeadline)) return 'submission';
        if (isBefore(now, reviewDeadline)) return 'review';
        if (isBefore(now, endDate)) return 'decision';
        return 'completed';
    };

    const currentPhase = getCurrentPhase();

    return (
        <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-8 mb-8">
            <div className="relative h-32">
                {/* Timeline bar */}
                <div className="absolute top-16 left-0 right-0 h-2 bg-white/10 rounded-full">
                    <div
                        className={clsx(
                            "absolute h-full rounded-full transition-all duration-500",
                            {
                                'bg-accent': currentPhase !== 'not_started',
                                'w-0': currentPhase === 'not_started',
                                'w-1/3': currentPhase === 'submission',
                                'w-2/3': currentPhase === 'review',
                                'w-full': currentPhase === 'decision' || currentPhase === 'completed'
                            }
                        )}
                    />
                </div>

                {/* Timeline points */}
                {[
                    { date: startDate, label: 'Kezdés', phase: 'start' },
                    { date: submissionDeadline, label: 'Beadási határidő', phase: 'submission' },
                    { date: reviewDeadline, label: 'Bírálati határidő', phase: 'review' },
                    { date: endDate, label: 'Lezárás', phase: 'end' }
                ].map(({ date, label, phase }) => {
                    const position = getPosition(date);
                    const isActive = isAfter(now, date) || isWithinInterval(now, {
                        start: startDate,
                        end: date
                    });

                    return (
                        <div
                            key={phase}
                            className="absolute top-0 transform -translate-x-1/2 w-32 flex flex-col items-center"
                            style={{ left: `${position}%` }}
                        >
                            <span className="text-sm text-white/70 mb-2 text-center">
                                {format(date, 'yyyy. MM. dd.', { locale: hu })}
                            </span>
                            <div
                                className={clsx(
                                    "w-4 h-4 rounded-full border-2 transition-colors duration-300 mb-2",
                                    isActive
                                        ? "border-accent bg-accent"
                                        : "border-white/30 bg-navy"
                                )}
                            />
                            <span className={clsx(
                                "text-sm font-medium text-center",
                                isActive ? "text-white" : "text-white/50"
                            )}>
                                {label}
                            </span>
                        </div>
                    );
                })}

                {/* Current time indicator */}
                <div
                    className="absolute top-12 bottom-12 w-px bg-accent transition-all duration-300"
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