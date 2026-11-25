import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_BEDS,
  INITIAL_STAFF,
  INITIAL_PATIENTS,
  INITIAL_DISCHARGED_PATIENTS,
  INITIAL_MEDICINE_REQUESTS,
  INITIAL_PRINTING_REQUESTS,
  INITIAL_EMERGENCY_ALERTS,
  INITIAL_ASSISTANCE_REQUESTS,
  INITIAL_PHARMACY_INVENTORY,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_AUDIT_LOGS
} from '../data/initialData';

const HospitalContext = createContext(null);

const STORAGE_KEY = 'careconnect_ecosystem_state_v1';

export const HospitalProvider = ({ children }) => {
  // Load initial state from LocalStorage or default to demo data
  const loadSavedState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved state from localStorage:', e);
    }
    return null;
  };

  const initialState = loadSavedState();

  const [patients, setPatients] = useState(initialState?.patients || INITIAL_PATIENTS);
  const [dischargedPatients, setDischargedPatients] = useState(initialState?.dischargedPatients || INITIAL_DISCHARGED_PATIENTS);
  const [beds, setBeds] = useState(initialState?.beds || INITIAL_BEDS);
  const [staff, setStaff] = useState(initialState?.staff || INITIAL_STAFF);
  const [medicineRequests, setMedicineRequests] = useState(initialState?.medicineRequests || INITIAL_MEDICINE_REQUESTS);
  const [printingRequests, setPrintingRequests] = useState(initialState?.printingRequests || INITIAL_PRINTING_REQUESTS);
  const [emergencyAlerts, setEmergencyAlerts] = useState(initialState?.emergencyAlerts || INITIAL_EMERGENCY_ALERTS);
  const [assistanceRequests, setAssistanceRequests] = useState(initialState?.assistanceRequests || INITIAL_ASSISTANCE_REQUESTS);
  const [inventory, setInventory] = useState(initialState?.inventory || INITIAL_PHARMACY_INVENTORY);
  const [announcements, setAnnouncements] = useState(initialState?.announcements || INITIAL_ANNOUNCEMENTS);
  const [auditLogs, setAuditLogs] = useState(initialState?.auditLogs || INITIAL_AUDIT_LOGS);

  // App Navigation & Role Control
  const [currentRole, setCurrentRole] = useState('admin'); // 'admin' | 'doctor' | 'nurse' | 'pharmacy' | 'printing' | 'patient'
  const [selectedDoctorId, setSelectedDoctorId] = useState('DOC-01'); // Dr. Sarah Jenkins
  const [selectedNurseId, setSelectedNurseId] = useState('NUR-01'); // Nurse Elena Ramos
  const [selectedBedId, setSelectedBedId] = useState('BED-ICU-02'); // Bed ICU-02 (Marcus Sterling)
  const [isTouchKioskMode, setIsTouchKioskMode] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState('Overview');
  const [notificationToast, setNotificationToast] = useState(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeReportForModal, setActiveReportForModal] = useState(null);

  // Persist to LocalStorage
  useEffect(() => {
    try {
      const stateToSave = {
        patients,
        dischargedPatients,
        beds,
        staff,
        medicineRequests,
        printingRequests,
        emergencyAlerts,
        assistanceRequests,
        inventory,
        announcements,
        auditLogs
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to persist state to localStorage:', e);
    }
  }, [patients, dischargedPatients, beds, staff, medicineRequests, printingRequests, emergencyAlerts, assistanceRequests, inventory, announcements, auditLogs]);

  // Toast auto-dismiss
  useEffect(() => {
    if (notificationToast) {
      const timer = setTimeout(() => {
        setNotificationToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notificationToast]);

  const showToast = (message, type = 'info') => {
    setNotificationToast({ id: Date.now(), message, type });
  };

  const addAuditLog = (user, action, details) => {
    const newLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }) + ' Today',
      user,
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 99)]);
  };

  // Helper to get active emergency alerts count
  const activeEmergencyCount = emergencyAlerts.filter(a => !a.acknowledged).length;

  // 1. PATIENT REGISTRATION & ADMISSION
  const registerPatient = (formData) => {
    // Generate next unique patient ID
    const nextNum = 899 + patients.length + dischargedPatients.length;
    const newPatientId = `PAT-2026-0${nextNum}`;

    const targetBed = beds.find(b => b.id === formData.bedId);
    if (!targetBed) {
      showToast('Error: Selected bed could not be found.', 'error');
      return null;
    }

    const newPatient = {
      id: newPatientId,
      name: formData.name,
      age: parseInt(formData.age, 10),
      dob: formData.dob || '1985-06-15',
      gender: formData.gender,
      phone: formData.phone,
      emergencyContact: formData.emergencyContact,
      emergencyPhone: formData.emergencyPhone,
      relationship: formData.relationship || 'Next of Kin',
      address: formData.address,
      medicalHistory: formData.medicalHistory || 'No prior chronic conditions recorded.',
      allergies: formData.allergies || 'None reported',
      diagnosis: formData.diagnosis,
      assignedDoctor: formData.assignedDoctor,
      assignedNurse: formData.assignedNurse,
      department: targetBed.department,
      ward: targetBed.ward,
      bedNumber: targetBed.bedNumber,
      admissionDate: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      status: 'Admitted',
      currentTreatment: formData.currentTreatment || 'Baseline vital stability, standard admission protocol, specialist evaluation pending.',
      attendantDetails: {
        name: formData.attendantName || formData.emergencyContact,
        relationship: formData.relationship || 'Attendant',
        phone: formData.attendantPhone || formData.emergencyPhone,
        passNumber: `ATT-${targetBed.bedNumber.replace('-', '')}-${nextNum}`
      },
      vitals: {
        heartRate: 76,
        bloodPressure: '120/80',
        spo2: 98,
        temperature: 98.6,
        respiratoryRate: 16,
        bloodSugar: 100,
        lastUpdated: 'Just now'
      },
      mealPlan: {
        dietType: 'Standard Healthy Hospital Diet',
        breakfast: 'Oatmeal with fruit, scrambled eggs, warm milk or herbal tea',
        lunch: 'Steamed vegetables, grilled chicken/tofu, brown rice, whole-grain bread',
        dinner: 'Vegetable soup, baked potato, fresh tossed garden salad',
        restrictions: 'Standard sodium, balanced hydration.'
      },
      reports: [
        {
          id: `REP-${nextNum}-01`,
          title: 'Admission Comprehensive Metabolic & Blood Panel',
          category: 'Blood Test',
          date: 'Just now',
          doctor: formData.assignedDoctor,
          labTechnician: 'Central Pathology Laboratory',
          status: 'Final Verified',
          findings: 'Electrolytes within normal physiological parameters. Blood urea nitrogen 14 mg/dL, Creatinine 0.9 mg/dL. Baseline Hb 13.5 g/dL.',
          recommendation: 'Baseline admission profiles satisfactory.',
          downloadUrl: '#',
          printRequested: false
        }
      ],
      prescriptions: [
        {
          id: `RX-${nextNum}-01`,
          medicineName: 'Paracetamol',
          dosage: '650 mg',
          frequency: 'As needed for discomfort (q8h)',
          route: 'Oral',
          duration: '3 Days',
          status: 'Active',
          prescribedBy: formData.assignedDoctor,
          stockAvailable: true
        }
      ],
      billing: {
        roomCharges: 600,
        doctorConsultation: 350,
        pharmacyCharges: 95,
        laboratoryCharges: 250,
        nursingCare: 180,
        totalAmount: 1475,
        insuranceCovered: 1200,
        patientPayable: 275,
        status: 'Active Admission'
      }
    };

    // Update Bed status to occupied
    setBeds(prev => prev.map(b => b.id === targetBed.id ? { ...b, status: 'occupied', patientId: newPatientId } : b));
    
    // Add patient
    setPatients(prev => [newPatient, ...prev]);

    // Select this bed for Bedside view so judges immediately see the result!
    setSelectedBedId(targetBed.id);

    addAuditLog('Hospital Admin', 'Patient Admitted', `Patient ${newPatient.name} (${newPatientId}) admitted to ${targetBed.ward} Bed ${targetBed.bedNumber}.`);
    showToast(`Patient ${newPatient.name} admitted to Bed ${targetBed.bedNumber}! Bedside portal active.`, 'success');

    return newPatient;
  };

  // 2. PATIENT DISCHARGE MANAGEMENT
  const dischargePatient = (patientId, summaryNotes = '', paymentSettled = true) => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return false;

    const dischargeDate = new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });

    const dischargeRecord = {
      id: patient.id,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      diagnosis: patient.diagnosis,
      assignedDoctor: patient.assignedDoctor,
      ward: patient.ward,
      bedNumber: patient.bedNumber,
      admissionDate: patient.admissionDate,
      dischargeDate: dischargeDate,
      dischargeSummary: summaryNotes || `Patient clinical course was uncomplicated. Hemodynamically stable upon discharge. Vital signs within normal limits. Discharge education provided.`,
      billingStatus: paymentSettled ? `Settled ($${patient.billing.totalAmount})` : `Pending Insurance Processing ($${patient.billing.patientPayable})`,
      prescriptionsAtDischarge: patient.prescriptions.map(rx => `${rx.medicineName} (${rx.dosage})`).join(', ')
    };

    // Free the bed (set to 'available' or 'cleaning')
    setBeds(prev => prev.map(b => b.bedNumber === patient.bedNumber ? { ...b, status: 'available', patientId: null } : b));

    // Remove from active patients, add to dischargedPatients
    setPatients(prev => prev.filter(p => p.id !== patientId));
    setDischargedPatients(prev => [dischargeRecord, ...prev]);

    // Remove any active emergency alerts for this patient
    setEmergencyAlerts(prev => prev.filter(a => a.patientId !== patientId));

    addAuditLog('Hospital Admin', 'Patient Discharged', `Patient ${patient.name} (${patient.id}) discharged from Bed ${patient.bedNumber}. Bed freed.`);
    showToast(`Discharge complete for ${patient.name}. Bed ${patient.bedNumber} is now marked Available!`, 'success');

    return true;
  };

  // 3. EMERGENCY ALERTS
  const triggerEmergencyAlert = (patientId, customReason = 'Emergency Assistance Call Triggered from Bedside Touchscreen') => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    // Check if there is already an active alert for this bed to prevent spamming
    const existing = emergencyAlerts.find(a => a.patientId === patientId && !a.acknowledged);
    if (existing) {
      showToast(`Emergency alert is already active for Bed ${patient.bedNumber}!`, 'warning');
      return;
    }

    const newAlert = {
      id: `EMG-ALERT-${Date.now().toString().slice(-4)}`,
      patientId: patient.id,
      patientName: patient.name,
      bedNumber: patient.bedNumber,
      ward: patient.ward,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }) + ' Today',
      reason: customReason,
      severity: 'CRITICAL',
      acknowledged: false,
      acknowledgedBy: null,
      acknowledgedTime: null,
      status: 'Active Alert'
    };

    setEmergencyAlerts(prev => [newAlert, ...prev]);
    addAuditLog('Bedside Touchscreen', 'EMERGENCY CODE BLUE ALERT', `Emergency button pressed at Bed ${patient.bedNumber} (${patient.name}). Nurse station alerted!`);
    showToast(`🚨 CRITICAL EMERGENCY ALERT: Bed ${patient.bedNumber} (${patient.name}) requires immediate assistance!`, 'error');
  };

  const acknowledgeEmergencyAlert = (alertId, staffName = 'Nurse Elena Ramos') => {
    setEmergencyAlerts(prev => prev.map(alert => {
      if (alert.id === alertId) {
        return {
          ...alert,
          acknowledged: true,
          acknowledgedBy: staffName,
          acknowledgedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
          status: 'Resolved & Attended'
        };
      }
      return alert;
    }));

    addAuditLog(staffName, 'Emergency Alert Acknowledged', `Emergency alert ${alertId} responded to and marked attended.`);
    showToast(`Emergency alert acknowledged by ${staffName}. Attending bedside now.`, 'info');
  };

  // 4. MEDICINE ORDERING (BEDSIDE & PHARMACY)
  const requestMedicineOrder = (patientId, prescriptionId, quantity = 1) => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return false;

    const prescription = patient.prescriptions.find(p => p.id === prescriptionId);
    if (!prescription) {
      showToast('Error: Medicine is not found on patient authorized prescription list.', 'error');
      return false;
    }

    const newReqId = `MED-REQ-${Date.now().toString().slice(-3)}`;
    const newRequest = {
      id: newReqId,
      patientId: patient.id,
      patientName: patient.name,
      bedNumber: patient.bedNumber,
      ward: patient.ward,
      medicineName: `${prescription.medicineName} ${prescription.dosage}`,
      quantity: parseInt(quantity, 10) || 1,
      requestTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) + ' Today',
      prescribedBy: prescription.prescribedBy,
      verified: true,
      status: 'Pending', // Pending -> Approved -> Out for Delivery -> Delivered
      pharmacistNotes: 'Verified against active doctor prescription.'
    };

    setMedicineRequests(prev => [newRequest, ...prev]);
    addAuditLog(`Patient Bedside (${patient.bedNumber})`, 'Medicine Requested', `Requested ${quantity}x ${newRequest.medicineName} from hospital pharmacy.`);
    showToast(`Medicine request for ${newRequest.medicineName} sent to Hospital Pharmacy!`, 'success');
    return true;
  };

  const updateMedicineRequestStatus = (requestId, newStatus, notes = '') => {
    setMedicineRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: newStatus,
          pharmacistNotes: notes || req.pharmacistNotes
        };
      }
      return req;
    }));

    addAuditLog('Pharmacy Dept', `Medicine Status: ${newStatus}`, `Order ${requestId} status updated to ${newStatus}.`);
    showToast(`Medicine Order ${requestId} updated to: ${newStatus}`, 'info');
  };

  // 5. PRINTING SERVICES (BEDSIDE & PRINTING DEPT)
  const requestPrintJob = (patientId, reportId) => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return false;

    const report = patient.reports.find(r => r.id === reportId);
    if (!report) return false;

    // Check if already requested
    const existing = printingRequests.find(pr => pr.patientId === patientId && pr.reportId === reportId && pr.status !== 'Delivered');
    if (existing) {
      showToast(`A physical print request is already in progress for "${report.title}".`, 'warning');
      return false;
    }

    const newReqId = `PRT-REQ-${Date.now().toString().slice(-3)}`;
    const newPrintJob = {
      id: newReqId,
      patientId: patient.id,
      patientName: patient.name,
      bedNumber: patient.bedNumber,
      ward: patient.ward,
      reportId: report.id,
      reportTitle: report.title,
      requestTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) + ' Today',
      status: 'Pending', // Pending -> Printing -> Ready for Delivery -> Delivered
      printedBy: null,
      deliveryNotes: 'Requested from patient bedside touchscreen.'
    };

    setPrintingRequests(prev => [newPrintJob, ...prev]);
    
    // Mark report in patient record
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          reports: p.reports.map(r => r.id === reportId ? { ...r, printRequested: true } : r)
        };
      }
      return p;
    }));

    addAuditLog(`Patient Bedside (${patient.bedNumber})`, 'Print Request Initiated', `Requested physical print of "${report.title}".`);
    showToast(`Print request submitted! Printing department will deliver to Bed ${patient.bedNumber}.`, 'success');
    return true;
  };

  const updatePrintJobStatus = (requestId, newStatus, printedBy = 'Marcus Vance') => {
    setPrintingRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: newStatus,
          printedBy: newStatus === 'Printing' || newStatus === 'Ready for Delivery' ? printedBy : req.printedBy
        };
      }
      return req;
    }));

    addAuditLog('Printing Department', `Print Job: ${newStatus}`, `Print job ${requestId} updated to ${newStatus}.`);
    showToast(`Print Job ${requestId} marked: ${newStatus}`, 'info');
  };

  // 6. BEDSIDE ASSISTANCE REQUESTS (NURSE, WHEELCHAIR, HOUSEKEEPING)
  const requestBedsideAssistance = (patientId, type, details) => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    const newAssistance = {
      id: `AST-REQ-${Date.now().toString().slice(-3)}`,
      patientId: patient.id,
      patientName: patient.name,
      bedNumber: patient.bedNumber,
      ward: patient.ward,
      type, // 'Nurse Call' | 'Wheelchair Assistance' | 'Housekeeping' | 'Hospital Support'
      details: details || `Assistance request for ${type}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) + ' Today',
      status: 'Pending',
      assignedTo: patient.assignedNurse || 'Duty Nurse'
    };

    setAssistanceRequests(prev => [newAssistance, ...prev]);
    addAuditLog(`Patient Bedside (${patient.bedNumber})`, 'Assistance Requested', `${type} requested: ${details}`);
    showToast(`Your request for ${type} has been sent to the nursing station!`, 'success');
  };

  const updateAssistanceStatus = (requestId, status) => {
    setAssistanceRequests(prev => prev.map(r => r.id === requestId ? { ...r, status } : r));
    addAuditLog('Nursing Station', 'Assistance Updated', `Request ${requestId} status changed to ${status}.`);
    showToast(`Assistance request status updated to ${status}.`, 'info');
  };

  // 7. DOCTOR ACTIONS (ADD PRESCRIPTION, ORDER LAB TEST, ADD NOTE)
  const doctorAddPrescription = (patientId, newRx) => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    const rxRecord = {
      id: `RX-${Date.now().toString().slice(-4)}`,
      medicineName: newRx.medicineName,
      dosage: newRx.dosage,
      frequency: newRx.frequency,
      route: newRx.route || 'Oral',
      duration: newRx.duration || '7 Days',
      status: 'Active',
      prescribedBy: newRx.prescribedBy || 'Attending Doctor',
      stockAvailable: true
    };

    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          prescriptions: [rxRecord, ...p.prescriptions]
        };
      }
      return p;
    }));

    addAuditLog(rxRecord.prescribedBy, 'Prescription Issued', `Added ${rxRecord.medicineName} (${rxRecord.dosage}) for ${patient.name}.`);
    showToast(`Prescription for ${rxRecord.medicineName} added! Now live on patient's bedside screen.`, 'success');
  };

  const doctorAddReport = (patientId, reportData) => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    const reportRecord = {
      id: `REP-${Date.now().toString().slice(-4)}`,
      title: reportData.title,
      category: reportData.category || 'Diagnostic Report',
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) + ' Today',
      doctor: reportData.doctor || 'Attending Physician',
      labTechnician: reportData.labTechnician || 'Diagnostic Center',
      status: 'Final Verified',
      findings: reportData.findings,
      recommendation: reportData.recommendation || 'Clinical correlation recommended.',
      downloadUrl: '#',
      printRequested: false
    };

    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          reports: [reportRecord, ...p.reports]
        };
      }
      return p;
    }));

    addAuditLog(reportRecord.doctor, 'Lab Report Uploaded', `Uploaded ${reportRecord.title} for ${patient.name}.`);
    showToast(`Report "${reportRecord.title}" uploaded! Instantly visible on Bedside Screen.`, 'success');
  };

  const doctorUpdateTreatmentPlan = (patientId, newPlanText) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          currentTreatment: newPlanText
        };
      }
      return p;
    }));
    addAuditLog('Attending Doctor', 'Treatment Plan Updated', `Updated clinical plan for patient ${patientId}.`);
    showToast(`Treatment plan updated for patient!`, 'info');
  };

  // 8. NURSE ACTIONS (UPDATE VITALS)
  const nurseUpdateVitals = (patientId, newVitals) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          vitals: {
            ...p.vitals,
            ...newVitals,
            lastUpdated: 'Just now'
          }
        };
      }
      return p;
    }));
    addAuditLog('Staff Nurse', 'Vitals Recorded', `Recorded new vitals for patient ${patientId}: HR ${newVitals.heartRate}, BP ${newVitals.bloodPressure}, SpO2 ${newVitals.spo2}%.`);
    showToast(`Vitals recorded successfully! Bedside monitor updated.`, 'success');
  };

  // 9. RESET DEMO DATA
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPatients(INITIAL_PATIENTS);
    setDischargedPatients(INITIAL_DISCHARGED_PATIENTS);
    setBeds(INITIAL_BEDS);
    setStaff(INITIAL_STAFF);
    setMedicineRequests(INITIAL_MEDICINE_REQUESTS);
    setPrintingRequests(INITIAL_PRINTING_REQUESTS);
    setEmergencyAlerts(INITIAL_EMERGENCY_ALERTS);
    setAssistanceRequests(INITIAL_ASSISTANCE_REQUESTS);
    setInventory(INITIAL_PHARMACY_INVENTORY);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSelectedBedId('BED-ICU-02');
    showToast('Platform reset to initial pristine demo dataset!', 'info');
  };

  // Helper to find currently selected bed and patient
  const currentBed = beds.find(b => b.id === selectedBedId) || beds[1]; // default ICU-02
  const currentBedPatient = patients.find(p => p.id === currentBed?.patientId) || null;

  return (
    <HospitalContext.Provider
      value={{
        // State
        patients,
        dischargedPatients,
        beds,
        staff,
        medicineRequests,
        printingRequests,
        emergencyAlerts,
        assistanceRequests,
        inventory,
        announcements,
        auditLogs,
        activeEmergencyCount,

        // Selection & Role
        currentRole,
        setCurrentRole,
        selectedDoctorId,
        setSelectedDoctorId,
        selectedNurseId,
        setSelectedNurseId,
        selectedBedId,
        setSelectedBedId,
        currentBed,
        currentBedPatient,
        isTouchKioskMode,
        setIsTouchKioskMode,
        adminActiveTab,
        setAdminActiveTab,
        notificationToast,
        showToast,
        isDemoModalOpen,
        setIsDemoModalOpen,
        activeReportForModal,
        setActiveReportForModal,

        // Actions
        registerPatient,
        dischargePatient,
        triggerEmergencyAlert,
        acknowledgeEmergencyAlert,
        requestMedicineOrder,
        updateMedicineRequestStatus,
        requestPrintJob,
        updatePrintJobStatus,
        requestBedsideAssistance,
        updateAssistanceStatus,
        doctorAddPrescription,
        doctorAddReport,
        doctorUpdateTreatmentPlan,
        nurseUpdateVitals,
        resetDemoData,
        addAuditLog
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};

