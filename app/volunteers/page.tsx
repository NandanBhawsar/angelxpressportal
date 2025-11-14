'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { AuthGuard } from '@/components/AuthGuard';
import { useStore } from '@/lib/store';
import { Plus, Clock, Award, Download, User } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { mockVolunteers } from '@/lib/mockData';
import { useEffect } from 'react';

export default function VolunteersPage() {
  const { volunteers, addVolunteer, addVolunteerHour } = useStore();
  const [showHourForm, setShowHourForm] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [hourForm, setHourForm] = useState({
    date: new Date().toISOString().split('T')[0],
    hours: '',
    activity: '',
    description: '',
  });

  useEffect(() => {
    if (volunteers.length === 0) {
      mockVolunteers.forEach((vol) => addVolunteer(vol));
    }
  }, []);

  const handleAddHour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVolunteer || !hourForm.hours || !hourForm.activity) {
      toast.error('Please fill in all required fields');
      return;
    }

    addVolunteerHour({
      volunteerId: selectedVolunteer,
      date: hourForm.date,
      hours: parseFloat(hourForm.hours),
      activity: hourForm.activity,
      description: hourForm.description,
    });

    toast.success('Hours logged!');
    setHourForm({ date: new Date().toISOString().split('T')[0], hours: '', activity: '', description: '' });
    setShowHourForm(false);
  };

  const generateCertificate = (volunteerId: string) => {
    const volunteer = volunteers.find((v) => v.id === volunteerId);
    if (!volunteer) return;

    // Mock PDF generation - in real app, use jsPDF
    const content = `
      VOLUNTEER CERTIFICATE
      
      This is to certify that
      ${volunteer.name}
      has volunteered for ${volunteer.totalHours} hours
      at AngelXpress Education Center.
      
      Date: ${format(new Date(), 'MMMM d, yyyy')}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate-${volunteer.name}.txt`;
    a.click();
    toast.success('Certificate generated!');
  };

  return (
    <AuthGuard>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Volunteers
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track volunteer hours and generate certificates
              </p>
            </div>
            <button
              onClick={() => setShowHourForm(!showHourForm)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Plus size={20} />
              Log Hours
            </button>
          </div>

          {showHourForm && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <form onSubmit={handleAddHour} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Volunteer <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedVolunteer}
                    onChange={(e) => setSelectedVolunteer(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="">Select a volunteer</option>
                    {volunteers.map((vol) => (
                      <option key={vol.id} value={vol.id}>
                        {vol.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={hourForm.date}
                      onChange={(e) => setHourForm({ ...hourForm, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Hours <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={hourForm.hours}
                      onChange={(e) => setHourForm({ ...hourForm, hours: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Activity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={hourForm.activity}
                    onChange={(e) => setHourForm({ ...hourForm, activity: e.target.value })}
                    placeholder="e.g., Teaching Math, Organizing Event"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={hourForm.description}
                    onChange={(e) => setHourForm({ ...hourForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Log Hours
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowHourForm(false)}
                    className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {volunteers.map((volunteer) => (
              <div
                key={volunteer.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <User className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{volunteer.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{volunteer.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Clock className="text-blue-600" size={20} />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {volunteer.totalHours}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Hours</p>
                  </div>
                </div>

                <button
                  onClick={() => generateCertificate(volunteer.id)}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <Award size={20} />
                  Generate Certificate
                </button>

                {volunteer.hours.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recent Hours:</p>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {volunteer.hours.slice(-3).map((hour) => (
                        <div key={hour.id} className="text-xs text-gray-600 dark:text-gray-400">
                          <p>{format(new Date(hour.date), 'MMM d')} - {hour.hours}h</p>
                          <p className="text-gray-500 dark:text-gray-500">{hour.activity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
}

