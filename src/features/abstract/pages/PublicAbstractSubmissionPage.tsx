import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAbstractSubmissionStore } from '@/features/abstract/store/abstractSubmissionStore';
import AbstractForm from '@/features/abstract/components/AbstractForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { AbstractInvitation } from '@/features/abstract/types/abstractSubmission';

const PublicAbstractSubmissionPage = () => {
  const location = useLocation();

  // Function to get query parameter by name
  const getQueryParam = (param: string) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };

  // Get the token from the query string
  const token = getQueryParam('token');
  const navigate = useNavigate();
  const [invitation, setInvitation] = useState<AbstractInvitation | null>(null);
  const { isLoading, error, actions } = useAbstractSubmissionStore();

  useEffect(() => {
    const validateInvitation = async () => {
      if (!token) {
        navigate('/');
        return;
      }

      const result = await actions.validateInvitationToken(token);
      if (!result) {
        navigate('/');
        return;
      }

      setInvitation(result);
    };

    validateInvitation();
  }, [token, navigate, actions]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid or Expired Invitation</h2>
          <p className="text-gray-600">Please check your invitation link and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Submit Your Abstract
          </h1>
          <p className="text-xl text-gray-600">
            Please complete the form below to submit your abstract
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Submission Guidelines
            </h2>
            <ul className="text-gray-600 space-y-2">
              <li>• Maximum word count: 300 words</li>
              <li>• Include all authors and their affiliations</li>
              <li>• Clearly state your research objectives and methods</li>
              <li>• Highlight key findings and conclusions</li>
            </ul>
          </div>

          <AbstractForm
            onSubmit={async () => {
              try {
                if (token) {
                  await actions.handleInvitationResponse(token, true);
                } else {
                  console.error('Token is null');
                }
                navigate('/submission-success');
              } catch (error) {
                console.error('Failed to submit abstract:', error);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PublicAbstractSubmissionPage;