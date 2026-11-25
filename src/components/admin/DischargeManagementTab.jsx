import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  LogOut, Search, FileText, CheckCircle, Bed, DollarSign,
  Download, Printer, AlertTriangle, Clock, ArrowRight, ShieldCheck, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DischargeManagementTab = () => {
  const {
    patients,
    dischargedPatients,
    dischargePatient,
    showToast
  } = useHospital();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [dischargeNotes, setDischargeNotes] = useState('');
  const [paymentSettled, setPaymentSettled] = useState(true);
  const [viewSummaryModal, setViewSummaryModal] = useState(null);

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  const handleDischargeSubmit = (e) => {
    e.preventDefault();
    if (!selectedPatient) return;

    const summaryText = dischargeNotes || `Patient demonstrated favorable clinical recovery. Hemodynamically stable, ambulating well, afebrile for 48 hours. Discharge medications explained to patient and attendant.`;

    const success = dischargePatient(selectedPatient.id, summaryText, paymentSettled);
    if (success) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setDischargeNotes('');
      if (patients.length > 1) {
        const next = patients.find(p => p.id !== selectedPatient.id);
        if (next) setSelectedPatientId(next.id);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white p-6 rounded-3xl shadow-soft border border-navy-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            CareConnect Patient Exit Management System
          </span>
          <h2 className="text-xl font-extrabold text-white mt-1">
            Clinical Discharge, Billing Reconciliation & Bed Release
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Completes final medical review, generates formal discharge summary documentation, reconciles billing invoices, and immediately releases the bed for sterilization and intake.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="px-4 py-2 bg-navy-800/80 rounded-2xl border border-navy-700 text-center">
            <span className="text-xs text-slate-400 block font-medium">Currently Admitted</span>
            <span className="text-xl font-black text-cyan-300">{patients.length}</span>
          </div>
          <div className="px-4 py-2 bg-navy-800/80 rounded-2xl border border-navy-700 text-center">
            <span className="text-xs text-slate-400 block font-medium">Archived Discharges</span>
            <span className="text-xl font-black text-purple-300">{dischargedPatients.length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. DISCHARGE CONTROLS / FORM */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-6">
          <div>
            <h3 className="text-base font-extrabold text-navy-950 flex items-center">
              <LogOut className="w-5 h-5 mr-2 text-rose-600" />
              Initiate Patient Discharge Procedure
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select an admitted patient to inspect admission history, reconcile billing, and authorize discharge.
            </p>
          </div>

          {/* Patient Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Admitted Patient to Discharge:
            </label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 font-bold text-navy-950 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id}) — Bed {p.bedNumber} ({p.ward}) — {p.diagnosis}
                </option>
              ))}
            </select>
          </div>

          {selectedPatient && (
            <div className="space-y-5 pt-2">
              
              {/* Patient Quick Summary Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">ATTENDING PHYSICIAN</span>
                  <strong className="text-slate-800">{selectedPatient.assignedDoctor}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">BED ALLOCATION</span>
                  <strong className="text-cyan-700">Bed {selectedPatient.bedNumber} ({selectedPatient.ward})</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">ADMISSION DATE</span>
                  <span className="text-slate-700 font-mono">{selectedPatient.admissionDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">VERIFIED REPORTS</span>
                  <span className="text-emerald-700 font-bold">{selectedPatient.reports.length} Reports on File</span>
                </div>
              </div>

              {/* Prescriptions at Discharge Preview */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Active Discharge Prescriptions ({selectedPatient.prescriptions.length}):
                </span>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  {selectedPatient.prescriptions.map(rx => (
                    <div key={rx.id} className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">• {rx.medicineName} ({rx.dosage})</span>
                      <span className="text-slate-500 font-medium">{rx.frequency} — {rx.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing Reconciliation Breakdown */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-emerald-600" />
                    Billing Settlement & Payment Clearance
                  </h4>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                    Invoice Total: ${selectedPatient.billing.totalAmount}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 bg-white rounded-lg border border-emerald-100">
                    <span className="text-slate-400 block text-[10px]">Room Charges</span>
                    <strong className="text-slate-800">${selectedPatient.billing.roomCharges}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-emerald-100">
                    <span className="text-slate-400 block text-[10px]">Doctor Consult</span>
                    <strong className="text-slate-800">${selectedPatient.billing.doctorConsultation}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-emerald-100">
                    <span className="text-slate-400 block text-[10px]">Pharmacy & Lab</span>
                    <strong className="text-slate-800">${selectedPatient.billing.pharmacyCharges + selectedPatient.billing.laboratoryCharges}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-emerald-100">
                    <span className="text-slate-400 block text-[10px]">Patient Payable</span>
                    <strong className="text-emerald-700">${selectedPatient.billing.patientPayable}</strong>
                  </div>
                </div>

                <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paymentSettled}
                    onChange={(e) => setPaymentSettled(e.target.checked)}
                    className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
                  />
                  <span>Reconcile & mark hospital payment settled / insurance cleared</span>
                </label>
              </div>

              {/* Discharge Clinical Summary Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Doctor's Final Discharge Summary Notes:
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter clinical discharge instructions, outpatient follow-up timing, and recovery milestones..."
                  value={dischargeNotes}
                  onChange={(e) => setDischargeNotes(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 leading-relaxed"
                />
              </div>

              {/* Authorize Discharge Button */}
              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleDischargeSubmit}
                  className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-md shadow-rose-600/30 transition active:scale-95 flex items-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Authorize Discharge & Release Bed {selectedPatient.bedNumber}</span>
                </button>
              </div>

            </div>
          )}
        </div>

        {/* 2. ARCHIVED DISCHARGED PATIENT HISTORIES */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-navy-950 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-cyan-600" />
              Preserved Discharge Records ({dischargedPatients.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Historical digital EMR archive preserved in hospital database.
            </p>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[480px]">
            {dischargedPatients.map(dp => (
              <div
                key={dp.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-cyan-300 transition space-y-2 text-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-extrabold text-navy-950 text-sm">{dp.name}</h5>
                    <span className="font-mono text-cyan-700 text-[11px] font-bold">{dp.id}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                    Discharged
                  </span>
                </div>

                <p className="text-slate-600 line-clamp-2 leading-relaxed">
                  {dp.dischargeSummary}
                </p>

                <div className="pt-1 text-[11px] text-slate-500 border-t border-slate-200/60 flex items-center justify-between">
                  <span>Discharged: {dp.dischargeDate}</span>
                  <span className="text-emerald-700 font-bold">{dp.billingStatus}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-100 rounded-xl text-center text-[11px] text-slate-500 font-medium">
            🔒 Discharged patient records are preserved indefinitely with encrypted audit stamps.
          </div>
        </div>

      </div>

    </div>
  );
};

