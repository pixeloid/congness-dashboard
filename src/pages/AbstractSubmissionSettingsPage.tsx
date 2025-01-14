import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAbstractSubmissionStore } from '@/store/abstractSubmissionStore';
import CategoryList from '@/components/abstracts/CategoryList';
import CategoryForm from '@/components/abstracts/CategoryForm';
import InvitationList from '@/components/abstracts/InvitationList';
import InviteSubmitterModal from '@/components/abstracts/InviteSubmitterModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { PlusIcon, EnvelopeIcon, LinkIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { AbstractCategory } from '@/types/abstractSubmission';
import AbstractTimeline from '@/components/abstracts/AbstractTimeline';

const AbstractSubmissionSettingsPage = () => {
  const { occasionId } = useParams<{ occasionId: string }>();
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AbstractCategory | undefined>(undefined);
  const [showCopied, setShowCopied] = useState(false);

  const {
    process,
    categories,
    invitations,
    isLoading,
    error,
    actions
  } = useAbstractSubmissionStore();

  useEffect(() => {
    if (occasionId) {
      const id = parseInt(occasionId);
      actions.fetchSubmissionProcess(id);
      actions.fetchCategories(id);
      actions.fetchInvitations(id);
    }
  }, [occasionId, actions]);

  const handleTogglePublic = () => {
    if (process && occasionId) {
      actions.updateSubmissionProcess(parseInt(occasionId), {
        isPublic: !process.isPublic
      });
    }
  };

  const handleDeadlineChange = (field: 'submissionDeadline' | 'reviewDeadline', value: string) => {
    if (process && occasionId) {
      const newDate = new Date(value);
      // Ensure end of day for deadlines
      newDate.setHours(23, 59, 59, 999);

      actions.updateSubmissionProcess(parseInt(occasionId), {
        [field]: newDate.toISOString()
      });
    }
  };

  const copyPublicUrl = () => {
    if (occasionId) {
      const url = `${window.location.origin}/occasions/${occasionId}/abstracts/new`;
      navigator.clipboard.writeText(url);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Abstract Submission Settings</h1>
        <p className="text-lg text-white/70">Manage abstract categories and invitations</p>
      </div>
      <AbstractTimeline />

      <div className="bg-navy/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Submission Process</h2>
            <p className="text-white/70 mt-1">Configure how abstracts can be submitted</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Deadlines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Abstract Submission Deadline*
              </label>
              <input
                type="datetime-local"
                value={process?.submissionDeadline ? format(new Date(process.submissionDeadline), "yyyy-MM-dd'T'HH:mm") : ''}
                onChange={(e) => handleDeadlineChange('submissionDeadline', e.target.value)}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                required
              />
              <p className="mt-1 text-sm text-white/50">
                After this date, no new submissions will be accepted
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Review Period Deadline*
              </label>
              <input
                type="datetime-local"
                value={process?.reviewDeadline ? format(new Date(process.reviewDeadline), "yyyy-MM-dd'T'HH:mm") : ''}
                onChange={(e) => handleDeadlineChange('reviewDeadline', e.target.value)}
                className="w-full px-4 py-2 bg-navy/30 border border-white/10 rounded-lg text-white"
                required
              />
              <p className="mt-1 text-sm text-white/50">
                After this date, chief reviewer can make final decisions
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-navy/50 rounded-lg border border-white/10">
            <h3 className="text-lg font-medium text-white mb-2">Deadline Information</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>• Submission deadline: No new abstracts can be submitted after this date</li>
              <li>• Review deadline: Scientific reviewers can submit reviews until this date</li>
              <li>• Chief reviewer can make final decisions only after review deadline</li>
              <li>• All deadlines are set to end of day (23:59:59)</li>
            </ul>
          </div>

          {/* Public Submission Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={process?.isPublic}
                  onChange={handleTogglePublic}
                  className="h-4 w-4 rounded border-white/10 bg-navy/30 text-accent"
                />
                <span className="text-white">Allow Public Submissions</span>
              </label>
              <p className="text-sm text-white/70 mt-1">
                Enable this to allow submissions without invitations
              </p>
            </div>
            {process?.isPublic && (
              <button
                onClick={copyPublicUrl}
                className="inline-flex items-center px-4 py-2 bg-navy/50 text-white rounded-lg border border-white/10 hover:border-accent/30"
              >
                <LinkIcon className="h-5 w-5 mr-2" />
                {showCopied ? 'Copied!' : 'Copy Public URL'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Categories</h2>
            <button
              onClick={() => setIsCategoryFormOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-accent text-navy-dark rounded-lg"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Category
            </button>
          </div>

          <CategoryList
            categories={categories}
            onEdit={(category) => {
              setEditingCategory(category);
              setIsCategoryFormOpen(true);
            }}
            onDelete={(id) => actions.deleteCategory(id)}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Invitations</h2>
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-accent text-navy-dark rounded-lg"
            >
              <EnvelopeIcon className="h-5 w-5 mr-2" />
              Invite Submitter
            </button>
          </div>

          <InvitationList
            invitations={invitations}
            onResend={(id) => actions.resendInvitation(id)}
          />
        </div>
      </div>

      <CategoryForm
        isOpen={isCategoryFormOpen}
        onClose={() => {
          setIsCategoryFormOpen(false);
          setEditingCategory(undefined);
        }}
        onSubmit={(category) => {
          if (editingCategory) {
            actions.updateCategory(editingCategory.id, category);
          } else {
            actions.addCategory(category);
          }
          setIsCategoryFormOpen(false);
          setEditingCategory(undefined);
        }}
        initialData={editingCategory}
      />

      <InviteSubmitterModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={(email) => {
          if (occasionId) {
            actions.sendInvitation(email, parseInt(occasionId));
            setIsInviteModalOpen(false);
          }
        }}
      />
    </div>
  );
};

export default AbstractSubmissionSettingsPage;