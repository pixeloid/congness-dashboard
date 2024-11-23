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
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import AuthGuard from './components/auth/AuthGuard';
import CheckpointsPage from '@/pages/CheckpointsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route path="/" element={
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="schedule" element={
            <AuthGuard allowedRoles={['event_manager']}>
              <SchedulePage />
            </AuthGuard>
          } />
          <Route path="occasions" element={
            <AuthGuard allowedRoles={['event_manager']}>
              <OccasionsPage />
            </AuthGuard>
          } />
          <Route path="occasions/:occasionId/participants" element={
            <AuthGuard allowedRoles={['event_manager']}>
              <ParticipantsPage />
            </AuthGuard>
          } />
          <Route path="occasions/:occasionId/abstracts" element={
            <AuthGuard allowedRoles={['event_manager']}>
              <AbstractsPage />
            </AuthGuard>
          } />
          <Route path="occasions/:occasionId/abstracts/new" element={
            <AuthGuard allowedRoles={['event_manager']}>
              <AbstractSubmissionPage />
            </AuthGuard>
          } />
          <Route path="occasions/:occasionId/abstracts/:abstractId" element={
            <AuthGuard allowedRoles={['event_manager']}>
              <AbstractDetailsPage />
            </AuthGuard>
          } />
          <Route path="occasions/:occasionId/abstracts/:abstractId/review" element={
            <AuthGuard allowedRoles={['event_manager']}>
              <AbstractReviewPage />
            </AuthGuard>
          } />
          <Route path="occasions/:occasionId/checkpoints" element={
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
      </Routes>
    </BrowserRouter>
  );
}