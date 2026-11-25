import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { X, Printer, Download, CheckCircle, FileText, AlertCircle, ShieldCheck } from 'lucide-react';

export const ReportViewerModal = () => {
  const { activeReportForModal, setActiveReportForModal, requestPrintJob, currentBedPatient, showToast } = useHospital();

  if (!activeReportForModal) return null;

  const report = activeReportForModal.report;
  const patient = activeReportForModal.patient || currentBedPatient;

  const handlePrintRequest = () => {
    if (patient && report) {
      requestPrintJob(patient.id, report.id);
      setActiveReportForModal(null);
    }
  };

  const handleSimulateDownload = () => {
    showToast(`Downloading digital PDF copy of ${report.title}...`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-navy-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-white">{report.title}</h3>
              <p className="text-xs text-cyan-200 font-medium">
                {report.category} • Issued {report.date}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveReportForModal(null)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Report Sheet */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
          
          {/* Hospital Letterhead Simulation */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h4 className="text-base font-extrabold text-navy-900 tracking-wider">CARECONNECT MEDICAL CENTER</h4>
                <p className="text-xs text-slate-500">Department of Diagnostic Pathology & Imaging Sciences</p>
                <p className="text-xs text-slate-400">CLIA Certified #99D087214 • NABH Accredited</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  Verified Digital EMR
                </span>
                <p className="text-xs text-slate-400 mt-1">Doc Ref: {report.id}</p>
              </div>
            </div>

            {/* Patient Header Block */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-2 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">PATIENT NAME</span>
                <span className="font-bold text-slate-800 text-sm">{patient?.name || 'Authorized Patient'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">PATIENT ID</span>
                <span className="font-mono font-bold text-slate-800">{patient?.id || 'PAT-DEMO'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">LOCATION</span>
                <span className="font-bold text-cyan-700">{patient?.ward || 'General'} - Bed {patient?.bedNumber || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">ATTENDING PHYSICIAN</span>
                <span className="font-bold text-slate-800">{report.doctor || patient?.assignedDoctor}</span>
              </div>
            </div>
          </div>

          {/* Clinical Findings Block */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">CLINICAL FINDINGS & OBSERVATIONS</h5>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 text-sm leading-relaxed whitespace-pre-line font-medium">
                {report.findings}
              </div>
            </div>

            {report.recommendation && (
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">INTERPRETATION & RECOMMENDATIONS</h5>
                <div className="p-4 rounded-lg bg-cyan-50/60 border border-cyan-100 text-navy-900 text-sm leading-relaxed font-medium">
                  {report.recommendation}
                </div>
              </div>
            )}

            {/* Signature & Lab Tech */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div>
                <span className="block text-slate-400">LABORATORY FACILITY:</span>
                <span className="font-semibold text-slate-700">{report.labTechnician || 'CareConnect Diagnostics Core Lab'}</span>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded font-mono text-[11px]">
                  Digitally Signed by: {report.doctor}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer / Action Buttons */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-200">
          <p className="text-xs text-slate-500 hidden sm:block">
            Physical printouts are delivered directly to the patient's bedside by the Hospital Printing Hub.
          </p>
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleSimulateDownload}
              className="flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition"
            >
              <Download className="w-4 h-4 mr-2 text-slate-500" />
              Download PDF
            </button>
            <button
              onClick={handlePrintRequest}
              className="flex items-center justify-center px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md shadow-cyan-600/20 transition active:scale-95"
            >
              <Printer className="w-4 h-4 mr-2" />
              Request Bedside Printout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

