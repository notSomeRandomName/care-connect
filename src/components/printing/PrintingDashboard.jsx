import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Printer, CheckCircle, Clock, FileText, Send, Eye,
  Sparkles, ShieldCheck, Download, AlertCircle, RefreshCw
} from 'lucide-react';

export const PrintingDashboard = () => {
  const {
    staff,
    printingRequests,
    updatePrintJobStatus,
    patients,
    setActiveReportForModal,
    showToast
  } = useHospital();

  const currentPrinter = staff.printers[0];
  const [activeTab, setActiveTab] = useState('queue'); // 'queue' | 'history'

  const activeQueue = printingRequests.filter(r => r.status !== 'Delivered');
  const historyQueue = printingRequests.filter(r => r.status === 'Delivered');

  return (
    <div className="min-h-screen bg-slate-100/70 p-4 sm:p-6 lg:p-8 space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 rounded-3xl shadow-soft border border-navy-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              Central Hospital Printing & Records Dispatch
            </span>
            <span className="text-xs text-emerald-400 font-semibold">• High-Res Medical Laser Hub</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-0.5">
            Diagnostic & EMR Print Job Station
          </h1>
          <p className="text-xs text-slate-300 font-medium">
            Lead Records Officer: <strong className="text-cyan-300">{currentPrinter.name}</strong> • Station: {currentPrinter.station}
          </p>
        </div>

        {/* Hardware Status Indicators */}
        <div className="flex items-center space-x-3 bg-navy-800/80 p-3 rounded-2xl border border-navy-700 text-xs">
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Print Queue</span>
            <span className="text-lg font-black text-cyan-300">{activeQueue.length} jobs</span>
          </div>
          <div className="h-7 w-px bg-navy-700"></div>
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Laser Paper</span>
            <span className="text-sm font-black text-emerald-400">92% Full</span>
          </div>
          <div className="h-7 w-px bg-navy-700"></div>
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Toner Cartridge</span>
            <span className="text-sm font-black text-emerald-400">88% (OK)</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 text-xs">
        <button
          onClick={() => setActiveTab('queue')}
          className={`px-4 py-2 rounded-xl font-extrabold transition ${
            activeTab === 'queue' ? 'bg-navy-900 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          Active Print Queue ({activeQueue.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl font-extrabold transition ${
            activeTab === 'history' ? 'bg-navy-900 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          Delivered Records ({historyQueue.length})
        </button>
      </div>

      {/* 1. ACTIVE PRINT QUEUE */}
      {activeTab === 'queue' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-navy-950 text-base flex items-center">
              <Printer className="w-5 h-5 mr-2 text-cyan-600" />
              Incoming Patient Print Orders
            </h3>
            <span className="text-xs text-slate-500">Requested from Bedside Touchscreen Terminals</span>
          </div>

          <div className="divide-y divide-slate-100">
            {activeQueue.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                All print jobs have been dispatched and delivered to patient bedsides.
              </div>
            ) : (
              activeQueue.map(job => {
                const patient = patients.find(p => p.id === job.patientId);
                const report = patient?.reports.find(r => r.id === job.reportId);

                return (
                  <div key={job.id} className="p-5 hover:bg-slate-50/70 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {job.id}
                        </span>
                        <h4 className="font-black text-navy-950 text-base">{job.reportTitle}</h4>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 text-xs text-slate-600">
                        <span>Patient: <strong className="text-slate-900">{job.patientName}</strong></span>
                        <span className="font-mono text-cyan-700 font-bold">Bed {job.bedNumber} ({job.ward})</span>
                        <span className="text-slate-400 font-mono">Requested: {job.requestTime}</span>
                      </div>

                      <div className="flex items-center space-x-2 pt-1 text-[11px]">
                        <span className="text-slate-500">
                          Current Status: <strong className="text-navy-900 font-bold">{job.status}</strong>
                        </span>
                        {job.printedBy && (
                          <span className="text-slate-400">• Handled by {job.printedBy}</span>
                        )}
                      </div>
                    </div>

                    {/* Actions Pipeline */}
                    <div className="flex items-center space-x-2 shrink-0 self-end md:self-auto">
                      {report && (
                        <button
                          onClick={() => setActiveReportForModal({ report, patient })}
                          className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Doc</span>
                        </button>
                      )}

                      {job.status === 'Pending' && (
                        <button
                          onClick={() => updatePrintJobStatus(job.id, 'Printing', currentPrinter.name)}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 transition active:scale-95 flex items-center space-x-1"
                        >
                          <Printer className="w-4 h-4" />
                          <span>Send to Laser Printer</span>
                        </button>
                      )}

                      {job.status === 'Printing' && (
                        <button
                          onClick={() => updatePrintJobStatus(job.id, 'Ready for Delivery', currentPrinter.name)}
                          className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md shadow-cyan-600/20 transition active:scale-95 flex items-center space-x-1"
                        >
                          <Send className="w-4 h-4" />
                          <span>Mark Ready for Delivery</span>
                        </button>
                      )}

                      {job.status === 'Ready for Delivery' && (
                        <button
                          onClick={() => updatePrintJobStatus(job.id, 'Delivered', currentPrinter.name)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition active:scale-95 flex items-center space-x-1"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Confirm Bedside Handover</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* 2. DELIVERED RECORDS */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-extrabold text-navy-950 text-base">Completed Print & Delivery History</h3>
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                <th className="py-3 px-4">Job ID</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Handled By</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historyQueue.map(h => (
                <tr key={h.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">{h.id}</td>
                  <td className="py-3 px-4">
                    <strong>{h.patientName}</strong> (Bed {h.bedNumber})
                  </td>
                  <td className="py-3 px-4 font-bold text-navy-950">{h.reportTitle}</td>
                  <td className="py-3 px-4 text-slate-600">{h.printedBy || 'Marcus Vance'}</td>
                  <td className="py-3 px-4">
                    <span className="text-emerald-700 font-bold flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> Delivered to Patient
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

