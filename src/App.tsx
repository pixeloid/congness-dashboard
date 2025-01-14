import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import SchedulePage from './pages/SchedulePage';
import ParticipantsPage from './pages/ParticipantsPage';
import ExhibitionsPage from './pages/ExhibitionsPage';
import ExhibitionStaffPage from './pages/ExhibitionStaffPage';
import ExhibitionHuntsPage from './pages/ExhibitionHuntsPage';
import AbstractsPage from './pages/AbstractsPage';
import AbstractDetailsPage from './pages/AbstractDetailsPage';
import AbstractSubmissionPage from './pages/AbstractSubmissionPage';
import AbstractReviewPage from './pages/AbstractReviewPage';
import AbstractSubmissionSettingsPage from './pages/AbstractSubmissionSettingsPage';
import PublicAbstractSubmissionPage from './pages/PublicAbstractSubmissionPage';
import SubmissionSuccessPage from './pages/SubmissionSuccessPage';
import InvitationResponsePage from './components/abstracts/InvitationResponsePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import OccasionSelectionPage from './pages/OccasionSelectionPage';
import AuthGuard from './components/auth/AuthGuard';
import CheckpointsPage from '@/pages/CheckpointsPage';
import { UserRole } from '@/types/auth';

const App = () => {
  const { actions } = useAuthStore();

  useEffect(() => {
    actions.checkAuth();
  }, [actions]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
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

        {/* Dashboard layout routes */}
        <Route path="/occasions/:occasionId" element={
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        }>
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