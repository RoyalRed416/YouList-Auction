import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Upload, FileText } from 'lucide-react';

const VerificationPage = () => {
  const navigate = useNavigate();
  const { verifyIdentity } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    idDocument: null as File | null,
    documentType: 'passport' as 'passport' | 'drivers_license' | 'national_id',
    documentNumber: '',
    expirationDate: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, idDocument: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.idDocument) {
      setError('Please upload your ID document');
      return;
    }

    try {
      setIsLoading(true);
      await verifyIdentity({
        idDocument: formData.idDocument,
        documentType: formData.documentType,
        documentNumber: formData.documentNumber,
        expirationDate: formData.expirationDate,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Verify Your Identity</h1>
          <p className="text-gray-400">Please provide a valid government-issued ID</p>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="documentType" className="label">Document Type</label>
                <select
                  id="documentType"
                  required
                  className="input"
                  value={formData.documentType}
                  onChange={(e) => setFormData({
                    ...formData,
                    documentType: e.target.value as 'passport' | 'drivers_license' | 'national_id'
                  })}
                >
                  <option value="passport">Passport</option>
                  <option value="drivers_license">Driver's License</option>
                  <option value="national_id">National ID</option>
                </select>
              </div>

              <div>
                <label htmlFor="documentNumber" className="label">Document Number</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="documentNumber"
                    required
                    className="input pl-10"
                    value={formData.documentNumber}
                    onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="expirationDate" className="label">Document Expiration Date</label>
                <input
                  type="date"
                  id="expirationDate"
                  required
                  className="input"
                  value={formData.expirationDate}
                  onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Upload Document</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md hover:border-primary-500 transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-400">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary-500 hover:text-primary-400">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </div>
                {formData.idDocument && (
                  <p className="mt-2 text-sm text-gray-400">
                    Selected file: {formData.idDocument.name}
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div className="text-error-500 text-sm mt-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary py-3"
            >
              {isLoading ? 'Verifying...' : 'Complete Verification'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;