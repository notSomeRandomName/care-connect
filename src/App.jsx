import React, { useState } from 'react';
import { HospitalProvider, useHospital } from './context/HospitalContext';
import { Navbar } from './components/common/Navbar';
import { DemoWorkflowModal } from './components/common/DemoWorkflowModal';
import { AuditTrailModal } from './components/common/AuditTrailModal';
import { ReportViewerModal } from './components/common/ReportViewerModal';

// Dashboards
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { NurseDashboard } from './components/nurse/NurseDashboard';
import { PharmacyDashboard } from './components/pharmacy/PharmacyDashboard';
import { PrintingDashboard } from './components/printing/PrintingDashboard';
import { BedsidePortal } from './components/bedside/BedsidePortal';

import { CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

const MainAppContent = () => {
  const {
    currentRole,
    notificationToast,
    isDemoModalOpen,
    setIsDemoModalOpen
  } = useHospital();

  const [isAuditTrailOpen, setIsAuditTrailOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Global Navigation Bar */}
      <Navbar onOpenAuditTrail={() => setIsAuditTrailOpen(true)} />

      {/* Main View Router based on active user role */}
      <div className="flex-1">
        {currentRole === 'admin' && <AdminDashboard />}
        {currentRole === 'doctor' && <DoctorDashboard />}
        {currentRole === 'nurse' && <NurseDashboard />}
        {currentRole === 'pharmacy' && <PharmacyDashboard />}
        {currentRole === 'printing' && <PrintingDashboard />}
        {currentRole === 'patient' && <BedsidePortal />}
      </div>

      {/* Floating Global Modals */}
      <DemoWorkflowModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      <AuditTrailModal
        isOpen={isAuditTrailOpen}
        onClose={() => setIsAuditTrailOpen(false)}
      />

      <ReportViewerModal />

      {/* Real-Time Transient Toast Notifications */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fadeIn">
          <div className={`p-4 rounded-2xl shadow-2xl border flex items-start space-x-3 text-xs font-bold ${
            notificationToast.type === 'error'
              ? 'bg-rose-900/95 text-white border-rose-600 shadow-rose-900/40 ring-2 ring-rose-500'
              : notificationToast.type === 'warning'
              ? 'bg-amber-900/95 text-amber-100 border-amber-600 shadow-amber-900/40'
              : notificationToast.type === 'success'
              ? 'bg-emerald-900/95 text-emerald-100 border-emerald-600 shadow-emerald-900/40'
              : 'bg-navy-900/95 text-cyan-200 border-cyan-500/60 shadow-cyan-900/40'
          }`}>
            <div className="shrink-0 mt-0.5">
              {notificationToast.type === 'error' && <XCircle className="w-5 h-5 text-rose-300" />}
              {notificationToast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-300" />}
              {notificationToast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-300" />}
              {notificationToast.type === 'info' && <Info className="w-5 h-5 text-cyan-300" />}
            </div>
            <div className="leading-snug">
              {notificationToast.message}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <HospitalProvider>
      <MainAppContent />
    </HospitalProvider>
  );
}

