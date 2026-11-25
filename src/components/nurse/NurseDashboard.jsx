import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  HeartPulse, Bell, ShieldAlert, CheckCircle, Activity,
  Clock, CheckSquare, PlusCircle, User, Stethoscope, AlertTriangle
} from 'lucide-react';

export const NurseDashboard = () => {
  const {
    staff,
    selectedNurseId,
    setSelectedNurseId,
    patients,
    emergencyAlerts,
    acknowledgeEmergencyAlert,
    assistanceRequests,
    updateAssistanceStatus,
    nurseUpdateVitals,
    showToast
  } = useHospital();

  const currentNurse = staff.nurses.find(n => n.id === selectedNurseId) || staff.nurses[0];

  // Active emergencies
  const activeEmergencies = emergencyAlerts.filter(a => !a.acknowledged);

  // Vitals entry modal state
  const [selectedPatientForVitals, setSelectedPatientForVitals] = useState(null);
  const [vitalsForm, setVitalsForm] = useState({
    heartRate: 75,
    bloodPressure: '120/80',
    spo2: 98,
    temperature: 98.6,
    respiratoryRate: 16,
    bloodSugar: 105
  });

  const handleOpenVitalsModal = (patient) => {
    setSelectedPatientForVitals(patient);
    setVitalsForm({
      heartRate: patient.vitals.heartRate,
      bloodPressure: patient.vitals.bloodPressure,
      spo2: patient.vitals.spo2,
      temperature: patient.vitals.temperature,
      respiratoryRate: patient.vitals.respiratoryRate,
      bloodSugar: patient.vitals.bloodSugar
    });
  };

  const handleSaveVitals = (e) => {
    e.preventDefault();
    if (!selectedPatientForVitals) return;

    nurseUpdateVitals(selectedPatientForVitals.id, vitalsForm);
    setSelectedPatientForVitals(null);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 p-4 sm:p-6 lg:p-8 space-y-6 animate-fadeIn">
      
      {/* 1. NURSE STATION HEADER */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 rounded-3xl shadow-soft border border-navy-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-400/30">
              Nursing Telemetry & Response Station
            </span>
            <span className="text-xs text-emerald-400 font-semibold">• Active Station Desk</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-0.5">{currentNurse.name}</h1>
          <p className="text-xs text-slate-300 font-medium">
            Assigned Ward: <strong className="text-cyan-300">{currentNurse.ward}</strong> • Shift: {currentNurse.shift} • Badge: {currentNurse.badge}
          </p>
        </div>

        {/* Nurse Switcher */}
        <div className="flex items-center space-x-3 bg-navy-800/80 p-3 rounded-2xl border border-navy-700">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-slate-400 block font-medium">Switch Nurse Desk:</span>
            <span className="text-xs font-bold text-cyan-300">Demo Testing</span>
          </div>
          <select
            value={selectedNurseId}
            onChange={(e) => setSelectedNurseId(e.target.value)}
            className="bg-navy-950 border border-cyan-500/40 text-cyan-200 text-xs rounded-xl px-3 py-2 font-bold focus:outline-none cursor-pointer"
          >
            {staff.nurses.map(n => (
              <option key={n.id} value={n.id} className="bg-navy-900 text-white">
                {n.name} ({n.ward})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. TOP PRIORITY EMERGENCY ALERTS CENTER (WITH CLEAR PRIORITY SYSTEM) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-navy-950 flex items-center">
            <ShieldAlert className="w-5 h-5 mr-2 text-rose-600 animate-pulse" />
            Priority Emergency Alert Station
          </h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
            activeEmergencies.length > 0
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-emerald-100 text-emerald-800'
          }`}>
            {activeEmergencies.length > 0 ? `${activeEmergencies.length} ACTIVE SOS CODE BLUE` : 'All Patients Stable'}
          </span>
        </div>

        {activeEmergencies.length === 0 ? (
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
            <span className="font-semibold flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
              All bedside emergency lines operating normally. No active critical SOS alerts in your ward.
            </span>
            <span className="font-mono text-slate-500">Telemetry 100% Online</span>
          </div>
        ) : (
          <div className="space-y-3">
            {activeEmergencies.map(alert => (
              <div
                key={alert.id}
                className="p-5 bg-rose-600 text-white rounded-2xl shadow-xl animate-emergency-alert flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-2 border-rose-300"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center animate-bounce shrink-0">
                    <Bell className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-white text-rose-800">
                        CRITICAL PRIORITY 1
                      </span>
                      <h4 className="text-xl font-black">Bed {alert.bedNumber} ({alert.ward})</h4>
                    </div>
                    <p className="text-sm font-bold text-white mt-1">
                      Patient: {alert.patientName} • {alert.reason}
                    </p>
                    <span className="text-xs text-rose-100 font-mono mt-0.5 block">
                      Triggered: {alert.timestamp} • Alarm Code: {alert.id}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => acknowledgeEmergencyAlert(alert.id, currentNurse.name)}
                  className="px-6 py-3 rounded-xl bg-white text-rose-800 hover:bg-rose-50 font-black text-sm shadow-lg transition active:scale-95 shrink-0"
                >
                  Acknowledge & Respond to Bed {alert.bedNumber}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. ASSISTANCE QUEUE & ASSIGNED PATIENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Bedside Assistance Calls (Nurse Call, Wheelchair, Housekeeping) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-navy-950 text-sm flex items-center">
                <Bell className="w-4 h-4 mr-1.5 text-cyan-600" />
                Bedside Service Requests ({assistanceRequests.length})
              </h3>
              <p className="text-[11px] text-slate-500">Live calls from patient touchscreens</p>
            </div>
            <span className="text-[10px] font-bold text-slate-400">Queue</span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto">
            {assistanceRequests.map(req => (
              <div
                key={req.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-900">{req.type}</span>
                  <span className="font-mono text-cyan-700 font-bold">Bed {req.bedNumber}</span>
                </div>

                <p className="text-slate-600 font-medium">{req.details}</p>
                <div className="text-[10px] text-slate-400 font-mono">Patient: {req.patientName} • {req.timestamp}</div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    req.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>

                  {req.status !== 'Completed' && (
                    <button
                      onClick={() => updateAssistanceStatus(req.id, 'Completed')}
                      className="px-2.5 py-1 rounded-lg bg-navy-900 hover:bg-cyan-700 text-white font-bold text-[11px] transition"
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Assigned Patients with Record Vitals Actions */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-navy-950 text-base flex items-center">
                <HeartPulse className="w-5 h-5 mr-2 text-rose-600" />
                Assigned Patients & Live Vitals Monitor
              </h3>
              <p className="text-xs text-slate-500">
                Record vital signs and nursing observations. Updates immediately sync to patient bedside screens.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {patients.map(p => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-cyan-400 transition space-y-4 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-black text-navy-950 text-base">{p.name}</h4>
                      <span className="font-mono text-xs font-bold text-cyan-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                        Bed {p.bedNumber} ({p.ward})
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {p.diagnosis} • Doctor: <strong>{p.assignedDoctor}</strong>
                    </p>
                  </div>

                  <button
                    onClick={() => handleOpenVitalsModal(p)}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md shadow-cyan-600/20 transition active:scale-95 flex items-center space-x-1.5 self-start sm:self-auto"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Record New Vitals</span>
                  </button>
                </div>

                {/* Vitals Telemetry Row */}
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">HR</span>
                    <strong className="text-sm font-black text-slate-900">{p.vitals.heartRate} bpm</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">BP</span>
                    <strong className="text-sm font-black text-slate-900">{p.vitals.bloodPressure}</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">SPO2</span>
                    <strong className="text-sm font-black text-cyan-700">{p.vitals.spo2}%</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">TEMP</span>
                    <strong className="text-sm font-black text-amber-600">{p.vitals.temperature}°F</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">RESP</span>
                    <strong className="text-sm font-black text-slate-900">{p.vitals.respiratoryRate}/min</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">GLUCOSE</span>
                    <strong className="text-sm font-black text-purple-700">{p.vitals.bloodSugar} mg/dL</strong>
                  </div>
                </div>

                {/* Doctor Instructions Preview */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                  <span className="text-slate-500">
                    Doctor Orders: <strong className="text-slate-800">{p.currentTreatment}</strong>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono shrink-0 ml-2">Synced: {p.vitals.lastUpdated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RECORD VITALS MODAL */}
      {selectedPatientForVitals && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-extrabold text-navy-950">Record Patient Vital Signs</h3>
            <p className="text-xs text-slate-500">
              Patient: <strong>{selectedPatientForVitals.name}</strong> • Bed {selectedPatientForVitals.bedNumber}
            </p>

            <form onSubmit={handleSaveVitals} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Heart Rate (BPM)</label>
                  <input
                    type="number"
                    value={vitalsForm.heartRate}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, heartRate: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Blood Pressure</label>
                  <input
                    type="text"
                    value={vitalsForm.bloodPressure}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, bloodPressure: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Oxygen Saturation (SpO2 %)</label>
                  <input
                    type="number"
                    value={vitalsForm.spo2}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, spo2: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Temperature (°F)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={vitalsForm.temperature}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, temperature: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Respiration Rate (/min)</label>
                  <input
                    type="number"
                    value={vitalsForm.respiratoryRate}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, respiratoryRate: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Blood Glucose (mg/dL)</label>
                  <input
                    type="number"
                    value={vitalsForm.bloodSugar}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, bloodSugar: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedPatientForVitals(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-md shadow-cyan-600/30"
                >
                  Save & Push to Bedside Screen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

