import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import SchedulePage from './features/schedule/pages/SchedulePage';
import ParticipantsPage from './features/participant/pages/ParticipantsPage';
import ExhibitionsPage from './features/exhibition/pages/ExhibitionsPage';
import ExhibitionStaffPage from './features/exhibition/pages/ExhibitionStaffPage';
import ExhibitionHuntsPage from './features/exhibition-hunt/pages/ExhibitionHuntsPage';
import AbstractsPage from './features/abstract/pages/AbstractsPage';
import AbstractDetailsPage from './features/abstract/pages/AbstractDetailsPage';
import AbstractSubmissionPage from './features/abstract/pages/AbstractSubmissionPage';
import AbstractReviewPage from './features/abstract/pages/AbstractReviewPage';
import AbstractSubmissionSettingsPage from './features/abstract/pages/AbstractSubmissionSettingsPage';
import PublicAbstractSubmissionPage from './features/abstract/pages/PublicAbstractSubmissionPage';
import SubmissionSuccessPage from './features/abstract/pages/SubmissionSuccessPage';
import InvitationResponsePage from './features/abstract/components/InvitationResponsePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import OccasionSelectionPage from './features/occasion/pages/OccasionSelectionPage';
import AuthGuard from './components/auth/AuthGuard';
import CheckpointsPage from '@/features/checkpoints/pages/CheckpointsPage';
import { UserRole } from '@/types/auth';
import OccasionsPage from '@/features/occasion/pages/OccasionsPage';
import OccasionDetailsPage from '@/features/occasion/pages/OccasionDetailsPage';
import EventsPage from '@/features/calendar/pages/EventsPage';
import TimelinePage from '@/features/abstract/pages/TimelinePage';
import CalendarPage from '@/features/calendar/pages/CalendarPage';

const App = () => {
  const { actions } = useAuthStore();

  useEffect(() => {
    actions.checkAuth();
  }, [actions]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<EventsPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/abstracts/invitation/:token" element={<InvitationResponsePage />} />
        <Route path="/abstracts/submission-success" element={<SubmissionSuccessPage />} />
        <Route path="/abstracts/submit" element={<PublicAbstractSubmissionPage />} />

        {/* Protected routes */}
        <Route path="/select-occasion" element={
          <AuthGuard>
            <OccasionSelectionPage />
          </AuthGuard>
        } />

        {/* Occasions Management */}
        <Route path="/occasions" element={
          <AuthGuard>
            <OccasionsPage />
          </AuthGuard>
        } />

        {/* Dashboard layout routes */}
        <Route path="/occasions/:occasionCode" element={
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        }>
          <Route path="details" element={<OccasionDetailsPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="schedule" element={
            <AuthGuard allowedRoles={[UserRole.EVENT_MANAGER]}>
              <SchedulePage />
            </AuthGuard>
          } />
          <Route path="participants" element={
            <AuthGuard allowedRoles={[UserRole.EVENT_MANAGER]}>
              <ParticipantsPage />
            </AuthGuard>
          } />
          <Route path="abstracts" element={
            <AuthGuard allowedRoles={[UserRole.EVENT_MANAGER, UserRole.SCIENTIFIC_REVIEWER, UserRole.CHIEF_REVIEWER]}>
              <AbstractsPage />
            </AuthGuard>
          } />
          <Route path="abstracts/new" element={
            <AuthGuard allowedRoles={[UserRole.EVENT_MANAGER, UserRole.SCIENTIFIC_REVIEWER, UserRole.CHIEF_REVIEWER]}>
              <AbstractSubmissionPage />
            </AuthGuard>
          } />
          <Route path="abstracts/settings" element={
            <AuthGuard allowedRoles={[UserRole.EVENT_MANAGER]}>
              <AbstractSubmissionSettingsPage />
            </AuthGuard>
          } />
          <Route path="abstracts/:abstractId" element={
            <AuthGuard allowedRoles={[UserRole.EVENT_MANAGER, UserRole.SCIENTIFIC_REVIEWER, UserRole.CHIEF_REVIEWER]}>
              <AbstractDetailsPage />
            </AuthGuard>
          } />
          <Route path="abstracts/:abstractId/review" element={
            <AuthGuard allowedRoles={[UserRole.EVENT_MANAGER, UserRole.SCIENTIFIC_REVIEWER, UserRole.CHIEF_REVIEWER]}>
              <AbstractReviewPage />
            </AuthGuard>
          } />
          <Route path="checkpoints" element={
            <AuthGuard allowedRoles={[UserRole.EVENT_MANAGER]}>
              <CheckpointsPage />
            </AuthGuard>
          } />
          <Route path="exhibitions" element={
            <AuthGuard allowedRoles={[UserRole.EVENT_MANAGER, UserRole.EXHIBITOR]}>
              <ExhibitionsPage />
            </AuthGuard>
          } />
          <Route path="exhibitions/:exhibitionId/staff" element={
            <AuthGuard allowedRoles={[UserRole.EVENT_MANAGER, UserRole.EXHIBITOR]}>
              <ExhibitionStaffPage />
            </AuthGuard>
          } />
          <Route path="exhibitions/:exhibitionId/hunts" element={
            <AuthGuard allowedRoles={[UserRole.EVENT_MANAGER]}>
              <ExhibitionHuntsPage />
            </AuthGuard>
          } />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/select-occasion" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;