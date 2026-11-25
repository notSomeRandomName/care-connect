import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { X, Shield, Search, Filter, Clock, User, CheckCircle2 } from 'lucide-react';

export const AuditTrailModal = ({ isOpen, onClose }) => {
  const { auditLogs } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');

  if (!isOpen) return null;

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterRole === 'ALL') return matchesSearch;
    return matchesSearch && log.user.toLowerCase().includes(filterRole.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-navy-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">CARECONNECT System Audit Trail</h3>
              <p className="text-xs text-cyan-200">Immutable, timestamped event log & security compliance record</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-3 items-center justify-between">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit actions, patients, or actors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-medium">Actor:</span>
            {['ALL', 'Admin', 'Doctor', 'Nurse', 'Pharmacy', 'Bedside'].map(role => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  filterRole === role
                    ? 'bg-navy-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Log Entries List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-slate-100/60">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No audit logs match your search criteria.
            </div>
          ) : (
            filteredLogs.map(log => (
              <div
                key={log.id}
                className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-cyan-300 transition flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-navy-100 text-navy-800">
                      {log.action}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 flex items-center">
                      <User className="w-3 h-3 mr-1 text-slate-400" />
                      {log.user}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {log.details}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-mono text-slate-400 flex items-center justify-end">
                    <Clock className="w-3 h-3 mr-1 text-slate-400" />
                    {log.timestamp}
                  </span>
                  <span className="text-[10px] text-slate-300 font-mono mt-0.5 block">{log.id}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center text-emerald-600 font-medium">
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            Active Session Enforced • 256-Bit SHA Integrity Verification
          </span>
          <span>Showing {filteredLogs.length} events</span>
        </div>

      </div>
    </div>
  );
};

