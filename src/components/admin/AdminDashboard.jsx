import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  LayoutDashboard, Users, LogOut, Bed, Stethoscope, HeartPulse,
  FileText, Activity, Pill, Clock, Printer, DollarSign,
  ShieldAlert, UserCheck, BarChart3, Settings, Menu, X, PlusCircle
} from 'lucide-react';

import { OverviewTab } from './OverviewTab';
import { PatientManagementTab } from './PatientManagementTab';
import { DischargeManagementTab } from './DischargeManagementTab';
import { BedManagementTab } from './BedManagementTab';
import { PatientRegistrationModal } from './PatientRegistrationModal';
import {
  StaffManagementTab,
  MedicalRecordsAdminTab,
  PharmacyAdminTab,
  PrintingAdminTab,
  BillingPaymentsTab,
  EmergencyAlertsAdminTab,
  AnalyticsReportsTab,
  SettingsTab
} from './AdminRemainingTabs';

export const AdminDashboard = () => {
  const { adminActiveTab, setAdminActiveTab, activeEmergencyCount } = useHospital();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // All 16 required navigation tabs from Section 1
  const SIDEBAR_ITEMS = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'Patient Management', label: 'Patient Management', icon: Users },
    { id: 'Admission & Discharge', label: 'Admission & Discharge', icon: LogOut },
    { id: 'Bed Management', label: 'Bed Management', icon: Bed },
    { id: 'Doctor Management', label: 'Doctor Management', icon: Stethoscope },
    { id: 'Nurse Management', label: 'Nurse Management', icon: HeartPulse },
    { id: 'Medical Records', label: 'Medical Records', icon: FileText },
    { id: 'Laboratory Reports', label: 'Laboratory Reports', icon: Activity },
    { id: 'Pharmacy', label: 'Pharmacy', icon: Pill },
    { id: 'Medicine Requests', label: 'Medicine Requests', icon: Clock },
    { id: 'Printing Requests', label: 'Printing Requests', icon: Printer },
    { id: 'Billing & Payments', label: 'Billing & Payments', icon: DollarSign },
    { id: 'Emergency Alerts', label: 'Emergency Alerts', icon: ShieldAlert, badge: activeEmergencyCount },
    { id: 'Staff Management', label: 'Staff Management', icon: UserCheck },
    { id: 'Analytics & Reports', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'Settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col lg:flex-row">
      
      {/* Mobile Sidebar Toggle Header */}
      <div className="lg:hidden bg-navy-900 text-white p-4 flex items-center justify-between border-b border-navy-800">
        <div className="flex items-center space-x-2">
          <span className="font-extrabold text-sm text-cyan-400">ADMIN CONSOLE</span>
          <span className="text-xs text-slate-400">• {adminActiveTab}</span>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 rounded-lg bg-navy-800 text-slate-300"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 1. SIDEBAR NAVIGATION (16 ITEMS) */}
      <aside className={`
        fixed lg:sticky top-0 lg:top-[93px] z-30 h-screen lg:h-[calc(100vh-93px)] w-64 bg-navy-950 text-white flex flex-col justify-between shrink-0 border-r border-navy-800/80 transition-transform duration-200
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            HOSPITAL ADMIN CONSOLE
          </div>

          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = adminActiveTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setAdminActiveTab(item.id);
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition select-none ${
                  isActive
                    ? 'bg-cyan-500 text-navy-950 shadow-md shadow-cyan-500/25 font-extrabold'
                    : 'text-slate-300 hover:text-white hover:bg-navy-900'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-navy-950' : 'text-cyan-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-rose-600 text-white animate-pulse">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Quick Admission CTA at bottom of sidebar */}
        <div className="p-3 border-t border-navy-900 bg-navy-900/40">
          <button
            onClick={() => setIsRegistrationOpen(true)}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-navy-950 font-black text-xs shadow-md shadow-cyan-500/20 transition active:scale-95 flex items-center justify-center space-x-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Admit New Patient</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        
        {/* Dynamic Tab Renderer */}
        {adminActiveTab === 'Overview' && (
          <OverviewTab
            onOpenRegistration={() => setIsRegistrationOpen(true)}
            onSelectTab={(tabId) => setAdminActiveTab(tabId)}
          />
        )}

        {adminActiveTab === 'Patient Management' && (
          <PatientManagementTab onOpenRegistration={() => setIsRegistrationOpen(true)} />
        )}

        {adminActiveTab === 'Admission & Discharge' && (
          <DischargeManagementTab />
        )}

        {adminActiveTab === 'Bed Management' && (
          <BedManagementTab />
        )}

        {(adminActiveTab === 'Doctor Management' || adminActiveTab === 'Nurse Management' || adminActiveTab === 'Staff Management') && (
          <StaffManagementTab />
        )}

        {(adminActiveTab === 'Medical Records' || adminActiveTab === 'Laboratory Reports') && (
          <MedicalRecordsAdminTab />
        )}

        {(adminActiveTab === 'Pharmacy' || adminActiveTab === 'Medicine Requests') && (
          <PharmacyAdminTab />
        )}

        {adminActiveTab === 'Printing Requests' && (
          <PrintingAdminTab />
        )}

        {adminActiveTab === 'Billing & Payments' && (
          <BillingPaymentsTab />
        )}

        {adminActiveTab === 'Emergency Alerts' && (
          <EmergencyAlertsAdminTab />
        )}

        {adminActiveTab === 'Analytics & Reports' && (
          <AnalyticsReportsTab />
        )}

        {adminActiveTab === 'Settings' && (
          <SettingsTab />
        )}

      </main>

      {/* Patient Registration Modal */}
      <PatientRegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />

    </div>
  );
};

