import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import SchedulePage from './pages/SchedulePage';
import OccasionsPage from './pages/OccasionsPage';
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

const App = () => {
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
            <AuthGuard allowedRoles={['event_manager']}>
              <SchedulePage />
            </AuthGuard>
          } />
          <Route path="participants" element={
            <AuthGuard allowedRoles={['event_manager']}>
              <ParticipantsPage />
            </AuthGuard>
          } />
          <Route path="abstracts" element={
            <AuthGuard allowedRoles={['event_manager', 'scientific_reviewer', 'chief_reviewer']}>
              <AbstractsPage />
            </AuthGuard>
          } />
          <Route path="abstracts/new" element={
            <AuthGuard allowedRoles={['event_manager', 'scientific_reviewer', 'chief_reviewer']}>
              <AbstractSubmissionPage />
            </AuthGuard>
          } />
          <Route path="abstracts/settings" element={
            <AuthGuard allowedRoles={['event_manager']}>
              <AbstractSubmissionSettingsPage />
            </AuthGuard>
          } />
          <Route path="abstracts/:abstractId" element={
            <AuthGuard allowedRoles={['event_manager', 'scientific_reviewer', 'chief_reviewer']}>
              <AbstractDetailsPage />
            </AuthGuard>
          } />
          <Route path="abstracts/:abstractId/review" element={
            <AuthGuard allowedRoles={['event_manager', 'scientific_reviewer', 'chief_reviewer']}>
              <AbstractReviewPage />
            </AuthGuard>
          } />
          <Route path="checkpoints" element={
            <AuthGuard allowedRoles={['event_manager']}>
              <CheckpointsPage />
            </AuthGuard>
          } />
          <Route path="exhibitions" element={
            <AuthGuard allowedRoles={['event_manager', 'exhibitor']}>
              <ExhibitionsPage />
            </AuthGuard>
          } />
          <Route path="exhibitions/:exhibitionId/staff" element={
            <AuthGuard allowedRoles={['event_manager', 'exhibitor']}>
              <ExhibitionStaffPage />
            </AuthGuard>
          } />
          <Route path="exhibitions/:exhibitionId/hunts" element={
            <AuthGuard allowedRoles={['event_manager']}>
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