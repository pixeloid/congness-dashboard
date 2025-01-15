import { CheckCircleIcon } from '@heroicons/react/24/outline';

const SubmissionSuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-md w-full mx-4">
        <div className="text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Abstract Submitted Successfully
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your submission. We will review your abstract and get back to you soon.
          </p>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h2>
            <ul className="text-left text-gray-600 space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-3 mt-0.5">1</span>
                <span>You will receive a confirmation email shortly</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-3 mt-0.5">2</span>
                <span>Our review committee will evaluate your submission</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-3 mt-0.5">3</span>
                <span>You will be notified of the decision within 2-3 weeks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccessPage;