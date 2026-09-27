export interface VerificationDocument {
  id: string;
  type: 'id' | 'license' | 'certificate';
  uri: string;
  fileName: string;
  uploadedAt: string;
}

export interface VerificationStatus {
  status: 'pending' | 'under_review' | 'verified' | 'rejected';
  identityNumber: string;
  documents: VerificationDocument[];
  submittedAt: string | null;
  reviewedAt: string | null;
  rejectionReason?: string;
}
