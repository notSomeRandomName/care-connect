import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Pill, CheckCircle, XCircle, Truck, Package, Clock,
  Search, ShieldCheck, AlertCircle, RefreshCw, BarChart2
} from 'lucide-react';

export const PharmacyDashboard = () => {
  const {
    staff,
    medicineRequests,
    updateMedicineRequestStatus,
    inventory,
    showToast
  } = useHospital();

  const currentPharmacist = staff.pharmacists[0];
  const [activeTab, setActiveTab] = useState('incoming'); // 'incoming' | 'inventory' | 'history'
  const [rejectModalId, setRejectModalId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const incomingRequests = medicineRequests.filter(r => r.status !== 'Delivered' && r.status !== 'Rejected');
  const historyRequests = medicineRequests.filter(r => r.status === 'Delivered' || r.status === 'Rejected');

  const handleRejectSubmit = (e) => {
    e.preventDefault();
    if (!rejectModalId) return;

    updateMedicineRequestStatus(rejectModalId, 'Rejected', rejectReason || 'Clinical contraindication / prescription review needed');
    setRejectModalId(null);
    setRejectReason('');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 p-4 sm:p-6 lg:p-8 space-y-6 animate-fadeIn">
      
      {/* Pharmacy Header */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 rounded-3xl shadow-soft border border-navy-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              Hospital Central Pharmacy Hub
            </span>
            <span className="text-xs text-emerald-400 font-semibold">• Direct Bedside Delivery Active</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-0.5">
            Prescription Dispensing & Fulfillment Station
          </h1>
          <p className="text-xs text-slate-300 font-medium">
            Duty Pharmacist: <strong className="text-cyan-300">{currentPharmacist.name}</strong> • License: {currentPharmacist.license}
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-navy-800/80 p-3 rounded-2xl border border-navy-700">
          <div className="text-center px-3">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Pending Orders</span>
            <span className="text-xl font-black text-amber-400">{incomingRequests.length}</span>
          </div>
          <div className="h-8 w-px bg-navy-700"></div>
          <div className="text-center px-3">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Fulfillments</span>
            <span className="text-xl font-black text-emerald-400">{historyRequests.length}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 text-xs">
        <button
          onClick={() => setActiveTab('incoming')}
          className={`px-4 py-2 rounded-xl font-extrabold transition ${
            activeTab === 'incoming' ? 'bg-navy-900 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          Incoming Bedside Requests ({incomingRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-xl font-extrabold transition ${
            activeTab === 'inventory' ? 'bg-navy-900 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          Inventory Stock Levels ({inventory.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl font-extrabold transition ${
            activeTab === 'history' ? 'bg-navy-900 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          Dispensed History ({historyRequests.length})
        </button>
      </div>

      {/* 1. INCOMING REQUESTS VIEW */}
      {activeTab === 'incoming' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-navy-950 text-base flex items-center">
              <Clock className="w-5 h-5 mr-2 text-cyan-600" />
              Real-Time Incoming Medicine Orders
            </h3>
            <span className="text-xs text-slate-500">Auto-verified against active doctor prescriptions</span>
          </div>

          <div className="divide-y divide-slate-100">
            {incomingRequests.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                All medicine requests have been verified and dispensed.
              </div>
            ) : (
              incomingRequests.map(req => (
                <div key={req.id} className="p-5 hover:bg-slate-50/70 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {req.id}
                      </span>
                      <h4 className="font-black text-navy-950 text-base">{req.medicineName}</h4>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-100 text-cyan-800">
                        Qty: {req.quantity} dose(s)
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 text-xs text-slate-600">
                      <span>Patient: <strong className="text-slate-900">{req.patientName}</strong></span>
                      <span className="font-mono text-cyan-700 font-bold">Bed {req.bedNumber} ({req.ward})</span>
                      <span>Prescribed by: <strong className="text-slate-800">{req.prescribedBy}</strong></span>
                      <span className="text-slate-400 font-mono">{req.requestTime}</span>
                    </div>

                    <div className="flex items-center space-x-2 pt-1">
                      <span className="inline-flex items-center text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                        Prescription Verified & Authorized
                      </span>
                      <span className="text-[11px] text-slate-500 italic">
                        Current Status: <strong className="text-navy-900 font-bold">{req.status}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Pharmacist Workflow Step Progression */}
                  <div className="flex items-center space-x-2 shrink-0 self-end md:self-auto">
                    {req.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => setRejectModalId(req.id)}
                          className="px-3 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs transition"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => updateMedicineRequestStatus(req.id, 'Approved', 'Dispensed from Central Pharmacy. Courier assigned.')}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 transition active:scale-95"
                        >
                          Approve & Dispense
                        </button>
                      </>
                    )}

                    {req.status === 'Approved' && (
                      <button
                        onClick={() => updateMedicineRequestStatus(req.id, 'Out for Delivery', 'Courier en route to patient bed.')}
                        className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md shadow-cyan-600/20 transition active:scale-95 flex items-center space-x-1"
                      >
                        <Truck className="w-4 h-4" />
                        <span>Send Out for Bedside Delivery</span>
                      </button>
                    )}

                    {req.status === 'Out for Delivery' && (
                      <button
                        onClick={() => updateMedicineRequestStatus(req.id, 'Delivered', 'Delivered and handed to patient attendant at bedside.')}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition active:scale-95 flex items-center space-x-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Confirm Bedside Handover</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 2. INVENTORY STOCK LEVELS */}
      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {inventory.map(item => (
            <div key={item.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-400">{item.id}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  item.status === 'Low Stock' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {item.status}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-navy-950 text-base">{item.name}</h4>
                <p className="text-xs text-slate-500">{item.dosage} • {item.category}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">In Stock:</span>
                <span className={`text-base font-black ${item.stock < 50 ? 'text-rose-600' : 'text-navy-900'}`}>
                  {item.stock} {item.unit}
                </span>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.stock < 50 ? 'bg-rose-500' : 'bg-cyan-500'}`}
                  style={{ width: `${Math.min(100, (item.stock / 500) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. DISPENSED HISTORY */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-extrabold text-navy-950 text-base">Dispensed Medication Fulfillment Log</h3>
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Medicine & Qty</th>
                <th className="py-3 px-4">Prescribing Doctor</th>
                <th className="py-3 px-4">Delivery Confirmation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historyRequests.map(h => (
                <tr key={h.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold">{h.id}</td>
                  <td className="py-3 px-4">
                    <strong>{h.patientName}</strong> (Bed {h.bedNumber})
                  </td>
                  <td className="py-3 px-4 font-bold text-navy-950">{h.medicineName} x{h.quantity}</td>
                  <td className="py-3 px-4 text-slate-600">{h.prescribedBy}</td>
                  <td className="py-3 px-4">
                    <span className="text-emerald-700 font-bold flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> Delivered to Bedside
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-extrabold text-navy-950">Reject Medicine Request</h3>
            <p className="text-xs text-slate-500">Order: <strong>{rejectModalId}</strong></p>

            <form onSubmit={handleRejectSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Clinical Rejection Reason *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain why this request is rejected (e.g. dosage interval conflict, stock replenishment, consult required)..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setRejectModalId(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-md shadow-rose-600/30"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

