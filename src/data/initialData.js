// Initial sample data for CARECONNECT - Smart Hospital Management Ecosystem
// Realistic clinical data for demo and operational testing

export const INITIAL_BEDS = [
  // ICU Ward
  { id: 'BED-ICU-01', bedNumber: 'ICU-01', ward: 'ICU Ward', department: 'Critical Care', status: 'available', type: 'ICU Ventilator Bed', patientId: null },
  { id: 'BED-ICU-02', bedNumber: 'ICU-02', ward: 'ICU Ward', department: 'Critical Care', status: 'occupied', type: 'ICU Ventilator Bed', patientId: 'PAT-2026-0891' },
  { id: 'BED-ICU-03', bedNumber: 'ICU-03', ward: 'ICU Ward', department: 'Critical Care', status: 'occupied', type: 'ICU Ventilator Bed', patientId: 'PAT-2026-0897' },
  { id: 'BED-ICU-04', bedNumber: 'ICU-04', ward: 'ICU Ward', department: 'Critical Care', status: 'cleaning', type: 'ICU Ventilator Bed', patientId: null },

  // General Ward A
  { id: 'BED-A-101', bedNumber: 'A-101', ward: 'General Ward A', department: 'General Medicine', status: 'available', type: 'Electric Adjustable Bed', patientId: null },
  { id: 'BED-A-102', bedNumber: 'A-102', ward: 'General Ward A', department: 'General Surgery', status: 'occupied', type: 'Electric Adjustable Bed', patientId: 'PAT-2026-0892' },
  { id: 'BED-A-103', bedNumber: 'A-103', ward: 'General Ward A', department: 'General Medicine', status: 'available', type: 'Electric Adjustable Bed', patientId: null },
  { id: 'BED-A-104', bedNumber: 'A-104', ward: 'General Ward A', department: 'Orthopedics', status: 'occupied', type: 'Orthopedic Traction Bed', patientId: 'PAT-2026-0895' },
  { id: 'BED-A-105', bedNumber: 'A-105', ward: 'General Ward A', department: 'General Medicine', status: 'maintenance', type: 'Electric Adjustable Bed', patientId: null },
  { id: 'BED-A-106', bedNumber: 'A-106', ward: 'General Ward A', department: 'General Medicine', status: 'available', type: 'Electric Adjustable Bed', patientId: null },

  // Ward B (Specialty Care)
  { id: 'BED-B-201', bedNumber: 'B-201', ward: 'Ward B', department: 'Neurology', status: 'occupied', type: 'Stroke Rehabilitation Bed', patientId: 'PAT-2026-0893' },
  { id: 'BED-B-202', bedNumber: 'B-202', ward: 'Ward B', department: 'Neurology', status: 'available', type: 'Semi-Fowler Bed', patientId: null },
  { id: 'BED-B-203', bedNumber: 'B-203', ward: 'Ward B', department: 'Cardiology', status: 'available', type: 'Cardiac Monitor Bed', patientId: null },
  { id: 'BED-B-204', bedNumber: 'B-204', ward: 'Ward B', department: 'Cardiology', status: 'available', type: 'Cardiac Monitor Bed', patientId: null },
  { id: 'BED-B-205', bedNumber: 'B-205', ward: 'Ward B', department: 'Oncology', status: 'occupied', type: 'Low Profile Chemo Bed', patientId: 'PAT-2026-0898' },
  { id: 'BED-B-206', bedNumber: 'B-206', ward: 'Ward B', department: 'Oncology', status: 'available', type: 'Low Profile Chemo Bed', patientId: null },

  // Maternity Ward
  { id: 'BED-M-301', bedNumber: 'M-301', ward: 'Maternity Ward', department: 'Obstetrics & Gynecology', status: 'occupied', type: 'Birthing & Recovery Bed', patientId: 'PAT-2026-0896' },
  { id: 'BED-M-302', bedNumber: 'M-302', ward: 'Maternity Ward', department: 'Obstetrics & Gynecology', status: 'available', type: 'Birthing & Recovery Bed', patientId: null },
  { id: 'BED-M-303', bedNumber: 'M-303', ward: 'Maternity Ward', department: 'Obstetrics & Gynecology', status: 'available', type: 'Birthing & Recovery Bed', patientId: null },
  { id: 'BED-M-304', bedNumber: 'M-304', ward: 'Maternity Ward', department: 'Obstetrics & Gynecology', status: 'cleaning', type: 'Birthing & Recovery Bed', patientId: null },

  // Pediatric Ward
  { id: 'BED-P-401', bedNumber: 'P-401', ward: 'Pediatric Ward', department: 'Pediatrics', status: 'available', type: 'Pediatric Safety Bed', patientId: null },
  { id: 'BED-P-402', bedNumber: 'P-402', ward: 'Pediatric Ward', department: 'Pediatrics', status: 'occupied', type: 'Pediatric Safety Bed', patientId: 'PAT-2026-0894' },
  { id: 'BED-P-403', bedNumber: 'P-403', ward: 'Pediatric Ward', department: 'Pediatrics', status: 'available', type: 'Pediatric Safety Bed', patientId: null },
  { id: 'BED-P-404', bedNumber: 'P-404', ward: 'Pediatric Ward', department: 'Pediatrics', status: 'available', type: 'Pediatric Safety Bed', patientId: null }
];

