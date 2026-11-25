import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Activity, Shield, Bell, Sparkles, RotateCcw,
  Maximize, Minimize, Stethoscope, HeartPulse, Pill,
  Printer, Monitor, Building2, User, ChevronDown
} from 'lucide-react';

export const Navbar = ({ onOpenAuditTrail }) => {
  const {
    currentRole,
    setCurrentRole,
    selectedDoctorId,
    setSelectedDoctorId,
    selectedNurseId,
    setSelectedNurseId,
    selectedBedId,
    setSelectedBedId,
    beds,
    staff,
    patients,
    activeEmergencyCount,
    isTouchKioskMode,
    setIsTouchKioskMode,
    setIsDemoModalOpen,
    resetDemoData
  } = useHospital();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
  const [showNurseDropdown, setShowNurseDropdown] = useState(false);
  const [showBedDropdown, setShowBedDropdown] = useState(false);

  // If in kiosk mode, show minimalist kiosk header
  if (isTouchKioskMode && currentRole === 'patient') {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-navy-950/95 text-white px-6 py-2.5 backdrop-blur-md border-b border-navy-800 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-white text-base">CARECONNECT</span>
            <span className="text-[11px] text-cyan-300 ml-2 font-medium tracking-wide">BEDSIDE TOUCHSCREEN KIOSK</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Bed Switcher even in Kiosk Mode */}
          <div className="relative">
            <select
              value={selectedBedId}
              onChange={(e) => setSelectedBedId(e.target.value)}
              className="bg-navy-900 border border-cyan-500/40 text-cyan-200 text-xs rounded-xl px-3 py-1.5 font-bold focus:outline-none"
            >
              {beds.map(b => {
                const p = patients.find(pat => pat.id === b.patientId);
                return (
                  <option key={b.id} value={b.id}>
                    Bed {b.bedNumber} ({b.ward}) - {p ? p.name : 'Unoccupied'}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            onClick={() => setIsTouchKioskMode(false)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            title="Exit Fullscreen Kiosk Mode"
          >
            <Minimize className="w-3.5 h-3.5" />
            <span>Exit Kiosk</span>
          </button>
        </div>
      </header>
    );
  }

  const ROLES = [
    { id: 'admin', label: 'Admin Portal', icon: Building2 },
    { id: 'doctor', label: 'Doctor', icon: Stethoscope },
    { id: 'nurse', label: 'Nurse Station', icon: HeartPulse },
    { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
    { id: 'printing', label: 'Printing Hub', icon: Printer },
    { id: 'patient', label: 'Bedside Touchscreen', icon: Monitor }
  ];

  return (
    <nav className="sticky top-0 z-40 bg-navy-900 text-white border-b border-navy-800 shadow-md">
      
      {/* Top Bar: Brand, Tagline, Alert Beacon, Demo & System Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between border-b border-navy-800/80">
        
        {/* Brand & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Activity className="w-5 h-5 font-bold stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-wider text-white">
                CARECONNECT
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                ECOSYSTEM
              </span>
            </div>
            <p className="text-[11px] text-cyan-200/80 font-medium tracking-tight hidden sm:block">
              “Everything a Patient Needs, Just One Touch Away.”
            </p>
          </div>
        </div>

        {/* Global Alert Beacon & Quick Tools */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Emergency Alert Indicator */}
          {activeEmergencyCount > 0 ? (
            <button
              onClick={() => {
                setCurrentRole('nurse');
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold shadow-lg shadow-red-600/40 animate-pulse transition"
              title="Active Emergency SOS Alarms Detected!"
            >
              <Bell className="w-4 h-4 animate-bounce" />
              <span>{activeEmergencyCount} SOS ALARM{activeEmergencyCount > 1 ? 'S' : ''}</span>
            </button>
          ) : (
            <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-navy-800/60 border border-navy-700/60 text-slate-300 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>All Systems Normal</span>
            </div>
          )}

          {/* 12-Step Guided Demo Button */}
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-navy-950 font-black text-xs shadow-md shadow-cyan-500/20 transition active:scale-95"
            title="Start Interactive 12-Step Guided Workflow Demonstration"
          >
            <Sparkles className="w-3.5 h-3.5 text-navy-950 fill-current" />
            <span className="tracking-wide">12-Step Demo Guide</span>
          </button>

          {/* Audit Logs */}
          <button
            onClick={onOpenAuditTrail}
            className="p-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white border border-navy-700 text-xs font-medium transition"
            title="View HIPAA Audit Trail Logs"
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={resetDemoData}
            className="p-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-rose-300 border border-navy-700 text-xs font-medium transition"
            title="Reset Platform to Initial Demo Dataset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Bottom Bar: Role Switcher Tabs & Role-Specific Quick Switchers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
        
        {/* Role Switcher Navigation Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto py-1">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isActive = currentRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setCurrentRole(role.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500 text-navy-950 shadow-md shadow-cyan-500/30 font-extrabold'
                    : 'text-slate-300 hover:text-white hover:bg-navy-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-navy-950' : 'text-cyan-400'}`} />
                <span>{role.label}</span>
                {role.id === 'patient' && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive ? 'bg-navy-900 text-cyan-300' : 'bg-cyan-900/60 text-cyan-300'
                  }`}>
                    Touchscreen
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Context Controls Based on Current Role */}
        <div className="flex items-center space-x-2 text-xs">
          
          {/* Doctor Switcher */}
          {currentRole === 'doctor' && (
            <div className="flex items-center space-x-1.5 bg-navy-800 px-2.5 py-1 rounded-xl border border-navy-700">
              <span className="text-slate-400 font-medium">Logged in:</span>
              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="bg-transparent text-cyan-300 font-bold focus:outline-none cursor-pointer"
              >
                {staff.doctors.map(d => (
                  <option key={d.id} value={d.id} className="bg-navy-900 text-white">
                    {d.name} ({d.specialty})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Nurse Switcher */}
          {currentRole === 'nurse' && (
            <div className="flex items-center space-x-1.5 bg-navy-800 px-2.5 py-1 rounded-xl border border-navy-700">
              <span className="text-slate-400 font-medium">Active Station:</span>
              <select
                value={selectedNurseId}
                onChange={(e) => setSelectedNurseId(e.target.value)}
                className="bg-transparent text-cyan-300 font-bold focus:outline-none cursor-pointer"
              >
                {staff.nurses.map(n => (
                  <option key={n.id} value={n.id} className="bg-navy-900 text-white">
                    {n.name} ({n.ward})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Patient Bedside Switcher & Kiosk Toggle */}
          {currentRole === 'patient' && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 bg-navy-800 px-2.5 py-1 rounded-xl border border-navy-700">
                <span className="text-slate-400 font-medium">Viewing Bed:</span>
                <select
                  value={selectedBedId}
                  onChange={(e) => setSelectedBedId(e.target.value)}
                  className="bg-transparent text-cyan-300 font-bold focus:outline-none cursor-pointer"
                >
                  {beds.map(b => {
                    const p = patients.find(pat => pat.id === b.patientId);
                    return (
                      <option key={b.id} value={b.id} className="bg-navy-900 text-white">
                        Bed {b.bedNumber} ({b.ward}) - {p ? p.name : 'Unoccupied'}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button
                onClick={() => setIsTouchKioskMode(true)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 border border-cyan-500/40 font-bold transition"
                title="Simulate Tablet Touchscreen Fullscreen Kiosk Mode"
              >
                <Maximize className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kiosk Mode</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </nav>
  );
};

