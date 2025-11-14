'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { AuthGuard } from '@/components/AuthGuard';
import { useStore } from '@/lib/store';
import { Plus, Package, Book, PenTool, Tablet, AlertCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { mockResources, mockDonationNeeds } from '@/lib/mockData';
import { useEffect } from 'react';

export default function ResourcesPage() {
  const { resources, students, volunteers, addResource, updateResource, addLendingRecord, updateLendingRecord, donationNeeds, addDonationNeed, updateDonationNeed } = useStore();
  const [activeTab, setActiveTab] = useState<'lending' | 'donations'>('lending');
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [showLendForm, setShowLendForm] = useState('');
  const [showDonationForm, setShowDonationForm] = useState(false);

  const [resourceForm, setResourceForm] = useState({
    name: '',
    type: 'book' as 'book' | 'stationery' | 'tablet' | 'other',
  });

  const [lendForms, setLendForms] = useState<Record<string, { studentId: string; volunteerId: string; notes: string }>>({});

  const [donationForm, setDonationForm] = useState({
    item: '',
    quantity: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    description: '',
  });

  useEffect(() => {
    if (resources.length === 0) {
      mockResources.forEach((res) => addResource(res));
    }
    if (donationNeeds.length === 0) {
      mockDonationNeeds.forEach((need) => addDonationNeed(need));
    }
  }, []);

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceForm.name) {
      toast.error('Please enter resource name');
      return;
    }

    addResource({
      name: resourceForm.name,
      type: resourceForm.type,
      status: 'available',
    });

    toast.success('Resource added!');
    setResourceForm({ name: '', type: 'book' });
    setShowResourceForm(false);
  };

  const handleLend = (resourceId: string) => {
    const form = lendForms[resourceId] || { studentId: '', volunteerId: '', notes: '' };
    if (!form.studentId && !form.volunteerId) {
      toast.error('Please select a student or volunteer');
      return;
    }

    addLendingRecord({
      resourceId,
      studentId: form.studentId || undefined,
      volunteerId: form.volunteerId || undefined,
      issueDate: new Date().toISOString().split('T')[0],
      notes: form.notes,
    });

    updateResource(resourceId, { status: 'lent' });
    toast.success('Resource lent!');
    setLendForms((prev) => {
      const newForms = { ...prev };
      delete newForms[resourceId];
      return newForms;
    });
    setShowLendForm('');
  };

  const handleReturn = (resourceId: string, recordId: string) => {
    updateLendingRecord(recordId, { returnDate: new Date().toISOString().split('T')[0] });
    updateResource(resourceId, { status: 'available' });
    toast.success('Resource returned!');
  };

  const handleAddDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationForm.item || !donationForm.quantity) {
      toast.error('Please fill in all required fields');
      return;
    }

    addDonationNeed({
      item: donationForm.item,
      quantity: parseInt(donationForm.quantity),
      priority: donationForm.priority,
      description: donationForm.description,
      status: 'pending',
    });

    toast.success('Donation need added!');
    setDonationForm({ item: '', quantity: '', priority: 'medium', description: '' });
    setShowDonationForm(false);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <Book size={20} />;
      case 'stationery':
        return <PenTool size={20} />;
      case 'tablet':
        return <Tablet size={20} />;
      default:
        return <Package size={20} />;
    }
  };

  return (
    <AuthGuard>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Resources
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track item lending and donation needs
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('lending')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'lending'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Item Lending
              </button>
              <button
                onClick={() => setActiveTab('donations')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'donations'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Donation Needs
              </button>
            </div>

            {/* Lending Tab */}
            {activeTab === 'lending' && (
              <div className="space-y-4">
                <button
                  onClick={() => setShowResourceForm(!showResourceForm)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <Plus size={20} />
                  Add Resource
                </button>

                {showResourceForm && (
                  <form onSubmit={handleAddResource} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Resource Name
                      </label>
                      <input
                        type="text"
                        value={resourceForm.name}
                        onChange={(e) => setResourceForm({ ...resourceForm, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Type
                      </label>
                      <select
                        value={resourceForm.type}
                        onChange={(e) => setResourceForm({ ...resourceForm, type: e.target.value as any })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="book">Book</option>
                        <option value="stationery">Stationery</option>
                        <option value="tablet">Tablet</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowResourceForm(false)}
                        className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resources.map((resource) => {
                    const activeLending = resource.lendingRecords.find((l) => !l.returnDate);
                    return (
                      <div
                        key={resource.id}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getResourceIcon(resource.type)}
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">{resource.name}</h3>
                              <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{resource.type}</p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              resource.status === 'available'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : resource.status === 'lent'
                                ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}
                          >
                            {resource.status}
                          </span>
                        </div>

                        {activeLending ? (
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                              Lent on {format(new Date(activeLending.issueDate), 'MMM d, yyyy')}
                            </p>
                            {activeLending.studentId && (
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                To: {students.find((s) => s.id === activeLending.studentId)?.name || 'Unknown'}
                              </p>
                            )}
                            {activeLending.volunteerId && (
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                To: {volunteers.find((v) => v.id === activeLending.volunteerId)?.name || 'Unknown'}
                              </p>
                            )}
                            <button
                              onClick={() => handleReturn(resource.id, activeLending.id)}
                              className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-semibold transition-colors"
                            >
                              Mark Returned
                            </button>
                          </div>
                        ) : resource.status === 'available' ? (
                          <button
                            onClick={() => {
                              setShowLendForm(resource.id);
                              setLendForms((prev) => ({
                                ...prev,
                                [resource.id]: { studentId: '', volunteerId: '', notes: '' },
                              }));
                            }}
                            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-semibold transition-colors"
                          >
                            Lend Item
                          </button>
                        ) : null}

                        {showLendForm === resource.id && (
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 space-y-2">
                            <select
                              value={lendForms[resource.id]?.studentId || ''}
                              onChange={(e) => setLendForms((prev) => ({
                                ...prev,
                                [resource.id]: {
                                  ...(prev[resource.id] || { studentId: '', volunteerId: '', notes: '' }),
                                  studentId: e.target.value,
                                  volunteerId: '',
                                },
                              }))}
                              className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                              <option value="">Select Student</option>
                              {students.map((s) => (
                                <option key={s.id} value={s.id}>
                                  {s.name}
                                </option>
                              ))}
                            </select>
                            <select
                              value={lendForms[resource.id]?.volunteerId || ''}
                              onChange={(e) => setLendForms((prev) => ({
                                ...prev,
                                [resource.id]: {
                                  ...(prev[resource.id] || { studentId: '', volunteerId: '', notes: '' }),
                                  volunteerId: e.target.value,
                                  studentId: '',
                                },
                              }))}
                              className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                              <option value="">Select Volunteer</option>
                              {volunteers.map((v) => (
                                <option key={v.id} value={v.id}>
                                  {v.name}
                                </option>
                              ))}
                            </select>
                            <input
                              type="text"
                              value={lendForms[resource.id]?.notes || ''}
                              onChange={(e) => setLendForms((prev) => ({
                                ...prev,
                                [resource.id]: {
                                  ...(prev[resource.id] || { studentId: '', volunteerId: '', notes: '' }),
                                  notes: e.target.value,
                                },
                              }))}
                              placeholder="Notes"
                              className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleLend(resource.id)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-semibold transition-colors"
                              >
                                Lend
                              </button>
                              <button
                                onClick={() => {
                                  setShowLendForm('');
                                  setLendForms((prev) => {
                                    const newForms = { ...prev };
                                    delete newForms[resource.id];
                                    return newForms;
                                  });
                                }}
                                className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-semibold transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Donations Tab */}
            {activeTab === 'donations' && (
              <div className="space-y-4">
                <button
                  onClick={() => setShowDonationForm(!showDonationForm)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <Plus size={20} />
                  Add Donation Need
                </button>

                {showDonationForm && (
                  <form onSubmit={handleAddDonation} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Item <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={donationForm.item}
                        onChange={(e) => setDonationForm({ ...donationForm, item: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Quantity <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={donationForm.quantity}
                          onChange={(e) => setDonationForm({ ...donationForm, quantity: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Priority
                        </label>
                        <select
                          value={donationForm.priority}
                          onChange={(e) => setDonationForm({ ...donationForm, priority: e.target.value as any })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={donationForm.description}
                        onChange={(e) => setDonationForm({ ...donationForm, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowDonationForm(false)}
                        className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-4">
                  {donationNeeds.map((need) => (
                    <div
                      key={need.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{need.item}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {need.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              need.priority === 'high'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                : need.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            }`}
                          >
                            {need.priority}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              need.status === 'fulfilled'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                            }`}
                          >
                            {need.status}
                          </span>
                        </div>
                      </div>
                      {need.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{need.description}</p>
                      )}
                      <button
                        onClick={() => {
                          updateDonationNeed(need.id, {
                            status: need.status === 'pending' ? 'fulfilled' : 'pending',
                          });
                          toast.success('Status updated');
                        }}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Mark as {need.status === 'pending' ? 'Fulfilled' : 'Pending'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
}