export const INITIAL_STAFF = {
  doctors: [
    { id: 'DOC-01', name: 'Dr. Sarah Jenkins', specialty: 'Cardiology', department: 'Cardiology', phone: '+1 (555) 234-5678', email: 's.jenkins@careconnect.health', status: 'On Duty', room: 'Suite 401', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80' },
    { id: 'DOC-02', name: 'Dr. Robert Chen', specialty: 'Neurology', department: 'Neurology', phone: '+1 (555) 345-6789', email: 'r.chen@careconnect.health', status: 'On Duty', room: 'Suite 405', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80' },
    { id: 'DOC-03', name: 'Dr. Aisha Patel', specialty: 'Internal Medicine & ICU', department: 'Critical Care', phone: '+1 (555) 456-7890', email: 'a.patel@careconnect.health', status: 'On Duty', room: 'ICU Unit B', avatar: 'https://images.unsplash.com/photo-1594824813870-188b9075e7a9?w=150&auto=format&fit=crop&q=80' },
    { id: 'DOC-04', name: 'Dr. Michael Ross', specialty: 'Orthopedic Surgery', department: 'Orthopedics', phone: '+1 (555) 567-8901', email: 'm.ross@careconnect.health', status: 'On Call', room: 'OR Block 2', avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80' },
    { id: 'DOC-05', name: 'Dr. Emily Watson', specialty: 'Pediatrics', department: 'Pediatrics', phone: '+1 (555) 678-9012', email: 'e.watson@careconnect.health', status: 'On Duty', room: 'Peds Clinic 3', avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=150&auto=format&fit=crop&q=80' },
    { id: 'DOC-06', name: 'Dr. David Kim', specialty: 'General Surgery', department: 'General Surgery', phone: '+1 (555) 789-0123', email: 'd.kim@careconnect.health', status: 'On Duty', room: 'Surgical Wing', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80' }
  ],
  nurses: [
    { id: 'NUR-01', name: 'Nurse Elena Ramos', ward: 'ICU Ward & General A', shift: 'Day Shift (07:00 - 19:00)', phone: '+1 (555) 890-1234', status: 'Active Station', badge: 'RN-CC-4091' },
    { id: 'NUR-02', name: 'Nurse Michael Chang', ward: 'Ward B (Neurology)', shift: 'Day Shift (07:00 - 19:00)', phone: '+1 (555) 901-2345', status: 'Active Station', badge: 'RN-CC-5102' },
    { id: 'NUR-03', name: 'Nurse Jessica Taylor', ward: 'General Ward A', shift: 'Day Shift (07:00 - 19:00)', phone: '+1 (555) 012-3456', status: 'Active Station', badge: 'RN-CC-3904' },
    { id: 'NUR-04', name: 'Nurse Priya Sharma', ward: 'Pediatric Ward', shift: 'Day Shift (07:00 - 19:00)', phone: '+1 (555) 123-4567', status: 'Active Station', badge: 'RN-CC-6211' },
    { id: 'NUR-05', name: 'Nurse Carlos Mendez', ward: 'Maternity Ward', shift: 'Day Shift (07:00 - 19:00)', phone: '+1 (555) 234-5670', status: 'Active Station', badge: 'RN-CC-1890' }
  ],
  pharmacists: [
    { id: 'PHARM-01', name: 'Alex Rivera, PharmD', license: 'PH-NY-88912', phone: '+1 (555) 345-6780', status: 'Dispensing On-Duty' },
    { id: 'PHARM-02', name: 'Samantha Reed, RPh', license: 'PH-NY-90214', phone: '+1 (555) 456-7891', status: 'Verification Desk' }
  ],
  printers: [
    { id: 'PRT-01', name: 'Marcus Vance', role: 'Printing & Records Officer', station: 'Central Printing Hub Level 2', phone: 'Ext. 410' },
    { id: 'PRT-02', name: 'Chloe Bennett', role: 'Digital Imaging Courier', station: 'Central Printing Hub Level 2', phone: 'Ext. 411' }
  ]
};

export const INITIAL_PATIENTS = [
  {
    id: 'PAT-2026-0891',
    name: 'Marcus Sterling',
    age: 58,
    dob: '1968-04-12',
    gender: 'Male',
    phone: '+1 (555) 321-9988',
    emergencyContact: 'Eleanor Sterling',
    emergencyPhone: '+1 (555) 321-9989',
    relationship: 'Wife',
    address: '742 Evergreen Terrace, Springfield, IL',
    medicalHistory: 'Hypertension (10 yrs), Hyperlipidemia, Ex-smoker',
    allergies: 'Penicillin, Sulfa drugs',
    diagnosis: 'Acute ST-Elevation Myocardial Infarction (STEMI), Status Post Percutaneous Coronary Intervention',
    assignedDoctor: 'Dr. Sarah Jenkins',
    assignedNurse: 'Nurse Elena Ramos',
    department: 'Cardiology',
    ward: 'ICU Ward',
    bedNumber: 'ICU-02',
    admissionDate: '2026-11-11 08:30 AM',
    status: 'Admitted',
    currentTreatment: 'Dual antiplatelet therapy, continuous cardiac telemetry monitoring, titrating beta-blocker, cardiac rehabilitation consultation scheduled.',
    attendantDetails: {
      name: 'Eleanor Sterling',
      relationship: 'Wife',
      phone: '+1 (555) 321-9989',
      passNumber: 'ATT-ICU-891'
    },
    vitals: {
      heartRate: 74,
      bloodPressure: '128/82',
      spo2: 98,
      temperature: 98.4,
      respiratoryRate: 16,
      bloodSugar: 118,
      lastUpdated: '10 mins ago'
    },
    mealPlan: {
      dietType: 'Cardiac Low-Sodium & Low-Fat Diet',
      breakfast: 'Steel-cut oats with fresh blueberries, scrambled egg whites, decaf green tea',
      lunch: 'Grilled salmon fillet with steamed asparagus, quinoa, mixed greens with olive oil',
      dinner: 'Herb-roasted chicken breast, sautéed zucchini, baked sweet potato mash',
      restrictions: 'Strictly < 1,500mg Sodium/day, No caffeine, Fluid intake target 2.0L'
    },
    reports: [
      {
        id: 'REP-0891-01',
        title: 'Cardiac Biomarkers & Troponin-I Panel',
        category: 'Blood Test',
        date: '2026-11-13 06:45 AM',
        doctor: 'Dr. Sarah Jenkins',
        labTechnician: 'Central Pathology Lab',
        status: 'Final Verified',
        findings: 'High Sensitivity Troponin-I has decreased from 14.2 ng/mL to 0.42 ng/mL indicating cardiac stabilization. CK-MB at normal baseline (3.1 ng/mL). Serum potassium 4.2 mEq/L (Normal).',
        recommendation: 'Continue oral dual antiplatelet regimen. Schedule echocardiography pre-discharge.',
        downloadUrl: '#',
        printRequested: false
      },
      {
        id: 'REP-0891-02',
        title: '12-Lead Electrocardiogram (ECG / EKG)',
        category: 'Cardiology Report',
        date: '2026-11-12 04:15 PM',
        doctor: 'Dr. Sarah Jenkins',
        labTechnician: 'Cardio Telemetry Unit',
        status: 'Final Verified',
        findings: 'Sinus rhythm at 72 bpm. Resolving ST-elevation in leads II, III, and aVF with evolving T-wave inversions. No ventricular ectopy or conduction block.',
        recommendation: 'Telemetry monitoring to continue for another 24 hours.',
        downloadUrl: '#',
        printRequested: false
      },
      {
        id: 'REP-0891-03',
        title: 'Coronary CT Angiography & Stent Patency Scan',
        category: 'CT Scan',
        date: '2026-11-11 02:00 PM',
        doctor: 'Dr. Sarah Jenkins',
        labTechnician: 'Radiology Imaging Dept',
        status: 'Final Verified',
        findings: 'Drug-eluting stent deployed in proximal LAD demonstrates 100% lumen patency with TIMI 3 distal flow. No dissection or stent thrombosis noted.',
        recommendation: 'Maintain strict compliance with Clopidogrel and Aspirin.',
        downloadUrl: '#',
        printRequested: false
      }
    ],
    prescriptions: [
      { id: 'RX-891-01', medicineName: 'Atorvastatin', dosage: '40 mg', frequency: 'Once daily at bedtime', route: 'Oral', duration: '30 Days', status: 'Active', prescribedBy: 'Dr. Sarah Jenkins', stockAvailable: true },
      { id: 'RX-891-02', medicineName: 'Clopidogrel (Plavix)', dosage: '75 mg', frequency: 'Once daily with breakfast', route: 'Oral', duration: '90 Days', status: 'Active', prescribedBy: 'Dr. Sarah Jenkins', stockAvailable: true },
      { id: 'RX-891-03', medicineName: 'Metoprolol Tartrate', dosage: '25 mg', frequency: 'Twice daily', route: 'Oral', duration: '30 Days', status: 'Active', prescribedBy: 'Dr. Sarah Jenkins', stockAvailable: true },
      { id: 'RX-891-04', medicineName: 'Aspirin (Enteric Coated)', dosage: '81 mg', frequency: 'Once daily with meal', route: 'Oral', duration: 'Ongoing', status: 'Active', prescribedBy: 'Dr. Sarah Jenkins', stockAvailable: true }
    ],
    billing: {
      roomCharges: 3200,
      doctorConsultation: 1200,
      pharmacyCharges: 680,
      laboratoryCharges: 1450,
      nursingCare: 900,
      totalAmount: 7430,
      insuranceCovered: 6000,
      patientPayable: 1430,
      status: 'Pending Insurance Clearance'
    }
  },
  {
    id: 'PAT-2026-0892',
    name: 'Sophia Martinez',
    age: 34,
    dob: '1992-08-23',
    gender: 'Female',
    phone: '+1 (555) 432-8877',
    emergencyContact: 'Carlos Martinez',
    emergencyPhone: '+1 (555) 432-8878',
    relationship: 'Brother',
    address: '1204 Pine Crest Ave, Seattle, WA',
    medicalHistory: 'Mild Asthmatic episodes in childhood, No prior surgeries',
    allergies: 'None reported (NKA)',
    diagnosis: 'Acute Suppurative Appendicitis - Laparoscopic Appendectomy (Post-Op Day 2)',
    assignedDoctor: 'Dr. David Kim',
    assignedNurse: 'Nurse Jessica Taylor',
    department: 'General Surgery',
    ward: 'General Ward A',
    bedNumber: 'A-102',
    admissionDate: '2026-11-12 01:15 AM',
    status: 'Admitted',
    currentTreatment: 'Surgical wound inspection clear, early ambulation encouraged, IV antibiotics transitioned to oral, soft diet initiated.',
    attendantDetails: {
      name: 'Carlos Martinez',
      relationship: 'Brother',
      phone: '+1 (555) 432-8878',
      passNumber: 'ATT-GW-892'
    },
    vitals: {
      heartRate: 72,
      bloodPressure: '118/76',
      spo2: 99,
      temperature: 99.1,
      respiratoryRate: 15,
      bloodSugar: 94,
      lastUpdated: '25 mins ago'
    },
    mealPlan: {
      dietType: 'Post-Surgical Soft Digestive Diet',
      breakfast: 'Warm oatmeal with almond milk, peeled stewed apple, herbal chamomile tea',
      lunch: 'Clear vegetable broth, soft steamed carrots, mashed potatoes with light gravy',
      dinner: 'Steamed white fish or silken tofu, vegetable puree, ginger-infused warm water',
      restrictions: 'Avoid carbonated beverages, cruciferous vegetables, and high spices.'
    },
    reports: [
      {
        id: 'REP-0892-01',
        title: 'Complete Blood Count (CBC) with Differential',
        category: 'Blood Test',
        date: '2026-11-13 07:10 AM',
        doctor: 'Dr. David Kim',
        labTechnician: 'Pathology Diagnostics',
        status: 'Final Verified',
        findings: 'WBC count reduced from 16,800/mcL to 9,400/mcL (normalizing post-surgery). Hemoglobin 12.8 g/dL, Platelets 260,000/mcL.',
        recommendation: 'Infection successfully controlled. Continue oral antibiotics for 5 days.',
        downloadUrl: '#',
        printRequested: false
      },
      {
        id: 'REP-0892-02',
        title: 'Histopathology Biopsy Report - Vermiform Appendix',
        category: 'Laboratory Report',
        date: '2026-11-12 05:30 PM',
        doctor: 'Dr. David Kim',
        labTechnician: 'Surgical Pathology Dept',
        status: 'Final Verified',
        findings: 'Gross examination reveals 7.5cm appendix with transmural acute suppurative inflammation. No mucosal dysplasia, granulomas, or malignancy identified.',
        recommendation: 'Benign acute appendicitis confirmed.',
        downloadUrl: '#',
        printRequested: false
      }
    ],
    prescriptions: [
      { id: 'RX-892-01', medicineName: 'Amoxicillin-Clavulanate (Augmentin)', dosage: '625 mg', frequency: 'Twice daily after meals', route: 'Oral', duration: '5 Days', status: 'Active', prescribedBy: 'Dr. David Kim', stockAvailable: true },
      { id: 'RX-892-02', medicineName: 'Paracetamol (Acetaminophen)', dosage: '650 mg', frequency: 'Every 8 hours as needed for pain', route: 'Oral', duration: '4 Days', status: 'Active', prescribedBy: 'Dr. David Kim', stockAvailable: true },
      { id: 'RX-892-03', medicineName: 'Pantoprazole', dosage: '40 mg', frequency: 'Once daily before breakfast', route: 'Oral', duration: '7 Days', status: 'Active', prescribedBy: 'Dr. David Kim', stockAvailable: true }
    ],
    billing: {
      roomCharges: 1400,
      doctorConsultation: 950,
      pharmacyCharges: 320,
      laboratoryCharges: 580,
      nursingCare: 450,
      totalAmount: 3700,
      insuranceCovered: 3200,
      patientPayable: 500,
      status: 'Pre-Authorized'
    }
  },
  {
    id: 'PAT-2026-0893',
    name: 'James Arthur Wilson',
    age: 67,
    dob: '1959-01-14',
    gender: 'Male',
    phone: '+1 (555) 543-7766',
    emergencyContact: 'Linda Wilson',
    emergencyPhone: '+1 (555) 543-7767',
    relationship: 'Daughter',
    address: '89 Willow Creek Way, Boston, MA',
    medicalHistory: 'Type 2 Diabetes Mellitus, Atrial Fibrillation, Chronic Kidney Disease Stage 2',
    allergies: 'Codeine, Iodine contrast sensitivity',
    diagnosis: 'Acute Ischemic Cerebrovascular Accident (MCA Territory), Subacute Stabilization',
    assignedDoctor: 'Dr. Robert Chen',
    assignedNurse: 'Nurse Michael Chang',
    department: 'Neurology',
    ward: 'Ward B',
    bedNumber: 'B-201',
    admissionDate: '2026-11-10 11:20 AM',
    status: 'Admitted',
    currentTreatment: 'Neuro-vitals q4h, physical and occupational therapy sessions twice daily, speech therapy evaluation, secondary stroke prevention.',
    attendantDetails: {
      name: 'Linda Wilson',
      relationship: 'Daughter',
      phone: '+1 (555) 543-7767',
      passNumber: 'ATT-WB-893'
    },
    vitals: {
      heartRate: 82,
      bloodPressure: '138/86',
      spo2: 97,
      temperature: 98.4,
      respiratoryRate: 17,
      bloodSugar: 142,
      lastUpdated: '40 mins ago'
    },
    mealPlan: {
      dietType: 'Diabetic & Dysphagia Level 2 Mechanical Soft Diet',
      breakfast: 'Pureed oatmeal with cinnamon, soft poached egg, lukewarm unsweetened almond beverage',
      lunch: 'Minced chicken with mild vegetable puree, mashed sweet pumpkin, thick nectar fruit juice',
      dinner: 'Soft lentils soup, pureed zucchini and rice congee, chamomile tea',
      restrictions: 'Aspiration precautions, upright 90-degree seating for 45 mins post meals.'
    },
    reports: [
      {
        id: 'REP-0893-01',
        title: 'Brain Magnetic Resonance Imaging (MRI) with DWI',
        category: 'MRI Scan',
        date: '2026-11-12 11:00 AM',
        doctor: 'Dr. Robert Chen',
        labTechnician: 'Neuro-Radiology Suite',
        status: 'Final Verified',
        findings: 'Subacute infarction in the left middle cerebral artery (MCA) territory. DWI shows restricted diffusion resolving. No hemorrhagic transformation detected.',
        recommendation: 'Continue neuro-rehabilitation and secondary prevention regimen.',
        downloadUrl: '#',
        printRequested: false
      },
      {
        id: 'REP-0893-02',
        title: 'Carotid & Vertebral Doppler Ultrasound',
        category: 'Laboratory Report',
        date: '2026-11-11 03:40 PM',
        doctor: 'Dr. Robert Chen',
        labTechnician: 'Vascular Diagnostic Lab',
        status: 'Final Verified',
        findings: 'Left internal carotid artery demonstrates 45% non-occlusive calcified atheroma. Right carotid artery patent without significant stenosis.',
        recommendation: 'High-intensity statin therapy recommended. Surgical endarterectomy not indicated.',
        downloadUrl: '#',
        printRequested: false
      }
    ],
    prescriptions: [
      { id: 'RX-893-01', medicineName: 'Rosuvastatin', dosage: '20 mg', frequency: 'Once daily at bedtime', route: 'Oral', duration: '60 Days', status: 'Active', prescribedBy: 'Dr. Robert Chen', stockAvailable: true },
      { id: 'RX-893-02', medicineName: 'Aspirin', dosage: '100 mg', frequency: 'Once daily after breakfast', route: 'Oral', duration: '90 Days', status: 'Active', prescribedBy: 'Dr. Robert Chen', stockAvailable: true },
      { id: 'RX-893-03', medicineName: 'Lisinopril', dosage: '10 mg', frequency: 'Once daily in morning', route: 'Oral', duration: '30 Days', status: 'Active', prescribedBy: 'Dr. Robert Chen', stockAvailable: true },
      { id: 'RX-893-04', medicineName: 'Metformin HCl', dosage: '500 mg', frequency: 'Twice daily with meals', route: 'Oral', duration: '30 Days', status: 'Active', prescribedBy: 'Dr. Robert Chen', stockAvailable: true }
    ],
    billing: {
      roomCharges: 3600,
      doctorConsultation: 1500,
      pharmacyCharges: 790,
      laboratoryCharges: 2100,
      nursingCare: 1100,
      totalAmount: 9090,
      insuranceCovered: 7800,
      patientPayable: 1290,
      status: 'Approved by Medicare'
    }
  },
  {
    id: 'PAT-2026-0894',
    name: 'Emma Grace Davies',
    age: 8,
    dob: '2018-05-19',
    gender: 'Female',
    phone: '+1 (555) 654-6655',
    emergencyContact: 'Laura Davies',
    emergencyPhone: '+1 (555) 654-6656',
    relationship: 'Mother',
    address: '450 Sunnyvale Dr, Austin, TX',
    medicalHistory: 'Extrinsic Allergic Asthma, Atopic Dermatitis',
    allergies: 'Peanuts, Tree nuts, Amoxicillin (Hives)',
    diagnosis: 'Moderate-to-Severe Acute Asthma Exacerbation Triggered by Viral URI',
    assignedDoctor: 'Dr. Emily Watson',
    assignedNurse: 'Nurse Priya Sharma',
    department: 'Pediatrics',
    ward: 'Pediatric Ward',
    bedNumber: 'P-402',
    admissionDate: '2026-11-13 04:20 AM',
    status: 'Admitted',
    currentTreatment: 'Continuous pulse oximetry, humidified oxygen via nasal cannula 1.5 L/min, nebulized bronchodilator q4h, systemic oral corticosteroids.',
    attendantDetails: {
      name: 'Laura Davies',
      relationship: 'Mother',
      phone: '+1 (555) 654-6656',
      passNumber: 'ATT-PED-894'
    },
    vitals: {
      heartRate: 98,
      bloodPressure: '102/65',
      spo2: 96,
      temperature: 99.0,
      respiratoryRate: 22,
      bloodSugar: 98,
      lastUpdated: '15 mins ago'
    },
    mealPlan: {
      dietType: 'Pediatric Allergen-Free Wholesome Diet',
      breakfast: 'Banana pancakes made with oat flour, fresh sliced strawberries, warm organic cow milk',
      lunch: 'Alphabet pasta with mild tomato-basil sauce, tender steamed chicken bites, apple slices',
      dinner: 'Vegetable risotto with roasted butternut squash, warm honey-ginger water',
      restrictions: 'Strict 100% Nut-Free Kitchen Protocol. No Amoxicillin related compounds.'
    },
    reports: [
      {
        id: 'REP-0894-01',
        title: 'Pediatric Chest Radiograph (X-Ray AP/Lateral)',
        category: 'X-Ray Report',
        date: '2026-11-13 05:00 AM',
        doctor: 'Dr. Emily Watson',
        labTechnician: 'Pediatric Imaging Wing',
        status: 'Final Verified',
        findings: 'Hyperinflation of lung fields consistent with acute asthma. No focal consolidation, pneumothorax, or pleural effusion.',
        recommendation: 'Continue bronchodilator nebulization and monitor wheezing.',
        downloadUrl: '#',
        printRequested: false
      }
    ],
    prescriptions: [
      { id: 'RX-894-01', medicineName: 'Salbutamol Nebulizer Solution', dosage: '2.5 mg', frequency: 'Every 4 hours via nebulizer', route: 'Inhalation', duration: '3 Days', status: 'Active', prescribedBy: 'Dr. Emily Watson', stockAvailable: true },
      { id: 'RX-894-02', medicineName: 'Budesonide Respules', dosage: '0.5 mg', frequency: 'Twice daily via nebulizer', route: 'Inhalation', duration: '5 Days', status: 'Active', prescribedBy: 'Dr. Emily Watson', stockAvailable: true },
      { id: 'RX-894-03', medicineName: 'Prednisolone Oral Solution', dosage: '15 mg', frequency: 'Once daily after breakfast', route: 'Oral', duration: '4 Days', status: 'Active', prescribedBy: 'Dr. Emily Watson', stockAvailable: true }
    ],
    billing: {
      roomCharges: 950,
      doctorConsultation: 600,
      pharmacyCharges: 210,
      laboratoryCharges: 420,
      nursingCare: 380,
      totalAmount: 2560,
      insuranceCovered: 2300,
      patientPayable: 260,
      status: 'Active Coverage'
    }
  },
  {
    id: 'PAT-2026-0895',
    name: 'Vikram Malhotra',
    age: 45,
    dob: '1981-03-30',
    gender: 'Male',
    phone: '+1 (555) 765-5544',
    emergencyContact: 'Sunita Malhotra',
    emergencyPhone: '+1 (555) 765-5545',
    relationship: 'Wife',
    address: '310 Oak Ridge Parkway, San Jose, CA',
    medicalHistory: 'Former marathon runner, Mild gastroesophageal reflux',
    allergies: 'Sulfa antibiotics',
    diagnosis: 'Closed Bimalleolar Right Ankle & Tibia-Fibula Fracture - Post Open Reduction Internal Fixation (ORIF)',
    assignedDoctor: 'Dr. Michael Ross',
    assignedNurse: 'Nurse Elena Ramos',
    department: 'Orthopedics',
    ward: 'General Ward A',
    bedNumber: 'A-104',
    admissionDate: '2026-11-12 09:40 AM',
    status: 'Admitted',
    currentTreatment: 'Right lower extremity elevated on Braun frame, distal neurovascular checks intact, cryotherapy q3h, post-op DVT prophylaxis.',
    attendantDetails: {
      name: 'Sunita Malhotra',
      relationship: 'Wife',
      phone: '+1 (555) 765-5545',
      passNumber: 'ATT-GW-895'
    },
    vitals: {
      heartRate: 78,
      bloodPressure: '124/80',
      spo2: 98,
      temperature: 98.8,
      respiratoryRate: 16,
      bloodSugar: 104,
      lastUpdated: '50 mins ago'
    },
    mealPlan: {
      dietType: 'High-Protein Bone Healing Diet',
      breakfast: 'Three-egg vegetable omelet, whole-wheat sourdough toast, fresh orange juice, Greek yogurt',
      lunch: 'Charbroiled chicken breast, steamed broccoli florets, brown rice with chia seeds',
      dinner: 'Grass-fed beef medallion or lentil stew, roasted root vegetables, calcium-fortified almond milk',
      restrictions: 'Encourage high calcium and vitamin C intake for osteogenesis.'
    },
    reports: [
      {
        id: 'REP-0895-01',
        title: 'Right Lower Extremity Post-ORIF Radiograph',
        category: 'X-Ray Report',
        date: '2026-11-12 04:30 PM',
        doctor: 'Dr. Michael Ross',
        labTechnician: 'Surgical Imaging Unit',
        status: 'Final Verified',
        findings: 'Anatomic alignment of right distal fibula achieved with 6-hole titanium plate and cortical screws. Medial malleolus secured with two 4.0mm cancellous screws. Joint mortise preserved.',
        recommendation: 'Non-weight bearing in posterior splint for 4 weeks.',
        downloadUrl: '#',
        printRequested: false
      }
    ],
    prescriptions: [
      { id: 'RX-895-01', medicineName: 'Enoxaparin Sodium (Lovenox)', dosage: '40 mg / 0.4 mL', frequency: 'Once daily subcutaneous', route: 'Subcutaneous', duration: '14 Days', status: 'Active', prescribedBy: 'Dr. Michael Ross', stockAvailable: true },
      { id: 'RX-895-02', medicineName: 'Tramadol HCl', dosage: '50 mg', frequency: 'Every 8 hours as needed for severe pain', route: 'Oral', duration: '5 Days', status: 'Active', prescribedBy: 'Dr. Michael Ross', stockAvailable: true },
      { id: 'RX-895-03', medicineName: 'Cefuroxime Axetil', dosage: '500 mg', frequency: 'Twice daily after meals', route: 'Oral', duration: '7 Days', status: 'Active', prescribedBy: 'Dr. Michael Ross', stockAvailable: true }
    ],
    billing: {
      roomCharges: 1800,
      doctorConsultation: 2200,
      pharmacyCharges: 540,
      laboratoryCharges: 890,
      nursingCare: 600,
      totalAmount: 6030,
      insuranceCovered: 5200,
      patientPayable: 830,
      status: 'Pending Claim Settlement'
    }
  },
  {
    id: 'PAT-2026-0896',
    name: 'Olivia Catherine Vance',
    age: 29,
    dob: '1997-09-15',
    gender: 'Female',
    phone: '+1 (555) 876-4433',
    emergencyContact: 'Thomas Vance',
    emergencyPhone: '+1 (555) 876-4434',
    relationship: 'Husband',
    address: '614 Harbor Bay Court, San Diego, CA',
    medicalHistory: 'First pregnancy (Gravida 1, Para 0), No history of hypertension pre-pregnancy',
    allergies: 'None (NKDA)',
    diagnosis: 'Primigravida at 36 Weeks Gestation with Gestational Hypertension & Mild Pre-Eclampsia Features',
    assignedDoctor: 'Dr. Aisha Patel',
    assignedNurse: 'Nurse Carlos Mendez',
    department: 'Obstetrics & Gynecology',
    ward: 'Maternity Ward',
    bedNumber: 'M-301',
    admissionDate: '2026-11-13 02:00 AM',
    status: 'Admitted',
    currentTreatment: 'Continuous non-stress test (NST) fetal heart rate monitoring, serial blood pressure checks q2h, 24-hour urine collection for total protein, oral antihypertensive therapy.',
    attendantDetails: {
      name: 'Thomas Vance',
      relationship: 'Husband',
      phone: '+1 (555) 876-4434',
      passNumber: 'ATT-MAT-896'
    },
    vitals: {
      heartRate: 84,
      bloodPressure: '136/88',
      spo2: 98,
      temperature: 98.4,
      respiratoryRate: 18,
      bloodSugar: 92,
      lastUpdated: '12 mins ago'
    },
    mealPlan: {
      dietType: 'Prenatal Low-Sodium Nutrient Dense Diet',
      breakfast: 'Avocado and poached egg on whole grain toast, sliced honeydew melon, pasteurized milk',
      lunch: 'Grilled salmon fillet, wild rice pilaf, steamed spinach with sesame seeds',
      dinner: 'Slow-cooked turkey stew with sweet potatoes and green beans, warm chamomile milk',
      restrictions: 'Sodium strictly controlled. Ample hydration (2.5L filtered water).'
    },
    reports: [
      {
        id: 'REP-0896-01',
        title: 'Obstetric Color Doppler Ultrasound & Biophysical Profile',
        category: 'Ultrasound Report',
        date: '2026-11-13 08:30 AM',
        doctor: 'Dr. Aisha Patel',
        labTechnician: 'Fetal Medicine Center',
        status: 'Final Verified',
        findings: 'Single live intrauterine fetus in cephalic presentation. Estimated fetal weight 2,680g (54th percentile). Amniotic Fluid Index (AFI) 14.2cm (Normal). Umbilical artery Doppler pulsatility index 0.88 (Within normal limits). Biophysical Profile Score 8/8.',
        recommendation: 'Re-evaluate in 48 hours. Fetal well-being currently reassuring.',
        downloadUrl: '#',
        printRequested: false
      }
    ],
    prescriptions: [
      { id: 'RX-896-01', medicineName: 'Labetalol HCl', dosage: '100 mg', frequency: 'Twice daily with meals', route: 'Oral', duration: '14 Days', status: 'Active', prescribedBy: 'Dr. Aisha Patel', stockAvailable: true },
      { id: 'RX-896-02', medicineName: 'Prenatal Multivitamin with DHA', dosage: '1 Tablet', frequency: 'Once daily after lunch', route: 'Oral', duration: '60 Days', status: 'Active', prescribedBy: 'Dr. Aisha Patel', stockAvailable: true },
      { id: 'RX-896-03', medicineName: 'Calcium Carbonate + Vit D3', dosage: '500 mg', frequency: 'Once daily at bedtime', route: 'Oral', duration: '60 Days', status: 'Active', prescribedBy: 'Dr. Aisha Patel', stockAvailable: true }
    ],
    billing: {
      roomCharges: 2100,
      doctorConsultation: 1100,
      pharmacyCharges: 280,
      laboratoryCharges: 750,
      nursingCare: 650,
      totalAmount: 4880,
      insuranceCovered: 4200,
      patientPayable: 680,
      status: 'Active Coverage'
    }
  },
  {
    id: 'PAT-2026-0897',
    name: 'Robert Chen Sr.',
    age: 73,
    dob: '1953-06-08',
    gender: 'Male',
    phone: '+1 (555) 987-3322',
    emergencyContact: 'Grace Chen',
    emergencyPhone: '+1 (555) 987-3323',
    relationship: 'Daughter',
    address: '52 Magnolia Blossom Way, Atlanta, GA',
    medicalHistory: 'COPD (Stage 3), Congestive Heart Failure (NYHA Class II), Benign Prostatic Hyperplasia',
    allergies: 'Aspirin, Ciprofloxacin',
    diagnosis: 'Severe Community-Acquired Right Lower Lobe Pneumonia complicated by Sepsis',
    assignedDoctor: 'Dr. Aisha Patel',
    assignedNurse: 'Nurse Elena Ramos',
    department: 'Critical Care',
    ward: 'ICU Ward',
    bedNumber: 'ICU-03',
    admissionDate: '2026-11-11 10:15 PM',
    status: 'Admitted',
    currentTreatment: 'Broad-spectrum IV antibiotic therapy, high-flow nasal cannula (HFNC) 35 L/min at FiO2 40%, strict fluid balance monitoring, chest physiotherapy.',
    attendantDetails: {
      name: 'Grace Chen',
      relationship: 'Daughter',
      phone: '+1 (555) 987-3323',
      passNumber: 'ATT-ICU-897'
    },
    vitals: {
      heartRate: 92,
      bloodPressure: '108/68',
      spo2: 94,
      temperature: 100.4,
      respiratoryRate: 24,
      bloodSugar: 130,
      lastUpdated: '8 mins ago'
    },
    mealPlan: {
      dietType: 'High-Calorie High-Protein Liquid & Puree Plan',
      breakfast: 'Fortified protein nutritional shake (Ensure Plus), smooth pureed peaches, warm green tea',
      lunch: 'Pureed chicken and sweet vegetable broth, fortified potato cream soup, electrolyte drink',
      dinner: 'High-protein lentil puree, silky pumpkin soup, electrolyte hydration solution',
      restrictions: 'Aspiration risk. Semi-recumbent 45-degree angle required.'
    },
    reports: [
      {
        id: 'REP-0897-01',
        title: 'Arterial Blood Gas (ABG) Analysis with Lactate',
        category: 'Blood Test',
        date: '2026-11-13 06:15 AM',
        doctor: 'Dr. Aisha Patel',
        labTechnician: 'ICU Point-of-Care Lab',
        status: 'Final Verified',
        findings: 'pH 7.37, PaO2 78 mmHg on HFNC FiO2 40%, PaCO2 44 mmHg, HCO3 24.8 mEq/L, Serum Lactate improved to 1.6 mmol/L (down from 3.8 mmol/L on admission).',
        recommendation: 'Sepsis responding well to fluid resuscitation and target antimicrobial therapy.',
        downloadUrl: '#',
        printRequested: false
      },
      {
        id: 'REP-0897-02',
        title: 'High-Resolution Chest CT (HRCT Thorax)',
        category: 'CT Scan',
        date: '2026-11-12 09:10 AM',
        doctor: 'Dr. Aisha Patel',
        labTechnician: 'Pulmonary Radiology Suite',
        status: 'Final Verified',
        findings: 'Dense alveolar consolidation involving right lower lobe with prominent air bronchograms. Minimal reactive right pleural effusion.',
        recommendation: 'Continue Meropenem and respiratory therapy support.',
        downloadUrl: '#',
        printRequested: false
      }
    ],
    prescriptions: [
      { id: 'RX-897-01', medicineName: 'Meropenem Trihydrate IV', dosage: '1 g', frequency: 'Every 8 hours IV infusion', route: 'Intravenous', duration: '7 Days', status: 'Active', prescribedBy: 'Dr. Aisha Patel', stockAvailable: true },
      { id: 'RX-897-02', medicineName: 'Levofloxacin IV', dosage: '750 mg', frequency: 'Once daily IV infusion', route: 'Intravenous', duration: '5 Days', status: 'Active', prescribedBy: 'Dr. Aisha Patel', stockAvailable: true },
      { id: 'RX-897-03', medicineName: 'Ipratropium Bromide + Albuterol', dosage: '3 mL', frequency: 'Every 6 hours via nebulizer', route: 'Inhalation', duration: '7 Days', status: 'Active', prescribedBy: 'Dr. Aisha Patel', stockAvailable: true }
    ],
    billing: {
      roomCharges: 4800,
      doctorConsultation: 1800,
      pharmacyCharges: 1650,
      laboratoryCharges: 1980,
      nursingCare: 1400,
      totalAmount: 11630,
      insuranceCovered: 9500,
      patientPayable: 2130,
      status: 'In Processing'
    }
  },
  {
    id: 'PAT-2026-0898',
    name: 'Ananya Nair',
    age: 42,
    dob: '1984-11-04',
    gender: 'Female',
    phone: '+1 (555) 198-2211',
    emergencyContact: 'Rajiv Nair',
    emergencyPhone: '+1 (555) 198-2212',
    relationship: 'Spouse',
    address: '280 Cambridge Street, Newton, MA',
    medicalHistory: 'Hypothyroidism (Euthyroid on Levothyroxine)',
    allergies: 'Metoclopramide (Extrapyramidal symptoms)',
    diagnosis: 'Invasive Ductal Carcinoma Left Breast (Stage IIA, ER+/PR+, HER2-), Post-Cycle 3 Chemotherapy (AC-T Regimen)',
    assignedDoctor: 'Dr. Sarah Jenkins',
    assignedNurse: 'Nurse Jessica Taylor',
    department: 'Oncology',
    ward: 'Ward B',
    bedNumber: 'B-205',
    admissionDate: '2026-11-12 08:00 AM',
    status: 'Admitted',
    currentTreatment: 'Supportive oncology care, aggressive antiemetic hydration protocol, neutropenic precautions, subcutaneous granulocyte colony-stimulating factor.',
    attendantDetails: {
      name: 'Rajiv Nair',
      relationship: 'Spouse',
      phone: '+1 (555) 198-2212',
      passNumber: 'ATT-WB-898'
    },
    vitals: {
      heartRate: 80,
      bloodPressure: '115/74',
      spo2: 99,
      temperature: 98.2,
      respiratoryRate: 16,
      bloodSugar: 108,
      lastUpdated: '1 hour ago'
    },
    mealPlan: {
      dietType: 'Neutropenic Safe & High-Nutrient Oncology Diet',
      breakfast: 'Fully cooked scrambled eggs, boiled oats with cooked cinnamon apples, pasteurized ginger tea',
      lunch: 'Thoroughly cooked tender chicken casserole, steamed green beans, cooked jasmine rice',
      dinner: 'Vegetable lentil dal (pressure cooked), soft chapati with ghee, cooked pear compote',
      restrictions: 'Strict neutropenic guidelines: Absolutely no raw fruits, raw vegetables, unpasteurized dairy, or deli meats.'
    },
    reports: [
      {
        id: 'REP-0898-01',
        title: 'Contrast-Enhanced Thoraco-Abdominal CT Scan',
        category: 'CT Scan',
        date: '2026-11-12 02:30 PM',
        doctor: 'Dr. Sarah Jenkins',
        labTechnician: 'Comprehensive Cancer Center Imaging',
        status: 'Final Verified',
        findings: 'Primary left breast lesion has regressed from 3.2cm to 1.4cm (partial radiographic response). Left axillary lymph nodes show significant reduction. No distant metastases noted.',
        recommendation: 'Excellent therapeutic response to AC chemotherapy. Plan for surgical resection consultation after cycle 4.',
        downloadUrl: '#',
        printRequested: false
      },
      {
        id: 'REP-0898-02',
        title: 'Comprehensive Hematology & Neutrophil Count',
        category: 'Blood Test',
        date: '2026-11-13 07:00 AM',
        doctor: 'Dr. Sarah Jenkins',
        labTechnician: 'Central Oncology Laboratory',
        status: 'Final Verified',
        findings: 'Absolute Neutrophil Count (ANC) 1,450/mcL (post Filgrastim injection). Hemoglobin 11.2 g/dL. Platelets 185,000/mcL. Renal and hepatic panels intact.',
        recommendation: 'Continue daily Filgrastim until ANC exceeds 2,500/mcL.',
        downloadUrl: '#',
        printRequested: false
      }
    ],
    prescriptions: [
      { id: 'RX-898-01', medicineName: 'Ondansetron (Zofran)', dosage: '8 mg', frequency: 'Every 8 hours as needed for nausea', route: 'Oral', duration: '5 Days', status: 'Active', prescribedBy: 'Dr. Sarah Jenkins', stockAvailable: true },
      { id: 'RX-898-02', medicineName: 'Dexamethasone', dosage: '4 mg', frequency: 'Once daily in morning with food', route: 'Oral', duration: '3 Days', status: 'Active', prescribedBy: 'Dr. Sarah Jenkins', stockAvailable: true },
      { id: 'RX-898-03', medicineName: 'Filgrastim (Neupogen)', dosage: '300 mcg / 0.5 mL', frequency: 'Once daily subcutaneous injection', route: 'Subcutaneous', duration: '3 Days', status: 'Active', prescribedBy: 'Dr. Sarah Jenkins', stockAvailable: true }
    ],
    billing: {
      roomCharges: 2400,
      doctorConsultation: 1400,
      pharmacyCharges: 2200,
      laboratoryCharges: 1100,
      nursingCare: 800,
      totalAmount: 7900,
      insuranceCovered: 6900,
      patientPayable: 1000,
      status: 'Active Pre-Approval'
    }
  }
];

export const INITIAL_DISCHARGED_PATIENTS = [
  {
    id: 'PAT-2026-0880',
    name: 'George Miller',
    age: 62,
    gender: 'Male',
    diagnosis: 'Acute Coronary Syndrome, Unstable Angina',
    assignedDoctor: 'Dr. Sarah Jenkins',
    ward: 'General Ward A',
    bedNumber: 'A-101',
    admissionDate: '2026-11-06 10:00 AM',
    dischargeDate: '2026-11-12 02:30 PM',
    dischargeSummary: 'Patient successfully stabilized. Treadmill stress test negative at 7 METs. Discharged on statin and anti-platelet therapy. Follow up in Cardiology OPD in 14 days.',
    billingStatus: 'Settled ($4,250)',
    prescriptionsAtDischarge: 'Atorvastatin 20mg, Aspirin 81mg, Metoprolol 12.5mg'
  },
  {
    id: 'PAT-2026-0882',
    name: 'Nalini Reddy',
    age: 31,
    gender: 'Female',
    diagnosis: 'Elective Cesarean Delivery of Healthy Male Infant (3.4 kg)',
    assignedDoctor: 'Dr. Aisha Patel',
    ward: 'Maternity Ward',
    bedNumber: 'M-302',
    admissionDate: '2026-11-08 07:30 AM',
    dischargeDate: '2026-11-11 11:00 AM',
    dischargeSummary: 'Uncomplicated post-op recovery. Mother and baby in excellent health. Lactation established. Surgical incision well coapted.',
    billingStatus: 'Settled ($3,890)',
    prescriptionsAtDischarge: 'Iron & Folic Acid, Calcium supplements, Ibuprofen 400mg SOS'
  }
];

export const INITIAL_MEDICINE_REQUESTS = [
  {
    id: 'MED-REQ-101',
    patientId: 'PAT-2026-0891',
    patientName: 'Marcus Sterling',
    bedNumber: 'ICU-02',
    ward: 'ICU Ward',
    medicineName: 'Atorvastatin 40 mg',
    quantity: 1,
    requestTime: '2026-11-13 10:15 AM',
    prescribedBy: 'Dr. Sarah Jenkins',
    verified: true,
    status: 'Pending', // Pending | Approved | Out for Delivery | Delivered | Rejected
    pharmacistNotes: 'Authorized under active STEMI protocol.'
  },
  {
    id: 'MED-REQ-102',
    patientId: 'PAT-2026-0892',
    patientName: 'Sophia Martinez',
    bedNumber: 'A-102',
    ward: 'General Ward A',
    medicineName: 'Paracetamol 650 mg',
    quantity: 2,
    requestTime: '2026-11-13 11:00 AM',
    prescribedBy: 'Dr. David Kim',
    verified: true,
    status: 'Approved',
    pharmacistNotes: 'Dispensed by PharmD Rivera. Transferred to delivery queue.'
  }
];

export const INITIAL_PRINTING_REQUESTS = [
  {
    id: 'PRT-REQ-201',
    patientId: 'PAT-2026-0891',
    patientName: 'Marcus Sterling',
    bedNumber: 'ICU-02',
    ward: 'ICU Ward',
    reportId: 'REP-0891-01',
    reportTitle: 'Cardiac Biomarkers & Troponin-I Panel',
    requestTime: '2026-11-13 10:30 AM',
    status: 'Pending', // Pending | Printing | Ready for Delivery | Delivered
    printedBy: null,
    deliveryNotes: 'Patient attendant requested paper copy for personal medical binder.'
  },
  {
    id: 'PRT-REQ-202',
    patientId: 'PAT-2026-0893',
    patientName: 'James Arthur Wilson',
    bedNumber: 'B-201',
    ward: 'Ward B',
    reportId: 'REP-0893-01',
    reportTitle: 'Brain Magnetic Resonance Imaging (MRI) with DWI',
    requestTime: '2026-11-13 09:45 AM',
    status: 'Ready for Delivery',
    printedBy: 'Marcus Vance',
    deliveryNotes: 'Printed in high-resolution laser format. In bedside delivery tray.'
  }
];

export const INITIAL_EMERGENCY_ALERTS = [
  {
    id: 'EMG-ALERT-301',
    patientId: 'PAT-2026-0891',
    patientName: 'Marcus Sterling',
    bedNumber: 'ICU-02',
    ward: 'ICU Ward',
    timestamp: '2026-11-13 11:35 AM',
    reason: 'Emergency Assistance Call Triggered from Bedside Touchscreen',
    severity: 'CRITICAL',
    acknowledged: false,
    acknowledgedBy: null,
    acknowledgedTime: null,
    status: 'Active Alert'
  }
];

export const INITIAL_ASSISTANCE_REQUESTS = [
  {
    id: 'AST-REQ-401',
    patientId: 'PAT-2026-0892',
    patientName: 'Sophia Martinez',
    bedNumber: 'A-102',
    ward: 'General Ward A',
    type: 'Nurse Call',
    details: 'Pain score re-assessment and IV drip check',
    timestamp: '2026-11-13 11:10 AM',
    status: 'In Progress',
    assignedTo: 'Nurse Jessica Taylor'
  },
  {
    id: 'AST-REQ-402',
    patientId: 'PAT-2026-0895',
    patientName: 'Vikram Malhotra',
    bedNumber: 'A-104',
    ward: 'General Ward A',
    type: 'Wheelchair Assistance',
    details: 'Assistance required for scheduled X-ray transport',
    timestamp: '2026-11-13 11:20 AM',
    status: 'Pending',
    assignedTo: 'Nurse Elena Ramos'
  },
  {
    id: 'AST-REQ-403',
    patientId: 'PAT-2026-0893',
    patientName: 'James Arthur Wilson',
    bedNumber: 'B-201',
    ward: 'Ward B',
    type: 'Housekeeping',
    details: 'Fresh bed linen and spill cleanup requested',
    timestamp: '2026-11-13 10:50 AM',
    status: 'Completed',
    assignedTo: 'Hospital Support Staff'
  }
];

export const INITIAL_PHARMACY_INVENTORY = [
  { id: 'INV-01', name: 'Atorvastatin', dosage: '40 mg', category: 'Cardiovascular', stock: 450, unit: 'Tablets', batch: 'BAT-2026-AT40', status: 'Optimal' },
  { id: 'INV-02', name: 'Clopidogrel (Plavix)', dosage: '75 mg', category: 'Cardiovascular', stock: 280, unit: 'Tablets', batch: 'BAT-2026-CP75', status: 'Optimal' },
  { id: 'INV-03', name: 'Amoxicillin-Clavulanate', dosage: '625 mg', category: 'Antibiotics', stock: 195, unit: 'Tablets', batch: 'BAT-2026-AC62', status: 'Optimal' },
  { id: 'INV-04', name: 'Paracetamol', dosage: '650 mg', category: 'Analgesics', stock: 1200, unit: 'Tablets', batch: 'BAT-2026-PC65', status: 'Optimal' },
  { id: 'INV-05', name: 'Meropenem Trihydrate IV', dosage: '1 g', category: 'Critical Care Antibiotic', stock: 42, unit: 'Vials', batch: 'BAT-2026-MP10', status: 'Low Stock' },
  { id: 'INV-06', name: 'Salbutamol Nebulizer Solution', dosage: '2.5 mg', category: 'Pulmonary', stock: 110, unit: 'Respules', batch: 'BAT-2026-SB25', status: 'Optimal' },
  { id: 'INV-07', name: 'Enoxaparin Sodium (Lovenox)', dosage: '40 mg', category: 'Anticoagulant', stock: 75, unit: 'Syringes', batch: 'BAT-2026-EX40', status: 'Optimal' },
  { id: 'INV-08', name: 'Labetalol HCl', dosage: '100 mg', category: 'Antihypertensive', stock: 160, unit: 'Tablets', batch: 'BAT-2026-LB10', status: 'Optimal' },
  { id: 'INV-09', name: 'Ondansetron (Zofran)', dosage: '8 mg', category: 'Antiemetic', stock: 320, unit: 'Tablets', batch: 'BAT-2026-OD08', status: 'Optimal' },
  { id: 'INV-10', name: 'Filgrastim (Neupogen)', dosage: '300 mcg', category: 'Oncology', stock: 28, unit: 'Vials', batch: 'BAT-2026-FG30', status: 'Low Stock' }
];

export const INITIAL_ANNOUNCEMENTS = [
  { id: 'ANN-01', title: 'Hospital Infection Control Protocols in Effect', time: 'Today 08:00 AM', priority: 'Notice', content: 'Visiting hours are 10:00 AM to 08:00 PM. Maximum 2 attendants per bedside. Sanitizer dispensers available at every ward entry.' },
  { id: 'ANN-02', title: 'Specialist Rounds Timing Notice', time: 'Today 09:30 AM', priority: 'Info', content: 'Cardiology and Internal Medicine senior consultants will conduct morning rounds between 10:30 AM and 01:00 PM.' },
  { id: 'ANN-03', title: 'Bedside Touchscreen Printing Service Active', time: 'Active 24/7', priority: 'Feature', content: 'Patients and family members may request direct bedside laser printouts of all verified lab and radiology results via the Reports tab.' }
];

export const INITIAL_AUDIT_LOGS = [
  { id: 'LOG-01', timestamp: '2026-11-13 08:30 AM', user: 'Admin Station (ADM-01)', action: 'System Initialization', details: 'Hospital state database synced. All 24 bed sensors connected.' },
  { id: 'LOG-02', timestamp: '2026-11-13 09:15 AM', user: 'Dr. Sarah Jenkins', action: 'Lab Report Verification', details: 'Verified Cardiac Biomarkers for Patient PAT-2026-0891 (Marcus Sterling).' },
  { id: 'LOG-03', timestamp: '2026-11-13 10:15 AM', user: 'Patient Bedside (ICU-02)', action: 'Medicine Order Request', details: 'Prescribed refill requested for Atorvastatin 40mg.' },
  { id: 'LOG-04', timestamp: '2026-11-13 10:30 AM', user: 'Patient Bedside (ICU-02)', action: 'Print Request Initiated', details: 'Physical print copy requested for Troponin-I Lab Report.' },
  { id: 'LOG-05', timestamp: '2026-11-13 11:35 AM', user: 'Patient Bedside (ICU-02)', action: 'Emergency Assistance Triggered', details: 'Bedside SOS button pressed. Priority Code Blue dispatch notification routed to Nurse Elena Ramos.' }
];

