import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAbstractSubmissionStore } from '@/store/abstractSubmissionStore';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const InvitationResponsePage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [responded, setResponded] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { isLoading, error, actions } = useAbstractSubmissionStore();

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const invitation = await actions.validateInvitationToken(token);
        setIsValid(Boolean(invitation));
      } catch (error) {
        setIsValid(false);
      }
    };

    validateToken();
  }, [token, actions]);

  const handleResponse = async (accept: boolean) => {
    if (!token) return;
    try {
      await actions.handleInvitationResponse(token, accept);
      setResponded(true);
      setTimeout(() => {
        navigate(accept ? '/submit' : '/');
      }, 3000);
    } catch (error) {
      console.error('Failed to handle response:', error);
    }
  };

  if (isLoading || isValid === null) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!isValid) return <ErrorMessage message="Invalid or expired invitation token" />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-navy/30 backdrop-blur-md rounded-xl p-8 border border-white/10">
        {responded ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Thank you for your response
            </h2>
            <p className="text-white/70">
              You will be redirected shortly...
            </p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Abstract Submission Invitation
              </h2>
              <p className="text-white/70 mb-8">
                You have been invited to submit an abstract. Would you like to proceed?
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleResponse(true)}
                className="flex-1 px-4 py-2 bg-accent text-navy-dark rounded-lg hover:bg-accent-light transition-colors"
              >
                Accept
              </button>
              <button
                onClick={() => handleResponse(false)}
                className="flex-1 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                Decline
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InvitationResponsePage;