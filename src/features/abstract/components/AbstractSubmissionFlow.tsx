import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { useAbstractStore } from '@/features/abstract/store/abstractStore';
import AbstractForm from './AbstractForm';

interface AbstractSubmissionFlowProps {
  occasionId: number;
  onComplete: () => void;
}

const AbstractSubmissionFlow: React.FC<AbstractSubmissionFlowProps> = ({ occasionId, onComplete }) => {
  const { user } = useAuthStore();
  const { actions } = useAbstractStore();

  const handleSubmit = async (data: any) => {
    if (!user) return;

    const abstractData = {
      ...data,
      submitterId: user.id,
      occasionId: occasionId
    };

    try {
      await actions.submitAbstract(abstractData);
      onComplete();
    } catch (error) {
      console.error('Failed to submit abstract:', error);
    }
  };

  return <AbstractForm onSubmit={handleSubmit} />;
};

export default AbstractSubmissionFlow;