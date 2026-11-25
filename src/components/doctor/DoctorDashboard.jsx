import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Stethoscope, Users, Pill, FileText, Activity, CheckCircle,
  PlusCircle, HeartPulse, Send, AlertCircle, Eye, ShieldCheck,
  Calendar, Clock, User
} from 'lucide-react';

export const DoctorDashboard = () => {
  const {
    staff,
    selectedDoctorId,
    setSelectedDoctorId,
    patients,
    doctorAddPrescription,
    doctorAddReport,
    doctorUpdateTreatmentPlan,
    setActiveReportForModal,
    showToast
  } = useHospital();

  const currentDoctor = staff.doctors.find(d => d.id === selectedDoctorId) || staff.doctors[0];
  
  // Find patients assigned to this doctor (or show all if none specifically matched for demo convenience)
  const assignedPatients = patients.filter(p => p.assignedDoctor.includes(currentDoctor.name.split(' ')[1]) || p.assignedDoctor === currentDoctor.name);
  const activePatientsList = assignedPatients.length > 0 ? assignedPatients : patients;

  const [selectedPatientId, setSelectedPatientId] = useState(activePatientsList[0]?.id || '');
  const [activeTab, setActiveTab] = useState('prescriptions'); // 'prescriptions' | 'labs' | 'notes' | 'vitals'

  // Prescription Form state
  const [showRxModal, setShowRxModal] = useState(false);
  const [rxForm, setRxForm] = useState({
    medicineName: '',
    dosage: '',
    frequency: 'Once daily after breakfast',
    route: 'Oral',
    duration: '7 Days'
  });

  // Lab Report Form state
  const [showLabModal, setShowLabModal] = useState(false);
  const [labForm, setLabForm] = useState({
    title: '',
    category: 'Blood Test',
    findings: '',
    recommendation: ''
  });

  // Treatment Note Form state
  const selectedPatient = patients.find(p => p.id === selectedPatientId) || activePatientsList[0];
  const [treatmentPlanText, setTreatmentPlanText] = useState(selectedPatient?.currentTreatment || '');

  // Handle Add Prescription
  const handleAddPrescriptionSubmit = (e) => {
    e.preventDefault();
    if (!rxForm.medicineName || !rxForm.dosage) {
      showToast('Please enter medicine name and dosage.', 'warning');
      return;
    }

    doctorAddPrescription(selectedPatient.id, {
      ...rxForm,
      prescribedBy: currentDoctor.name
    });

    setShowRxModal(false);
    setRxForm({ medicineName: '', dosage: '', frequency: 'Once daily after breakfast', route: 'Oral', duration: '7 Days' });
  };

  // Handle Add Lab Report
  const handleAddLabSubmit = (e) => {
    e.preventDefault();
    if (!labForm.title || !labForm.findings) {
      showToast('Please enter report title and clinical findings.', 'warning');
      return;
    }

    doctorAddReport(selectedPatient.id, {
      ...labForm,
      doctor: currentDoctor.name,
      labTechnician: 'Central Diagnostic Pathology Unit'
    });

    setShowLabModal(false);
    setLabForm({ title: '', category: 'Blood Test', findings: '', recommendation: '' });
  };

  // Handle Update Plan
  const handleUpdatePlan = () => {
    doctorUpdateTreatmentPlan(selectedPatient.id, treatmentPlanText);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 p-4 sm:p-6 lg:p-8 space-y-6 animate-fadeIn">
      
      {/* 1. DOCTOR WORKSTATION HEADER */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 rounded-3xl shadow-soft border border-navy-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="flex items-center space-x-4">
          <img
            src={currentDoctor.avatar}
            alt={currentDoctor.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400 shadow-md shadow-cyan-500/20"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                Attending Physician Portal
              </span>
              <span className="text-xs text-emerald-400 font-semibold">• Active Shift</span>
            </div>
            <h1 className="text-2xl font-black text-white mt-0.5">{currentDoctor.name}</h1>
            <p className="text-xs text-slate-300 font-medium">
              {currentDoctor.specialty} • {currentDoctor.department} • Suite: {currentDoctor.room}
            </p>
          </div>
        </div>

        {/* Doctor Switcher Dropdown */}
        <div className="flex items-center space-x-3 bg-navy-800/80 p-3 rounded-2xl border border-navy-700">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-slate-400 block font-medium">Switch Doctor Profile:</span>
            <span className="text-xs font-bold text-cyan-300">Demo Testing</span>
          </div>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="bg-navy-950 border border-cyan-500/40 text-cyan-200 text-xs rounded-xl px-3 py-2 font-bold focus:outline-none cursor-pointer"
          >
            {staff.doctors.map(d => (
              <option key={d.id} value={d.id} className="bg-navy-900 text-white">
                {d.name} ({d.specialty})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* 2. MAIN CLINICAL WORKSTATION: PATIENT ROSTER + SELECTED PATIENT DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Assigned Patients Roster */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-navy-950 text-sm flex items-center">
                <Users className="w-4 h-4 mr-1.5 text-cyan-600" />
                Assigned Patients ({activePatientsList.length})
              </h3>
              <p className="text-[11px] text-slate-500">Select to review charts & prescribe</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-800">
              Ward Telemetry Live
            </span>
          </div>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto">
            {activePatientsList.map(p => {
              const isSelected = p.id === (selectedPatient?.id || selectedPatientId);
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedPatientId(p.id);
                    setTreatmentPlanText(p.currentTreatment);
                  }}
                  className={`p-4 rounded-xl border transition cursor-pointer select-none space-y-2 ${
                    isSelected
                      ? 'bg-cyan-50/80 border-cyan-400 shadow-xs ring-1 ring-cyan-400/50'
                      : 'bg-white border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-navy-950 text-sm">{p.name}</span>
                    <span className="font-mono text-xs font-bold text-cyan-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Bed {p.bedNumber}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-1 font-medium">{p.diagnosis}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                    <span className="font-mono">HR: {p.vitals.heartRate} • BP: {p.vitals.bloodPressure}</span>
                    <span className="text-cyan-700 font-semibold">{p.ward}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Clinical Patient Chart & Action Hub */}
        {selectedPatient && (
          <div className="lg:col-span-2 space-y-6">
            
            {/* Patient Header Banner */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-black text-navy-950">{selectedPatient.name}</h2>
                    <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-slate-100 text-slate-700">
                      {selectedPatient.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {selectedPatient.age} years • {selectedPatient.gender} • Admitted: {selectedPatient.admissionDate}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
                    Bed {selectedPatient.bedNumber} ({selectedPatient.ward})
                  </span>
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Bedside Screen Active
                  </span>
                </div>
              </div>

              {/* Patient Demographics & Critical Flags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block font-medium">DIAGNOSIS</span>
                  <strong className="text-slate-800 block truncate">{selectedPatient.diagnosis}</strong>
                </div>
                <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100">
                  <span className="text-rose-500 block font-bold">ALLERGIES</span>
                  <strong className="text-rose-700 block truncate">{selectedPatient.allergies}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block font-medium">ASSIGNED NURSE</span>
                  <strong className="text-slate-800 block truncate">{selectedPatient.assignedNurse}</strong>
                </div>
                <div className="p-3 rounded-xl bg-cyan-50/60 border border-cyan-100">
                  <span className="text-cyan-700 block font-medium">LATEST SPO2</span>
                  <strong className="text-cyan-900 block font-mono">{selectedPatient.vitals.spo2}% ({selectedPatient.vitals.temperature}°F)</strong>
                </div>
              </div>

              {/* Sub-Tabs: Prescriptions vs Lab Tests vs Notes */}
              <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 text-xs">
                <button
                  onClick={() => setActiveTab('prescriptions')}
                  className={`px-4 py-2 rounded-xl font-extrabold transition ${
                    activeTab === 'prescriptions'
                      ? 'bg-navy-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Active Prescriptions ({selectedPatient.prescriptions.length})
                </button>
                <button
                  onClick={() => setActiveTab('labs')}
                  className={`px-4 py-2 rounded-xl font-extrabold transition ${
                    activeTab === 'labs'
                      ? 'bg-navy-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Diagnostic & Lab Tests ({selectedPatient.reports.length})
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-4 py-2 rounded-xl font-extrabold transition ${
                    activeTab === 'notes'
                      ? 'bg-navy-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Treatment Plan & Notes
                </button>
              </div>
            </div>

            {/* TAB 1: PRESCRIPTIONS */}
            {activeTab === 'prescriptions' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-navy-950 flex items-center">
                      <Pill className="w-5 h-5 mr-2 text-cyan-600" />
                      Doctor Prescription Orders
                    </h3>
                    <p className="text-xs text-slate-500">
                      Medications prescribed here automatically sync to the patient's bedside touchscreen and pharmacy.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowRxModal(true)}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md shadow-cyan-600/20 transition active:scale-95 flex items-center space-x-1.5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Issue New Prescription</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {selectedPatient.prescriptions.map(rx => (
                    <div key={rx.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 text-sm font-black">{rx.medicineName}</strong>
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-cyan-100 text-cyan-800">
                          {rx.dosage}
                        </span>
                      </div>
                      <div className="text-slate-600 font-medium">
                        Schedule: <span className="text-slate-900">{rx.frequency}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                        <span>Route: {rx.route} • Duration: {rx.duration}</span>
                        <span className="text-emerald-700 font-bold">Active RX</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: LAB TESTS & REPORTS */}
            {activeTab === 'labs' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-navy-950 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-cyan-600" />
                      Patient Diagnostic & Laboratory Reports
                    </h3>
                    <p className="text-xs text-slate-500">
                      Uploaded reports are immediately accessible to the patient on their bedside tablet.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowLabModal(true)}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md shadow-cyan-600/20 transition active:scale-95 flex items-center space-x-1.5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Upload Lab / Radiology Report</span>
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  {selectedPatient.reports.map(report => (
                    <div key={report.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-100 text-cyan-800">
                            {report.category}
                          </span>
                          <span className="font-extrabold text-slate-900 text-sm">{report.title}</span>
                        </div>
                        <p className="text-slate-600 mt-1 line-clamp-1">{report.findings}</p>
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">Issued: {report.date}</span>
                      </div>

                      <button
                        onClick={() => setActiveReportForModal({ report, patient: selectedPatient })}
                        className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-cyan-700 text-white font-bold text-xs transition shrink-0"
                      >
                        Inspect Report
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: TREATMENT PLAN & NOTES */}
            {activeTab === 'notes' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
                <div>
                  <h3 className="text-base font-extrabold text-navy-950">Clinical Treatment Plan & Progress Orders</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Changes made here directly update the patient's bedside banner and nursing task list.
                  </p>
                </div>

                <textarea
                  rows={4}
                  value={treatmentPlanText}
                  onChange={(e) => setTreatmentPlanText(e.target.value)}
                  className="w-full p-4 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 leading-relaxed font-medium"
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleUpdatePlan}
                    className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md shadow-cyan-600/20 transition active:scale-95"
                  >
                    Save & Push Update to Bedside Screen
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* MODAL 1: ISSUE PRESCRIPTION */}
      {showRxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-extrabold text-navy-950">Issue New Prescription Order</h3>
            <p className="text-xs text-slate-500">Patient: <strong>{selectedPatient.name}</strong> (Bed {selectedPatient.bedNumber})</p>

            <form onSubmit={handleAddPrescriptionSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Medication Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ciprofloxacin HCl"
                  value={rxForm.medicineName}
                  onChange={(e) => setRxForm({ ...rxForm, medicineName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dosage *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 500 mg"
                    value={rxForm.dosage}
                    onChange={(e) => setRxForm({ ...rxForm, dosage: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Route</label>
                  <select
                    value={rxForm.route}
                    onChange={(e) => setRxForm({ ...rxForm, route: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Oral">Oral</option>
                    <option value="Intravenous (IV)">Intravenous (IV)</option>
                    <option value="Subcutaneous">Subcutaneous</option>
                    <option value="Inhalation">Inhalation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Frequency Schedule</label>
                <input
                  type="text"
                  placeholder="e.g. Twice daily after meals"
                  value={rxForm.frequency}
                  onChange={(e) => setRxForm({ ...rxForm, frequency: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 5 Days"
                  value={rxForm.duration}
                  onChange={(e) => setRxForm({ ...rxForm, duration: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowRxModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-md shadow-cyan-600/30"
                >
                  Authorize & Push to Bedside
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: UPLOAD LAB REPORT */}
      {showLabModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-extrabold text-navy-950">Upload Lab / Diagnostic Findings</h3>
            <p className="text-xs text-slate-500">Patient: <strong>{selectedPatient.name}</strong> (Bed {selectedPatient.bedNumber})</p>

            <form onSubmit={handleAddLabSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Report Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Repeat Serum Potassium & Renal Panel"
                  value={labForm.title}
                  onChange={(e) => setLabForm({ ...labForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={labForm.category}
                  onChange={(e) => setLabForm({ ...labForm, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="Blood Test">Blood Test</option>
                  <option value="X-Ray Report">X-Ray Report</option>
                  <option value="CT Scan">CT Scan</option>
                  <option value="MRI Scan">MRI Scan</option>
                  <option value="Ultrasound Report">Ultrasound Report</option>
                  <option value="Laboratory Report">Laboratory Report</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Clinical Findings *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Clinical observation, quantitative laboratory results, reference levels..."
                  value={labForm.findings}
                  onChange={(e) => setLabForm({ ...labForm, findings: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Interpretation & Recommendations</label>
                <input
                  type="text"
                  placeholder="Clinical guidance for nursing & patient..."
                  value={labForm.recommendation}
                  onChange={(e) => setLabForm({ ...labForm, recommendation: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowLabModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-md shadow-cyan-600/30"
                >
                  Upload & Sync to Bedside
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

