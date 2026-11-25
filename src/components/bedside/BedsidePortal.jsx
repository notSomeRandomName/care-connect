import React, { useState, useEffect } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  HeartPulse, FileText, Pill, Bell, Utensils, Calendar,
  Clock, ShieldAlert, CheckCircle, AlertTriangle, Printer,
  Download, ArrowRight, User, Stethoscope, Bed, RefreshCw,
  PhoneCall, Sparkles, Send, Volume2, Info, Activity
} from 'lucide-react';

export const BedsidePortal = () => {
  const {
    currentBed,
    currentBedPatient,
    emergencyAlerts,
    triggerEmergencyAlert,
    acknowledgeEmergencyAlert,
    requestPrintJob,
    printingRequests,
    requestMedicineOrder,
    medicineRequests,
    requestBedsideAssistance,
    assistanceRequests,
    announcements,
    setActiveReportForModal,
    showToast,
    isTouchKioskMode
  } = useHospital();

  const [activeTab, setActiveTab] = useState('reports'); // 'reports' | 'medicines' | 'assistance' | 'schedule'
  const [currentTime, setCurrentTime] = useState(new Date());
  const [assistanceType, setAssistanceType] = useState('Nurse Call');
  const [assistanceDetails, setAssistanceDetails] = useState('');
  const [selectedMedQty, setSelectedMedQty] = useState({});
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if current bed has an active emergency alert
  const currentEmergency = currentBedPatient
    ? emergencyAlerts.find(a => a.patientId === currentBedPatient.id && !a.acknowledged)
    : null;

  // If no patient is currently admitted to this bed
  if (!currentBedPatient) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-900 text-white">
        <div className="max-w-md w-full bg-slate-800/90 p-8 rounded-3xl border border-slate-700 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto">
            <Bed className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Bed {currentBed?.bedNumber || 'N/A'} is Available</h2>
            <p className="text-sm text-slate-400 mt-2">
              Ward: {currentBed?.ward || 'General'} • Type: {currentBed?.type || 'Standard Care'}
            </p>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-700">
            This touchscreen terminal is currently in standby. When a patient is admitted to this bed from the Admin Dashboard, their digital record, prescriptions, and medical reports will automatically activate here.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center text-xs font-semibold text-cyan-400 bg-cyan-950/60 px-3 py-1.5 rounded-full border border-cyan-800">
              Terminal Standby • Connected to Central CareConnect Network
            </span>
          </div>
        </div>
      </div>
    );
  }

  const patient = currentBedPatient;

  // Emergency SOS trigger handler
  const handleEmergencyTrigger = () => {
    triggerEmergencyAlert(patient.id, 'Bedside Touchscreen Emergency SOS Button Pressed');
    setIsEmergencyModalOpen(true);
  };

  // Helper to get print status of a report
  const getReportPrintStatus = (reportId) => {
    return printingRequests.find(pr => pr.patientId === patient.id && pr.reportId === reportId);
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between ${isTouchKioskMode ? 'p-4 sm:p-6' : 'p-4 sm:p-6 lg:p-8'}`}>
      
      {/* 1. TOP BEDSIDE HEADER: PATIENT DEMOGRAPHICS & CLINICAL BANNER */}
      <div className="space-y-4">
        
        {/* Top Bar with Time, Hospital Name & Urgent SOS Button */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-navy-900/90 border border-navy-700/80 p-5 rounded-3xl shadow-xl backdrop-blur-md">
          
          {/* Patient Overview */}
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-cyan-400 flex items-center justify-center text-navy-950 font-black text-xl shadow-lg shadow-cyan-500/25 shrink-0">
              {patient.name.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-black text-white tracking-tight">{patient.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-mono font-bold">
                  {patient.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                  Bed {patient.bedNumber} ({patient.ward})
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 mt-1 font-medium">
                <span className="flex items-center">
                  <Stethoscope className="w-3.5 h-3.5 mr-1 text-cyan-400" />
                  Dr: <strong className="text-white ml-1">{patient.assignedDoctor}</strong>
                </span>
                <span className="flex items-center">
                  <HeartPulse className="w-3.5 h-3.5 mr-1 text-rose-400" />
                  Nurse: <strong className="text-white ml-1">{patient.assignedNurse}</strong>
                </span>
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-amber-400" />
                  Admitted: <span className="text-slate-200 ml-1">{patient.admissionDate}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Time & Emergency Hotline */}
          <div className="flex items-center justify-between lg:justify-end space-x-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-navy-800">
            <div className="text-right hidden sm:block">
              <div className="text-lg font-bold font-mono text-cyan-300 tracking-wider">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {currentTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            {/* PERMANENT EMERGENCY ASSISTANCE BUTTON */}
            <button
              onClick={handleEmergencyTrigger}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-black text-base shadow-2xl transition-all duration-200 active:scale-95 touch-ripple ${
                currentEmergency
                  ? 'bg-rose-600 hover:bg-rose-500 text-white animate-emergency-alert ring-4 ring-rose-500/40'
                  : 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-rose-900/40 hover:shadow-rose-600/50'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                <Bell className="w-5 h-5 fill-current" />
              </div>
              <div className="text-left">
                <span className="block text-sm uppercase tracking-wider font-extrabold leading-tight">
                  {currentEmergency ? '🚨 SOS DISPATCHED' : 'EMERGENCY SOS'}
                </span>
                <span className="block text-[10px] font-semibold text-rose-200">
                  {currentEmergency ? 'Nurse Station Alerted' : 'Press for Nurse Dispatch'}
                </span>
              </div>
            </button>
          </div>

        </div>

        {/* Current Treatment Banner & Announcements Ticker */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Clinical Treatment Status */}
          <div className="md:col-span-2 p-4 bg-navy-900/60 rounded-2xl border border-navy-800 flex items-start space-x-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                ACTIVE CLINICAL TREATMENT PLAN
              </span>
              <p className="text-xs text-slate-200 mt-0.5 leading-relaxed font-medium">
                {patient.currentTreatment}
              </p>
            </div>
          </div>

          {/* Emergency Hotline Info Card */}
          <div className="p-4 bg-gradient-to-br from-red-950/40 to-navy-900/70 rounded-2xl border border-red-900/40 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block">
                HOSPITAL EMERGENCY HOTLINE
              </span>
              <span className="text-base font-extrabold text-white font-mono">
                Ext. 3333 / 911
              </span>
              <p className="text-[10px] text-slate-400">24/7 Rapid Response Desk</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <PhoneCall className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* LIVE VITALS MONITOR BAR */}
        <div className="bg-navy-900/70 p-4 rounded-2xl border border-navy-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
              <HeartPulse className="w-4 h-4 mr-1.5 text-rose-500 animate-pulse" />
              Real-time Bedside Vitals Telemetry
            </span>
            <span className="text-[11px] text-slate-400">
              Last synced: <strong className="text-cyan-300">{patient.vitals.lastUpdated}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            
            {/* Heart Rate */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">HEART RATE</span>
                <span className="text-lg font-black text-white">{patient.vitals.heartRate} <span className="text-[10px] font-normal text-slate-400">BPM</span></span>
              </div>
            </div>

            {/* Blood Pressure */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">BLOOD PRESS.</span>
                <span className="text-lg font-black text-white">{patient.vitals.bloodPressure} <span className="text-[10px] font-normal text-slate-400">mmHg</span></span>
              </div>
            </div>

            {/* SpO2 */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">OXYGEN (SPO2)</span>
                <span className="text-lg font-black text-white">{patient.vitals.spo2}%</span>
              </div>
            </div>

            {/* Temperature */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">TEMPERATURE</span>
                <span className="text-lg font-black text-white">{patient.vitals.temperature}°F</span>
              </div>
            </div>

            {/* Respiratory Rate */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">RESPIRATION</span>
                <span className="text-lg font-black text-white">{patient.vitals.respiratoryRate} <span className="text-[10px] font-normal text-slate-400">/min</span></span>
              </div>
            </div>

            {/* Blood Sugar */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">BLOOD SUGAR</span>
                <span className="text-lg font-black text-white">{patient.vitals.bloodSugar} <span className="text-[10px] font-normal text-slate-400">mg/dL</span></span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 2. MAIN INTERACTIVE TOUCH NAVIGATION TABS */}
      <div className="my-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          
          <button
            onClick={() => setActiveTab('reports')}
            className={`p-4 rounded-2xl border text-left transition touch-ripple flex items-center space-x-4 ${
              activeTab === 'reports'
                ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-600/30'
                : 'bg-navy-900/80 text-slate-300 border-navy-800 hover:bg-navy-800'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              activeTab === 'reports' ? 'bg-white/20 text-white' : 'bg-cyan-500/10 text-cyan-400'
            }`}>
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-base font-extrabold">Medical Reports</span>
              <span className="block text-xs opacity-80">{patient.reports.length} verified results</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('medicines')}
            className={`p-4 rounded-2xl border text-left transition touch-ripple flex items-center space-x-4 ${
              activeTab === 'medicines'
                ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-600/30'
                : 'bg-navy-900/80 text-slate-300 border-navy-800 hover:bg-navy-800'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              activeTab === 'medicines' ? 'bg-white/20 text-white' : 'bg-cyan-500/10 text-cyan-400'
            }`}>
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-base font-extrabold">Order Medicines</span>
              <span className="block text-xs opacity-80">{patient.prescriptions.length} active prescriptions</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('assistance')}
            className={`p-4 rounded-2xl border text-left transition touch-ripple flex items-center space-x-4 ${
              activeTab === 'assistance'
                ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-600/30'
                : 'bg-navy-900/80 text-slate-300 border-navy-800 hover:bg-navy-800'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              activeTab === 'assistance' ? 'bg-white/20 text-white' : 'bg-cyan-500/10 text-cyan-400'
            }`}>
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-base font-extrabold">Nurse & Service Call</span>
              <span className="block text-xs opacity-80">Wheelchair, linens, assistance</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`p-4 rounded-2xl border text-left transition touch-ripple flex items-center space-x-4 ${
              activeTab === 'schedule'
                ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-600/30'
                : 'bg-navy-900/80 text-slate-300 border-navy-800 hover:bg-navy-800'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              activeTab === 'schedule' ? 'bg-white/20 text-white' : 'bg-cyan-500/10 text-cyan-400'
            }`}>
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-base font-extrabold">Meals & Rounds</span>
              <span className="block text-xs opacity-80">Dietary menu & doctor visits</span>
            </div>
          </button>

        </div>
      </div>

      {/* 3. ACTIVE TAB CONTENT AREA */}
      <div className="flex-1 bg-navy-900/80 rounded-3xl p-6 border border-navy-800 shadow-xl overflow-y-auto min-h-[380px]">
        
        {/* TAB 1: MEDICAL REPORTS & PRINTING */}
        {activeTab === 'reports' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-navy-800 pb-3">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-cyan-400" />
                  Diagnostic Reports & Doctor Prescriptions
                </h3>
                <p className="text-xs text-slate-400">
                  Tap any report to view clinical findings, or request physical laser printouts delivered to your bed.
                </p>
              </div>
              <span className="text-xs text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
                Hospital Laser Printing Hub: Online
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patient.reports.map((report) => {
                const printJob = getReportPrintStatus(report.id);
                return (
                  <div
                    key={report.id}
                    className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition shadow-md flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                          {report.category}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{report.date}</span>
                      </div>
                      
                      <h4 className="text-base font-extrabold text-white mt-2 leading-snug">
                        {report.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {report.findings}
                      </p>
                      <div className="text-[11px] text-slate-400 mt-2">
                        Consultant: <span className="text-slate-200 font-semibold">{report.doctor}</span>
                      </div>
                    </div>

                    {/* Print Status Feedback */}
                    {printJob && (
                      <div className="p-2.5 rounded-xl bg-navy-800/80 border border-navy-700 flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-medium flex items-center">
                          <Printer className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                          Print Status:
                        </span>
                        <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                          printJob.status === 'Delivered'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : printJob.status === 'Ready for Delivery'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-amber-500/20 text-amber-300 animate-pulse'
                        }`}>
                          {printJob.status}
                        </span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => setActiveReportForModal({ report, patient })}
                        className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center justify-center space-x-1.5 active:scale-95"
                      >
                        <FileText className="w-4 h-4 text-cyan-400" />
                        <span>Open Details</span>
                      </button>

                      <button
                        onClick={() => requestPrintJob(patient.id, report.id)}
                        disabled={printJob && printJob.status !== 'Delivered'}
                        className={`py-3 px-3 rounded-xl text-xs font-extrabold transition flex items-center justify-center space-x-1.5 active:scale-95 ${
                          printJob && printJob.status !== 'Delivered'
                            ? 'bg-navy-800 text-slate-500 cursor-not-allowed'
                            : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/30'
                        }`}
                      >
                        <Printer className="w-4 h-4" />
                        <span>{printJob && printJob.status !== 'Delivered' ? 'Printing...' : 'Request Print'}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ORDER MEDICINES */}
        {activeTab === 'medicines' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-navy-800 pb-3">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Pill className="w-5 h-5 mr-2 text-cyan-400" />
                  Prescribed Medicines & Pharmacy Fulfillment
                </h3>
                <p className="text-xs text-slate-400">
                  Only doctor-authorized medications for your active admission can be fulfilled directly to your bedside.
                </p>
              </div>
              <span className="text-xs text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
                Hospital Pharmacy: Active Dispensing
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patient.prescriptions.map((rx) => {
                const existingOrder = medicineRequests.find(mr => mr.patientId === patient.id && mr.medicineName.includes(rx.medicineName));
                const qty = selectedMedQty[rx.id] || 1;

                return (
                  <div
                    key={rx.id}
                    className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition shadow-md flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                          Authorized by {rx.prescribedBy}
                        </span>
                        <span className="text-xs text-cyan-300 font-mono">{rx.route}</span>
                      </div>

                      <h4 className="text-lg font-black text-white mt-2">
                        {rx.medicineName} <span className="text-cyan-400 text-sm font-bold">({rx.dosage})</span>
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 font-medium">
                        Schedule: <span className="text-white font-semibold">{rx.frequency}</span>
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Duration: {rx.duration}
                      </p>
                    </div>

                    {/* Delivery Status Pipeline */}
                    {existingOrder && (
                      <div className="p-3 bg-navy-800/90 rounded-xl border border-navy-700 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">Delivery Status:</span>
                          <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                            existingOrder.status === 'Delivered'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : existingOrder.status === 'Out for Delivery'
                              ? 'bg-cyan-500/20 text-cyan-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {existingOrder.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Notes: {existingOrder.pharmacistNotes}
                        </p>
                      </div>
                    )}

                    {/* Quantity & Order Request Action */}
                    <div className="flex items-center space-x-3 pt-2 border-t border-slate-800">
                      <div className="flex items-center space-x-1.5 bg-slate-800 px-3 py-2 rounded-xl border border-slate-700">
                        <span className="text-xs text-slate-400">Qty:</span>
                        <select
                          value={qty}
                          onChange={(e) => setSelectedMedQty({ ...selectedMedQty, [rx.id]: parseInt(e.target.value) })}
                          className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
                        >
                          <option value={1} className="bg-slate-900">1 dose</option>
                          <option value={2} className="bg-slate-900">2 doses</option>
                          <option value={3} className="bg-slate-900">3 doses</option>
                        </select>
                      </div>

                      <button
                        onClick={() => requestMedicineOrder(patient.id, rx.id, qty)}
                        className="flex-1 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md shadow-cyan-600/30 transition active:scale-95 flex items-center justify-center space-x-2"
                      >
                        <Pill className="w-4 h-4" />
                        <span>Request Bedside Refill</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: NURSE & SERVICE ASSISTANCE */}
        {activeTab === 'assistance' && (
          <div className="space-y-6">
            <div className="border-b border-navy-800 pb-3">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Bell className="w-5 h-5 mr-2 text-cyan-400" />
                Bedside Patient Assistance Dispatch
              </h3>
              <p className="text-xs text-slate-400">
                Tap a service category below to notify the nursing station or hospital support staff directly.
              </p>
            </div>

            {/* Big Touch Service Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <button
                onClick={() => setAssistanceType('Nurse Call')}
                className={`p-5 rounded-2xl border text-center transition touch-ripple flex flex-col items-center justify-center space-y-2 ${
                  assistanceType === 'Nurse Call'
                    ? 'bg-cyan-600/20 border-cyan-400 text-cyan-300 ring-2 ring-cyan-500/50'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <span className="font-extrabold text-sm block">Call Duty Nurse</span>
                <span className="text-[11px] text-slate-400">Pain, IV, consultation</span>
              </button>

              <button
                onClick={() => setAssistanceType('Wheelchair Assistance')}
                className={`p-5 rounded-2xl border text-center transition touch-ripple flex flex-col items-center justify-center space-y-2 ${
                  assistanceType === 'Wheelchair Assistance'
                    ? 'bg-cyan-600/20 border-cyan-400 text-cyan-300 ring-2 ring-cyan-500/50'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="font-extrabold text-sm block">Wheelchair Call</span>
                <span className="text-[11px] text-slate-400">Scan & test transport</span>
              </button>

              <button
                onClick={() => setAssistanceType('Housekeeping')}
                className={`p-5 rounded-2xl border text-center transition touch-ripple flex flex-col items-center justify-center space-y-2 ${
                  assistanceType === 'Housekeeping'
                    ? 'bg-cyan-600/20 border-cyan-400 text-cyan-300 ring-2 ring-cyan-500/50'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="font-extrabold text-sm block">Housekeeping</span>
                <span className="text-[11px] text-slate-400">Fresh linens, sanitization</span>
              </button>

              <button
                onClick={() => setAssistanceType('Hospital Support')}
                className={`p-5 rounded-2xl border text-center transition touch-ripple flex flex-col items-center justify-center space-y-2 ${
                  assistanceType === 'Hospital Support'
                    ? 'bg-cyan-600/20 border-cyan-400 text-cyan-300 ring-2 ring-cyan-500/50'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <span className="font-extrabold text-sm block">General Support</span>
                <span className="text-[11px] text-slate-400">Attendant pass, inquiries</span>
              </button>

            </div>

            {/* Custom Notes & Send Request */}
            <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Additional Details (Optional):
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder={`Specify details for ${assistanceType} (e.g. need assistance getting to bathroom, fresh pillow)...`}
                  value={assistanceDetails}
                  onChange={(e) => setAssistanceDetails(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={() => {
                    requestBedsideAssistance(patient.id, assistanceType, assistanceDetails);
                    setAssistanceDetails('');
                  }}
                  className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-sm shadow-md shadow-cyan-600/30 transition active:scale-95 flex items-center justify-center space-x-2 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Call to Station</span>
                </button>
              </div>
            </div>

            {/* Active Bedside Requests Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Recent Assistance Calls from Bed {patient.bedNumber}
              </h4>
              <div className="space-y-2">
                {assistanceRequests
                  .filter(r => r.patientId === patient.id)
                  .map(req => (
                    <div
                      key={req.id}
                      className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-white">{req.type}</span>
                        <span className="text-slate-400 font-medium">• {req.details}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-slate-500 font-mono">{req.timestamp}</span>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                          req.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-amber-500/20 text-amber-300 animate-pulse'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: SCHEDULE & MEAL PLAN */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="border-b border-navy-800 pb-3">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Utensils className="w-5 h-5 mr-2 text-cyan-400" />
                Personalized Dietary Plan & Clinical Routine
              </h3>
              <p className="text-xs text-slate-400">
                Tailored hospital meal plan recommended by your attending clinical team.
              </p>
            </div>

            {/* Meal Plan Card */}
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                    CLINICAL DIET PRESCRIPTION
                  </span>
                  <h4 className="text-lg font-black text-white mt-0.5">
                    {patient.mealPlan?.dietType || 'Standard Healthy Hospital Diet'}
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Dietary Kitchen Approved
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                  <span className="text-amber-400 font-bold uppercase tracking-wider block">Breakfast (07:30 AM)</span>
                  <p className="text-slate-200 font-medium leading-relaxed">{patient.mealPlan?.breakfast}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider block">Lunch (12:30 PM)</span>
                  <p className="text-slate-200 font-medium leading-relaxed">{patient.mealPlan?.lunch}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider block">Dinner (07:00 PM)</span>
                  <p className="text-slate-200 font-medium leading-relaxed">{patient.mealPlan?.dinner}</p>
                </div>
              </div>

              <div className="p-3 bg-rose-950/30 rounded-xl border border-rose-900/40 text-xs">
                <strong className="text-rose-400 block mb-0.5">Dietary Caution & Doctor Restrictions:</strong>
                <p className="text-slate-300">{patient.mealPlan?.restrictions}</p>
              </div>
            </div>

            {/* Doctor Rounds Schedule */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white flex items-center">
                  <Stethoscope className="w-4 h-4 mr-1.5 text-cyan-400" />
                  Upcoming Doctor Rounds
                </h4>
                <div className="space-y-2 pt-1">
                  <div className="p-2.5 bg-slate-800/60 rounded-lg flex items-center justify-between">
                    <div>
                      <strong className="text-white block">{patient.assignedDoctor}</strong>
                      <span className="text-slate-400 text-[11px]">Primary Consultant Round</span>
                    </div>
                    <span className="text-cyan-300 font-semibold font-mono">11:30 AM Today</span>
                  </div>
                  <div className="p-2.5 bg-slate-800/60 rounded-lg flex items-center justify-between">
                    <div>
                      <strong className="text-white block">Clinical Nutritionist Visit</strong>
                      <span className="text-slate-400 text-[11px]">Metabolic Assessment</span>
                    </div>
                    <span className="text-cyan-300 font-semibold font-mono">03:00 PM Today</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5 text-amber-400" />
                  Scheduled Vitals & Nursing Checks
                </h4>
                <div className="space-y-2 pt-1">
                  <div className="p-2.5 bg-slate-800/60 rounded-lg flex items-center justify-between">
                    <div>
                      <strong className="text-white block">Midday Blood Pressure & ECG Check</strong>
                      <span className="text-slate-400 text-[11px]">{patient.assignedNurse}</span>
                    </div>
                    <span className="text-amber-300 font-semibold font-mono">01:00 PM</span>
                  </div>
                  <div className="p-2.5 bg-slate-800/60 rounded-lg flex items-center justify-between">
                    <div>
                      <strong className="text-white block">Evening Medication Administration</strong>
                      <span className="text-slate-400 text-[11px]">Duty Nursing Staff</span>
                    </div>
                    <span className="text-amber-300 font-semibold font-mono">06:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* 4. EMERGENCY SOS ACTIVE MODAL / OVERLAY */}
      {currentEmergency && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-navy-900 border-2 border-red-500 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl animate-emergency-alert">
            <div className="w-20 h-20 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center text-red-500 mx-auto animate-bounce">
              <Bell className="w-10 h-10 fill-current" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase bg-red-600 text-white">
                CODE BLUE EMERGENCY ALERT ACTIVE
              </span>
              <h2 className="text-2xl font-black text-white mt-3">
                Emergency Assistance Dispatched
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Bed <strong className="text-white">{patient.bedNumber}</strong> ({patient.ward}) • Patient: <strong className="text-cyan-300">{patient.name}</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-red-950/60 border border-red-900/60 text-xs text-slate-200 text-left space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-red-300 font-bold">Nursing Station Status:</span>
                <span className="font-bold text-white bg-red-600/40 px-2 py-0.5 rounded">ALARMING NOW</span>
              </div>
              <p className="text-slate-300">
                Assigned Nurse: <strong className="text-white">{patient.assignedNurse}</strong> has been notified on their active station tablet.
              </p>
              <p className="text-slate-400">
                Hospital Rapid Response Team extension: <strong className="text-white">3333</strong>
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => acknowledgeEmergencyAlert(currentEmergency.id, 'Attending Staff / Bedside')}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition"
              >
                Staff: Acknowledge & Clear SOS Alarm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

