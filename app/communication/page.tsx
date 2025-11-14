'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { AuthGuard } from '@/components/AuthGuard';
import { useStore } from '@/lib/store';
import { Plus, Bell, MessageSquare, Calendar, FileText, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { mockAnnouncements } from '@/lib/mockData';
import { useEffect } from 'react';

export default function CommunicationPage() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, messages, addMessage } = useStore();
  const [activeTab, setActiveTab] = useState<'announcements' | 'messages' | 'parent'>('announcements');
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<string | null>(null);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    content: '',
  });

  const [messageForm, setMessageForm] = useState({
    to: '',
    content: '',
  });

  useEffect(() => {
    if (announcements.length === 0) {
      mockAnnouncements.forEach((ann) => addAnnouncement(ann));
    }
  }, []);

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementForm.title || !announcementForm.content) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editingAnnouncement) {
      updateAnnouncement(editingAnnouncement, announcementForm);
      toast.success('Announcement updated!');
      setEditingAnnouncement(null);
    } else {
      addAnnouncement({
        ...announcementForm,
        author: 'Current User',
      });
      toast.success('Announcement added!');
    }

    setAnnouncementForm({ title: '', content: '' });
    setShowAnnouncementForm(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageForm.to || !messageForm.content) {
      toast.error('Please fill in all fields');
      return;
    }

    addMessage({
      from: 'Current User',
      to: messageForm.to,
      content: messageForm.content,
    });

    toast.success('Message sent!');
    setMessageForm({ to: '', content: '' });
  };

  const startEdit = (id: string) => {
    const ann = announcements.find((a) => a.id === id);
    if (ann) {
      setAnnouncementForm({ title: ann.title, content: ann.content });
      setEditingAnnouncement(id);
      setShowAnnouncementForm(true);
    }
  };

  return (
    <AuthGuard>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Communication
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Announcements, messages, and parent communication
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveTab('announcements')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'announcements'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Bell size={18} />
                Announcements
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'messages'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <MessageSquare size={18} />
                Messages
              </button>
              <button
                onClick={() => setActiveTab('parent')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'parent'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <FileText size={18} />
                Parent Templates
              </button>
            </div>

            {/* Announcements Tab */}
            {activeTab === 'announcements' && (
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setShowAnnouncementForm(!showAnnouncementForm);
                    setEditingAnnouncement(null);
                    setAnnouncementForm({ title: '', content: '' });
                  }}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <Plus size={20} />
                  Add Announcement
                </button>

                {showAnnouncementForm && (
                  <form onSubmit={handleAddAnnouncement} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={announcementForm.title}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Content
                      </label>
                      <textarea
                        value={announcementForm.content}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        {editingAnnouncement ? 'Update' : 'Post'} Announcement
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAnnouncementForm(false);
                          setEditingAnnouncement(null);
                        }}
                        className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {announcement.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            By {announcement.author} • {format(new Date(announcement.createdAt), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEdit(announcement.id)}
                            className="p-1 text-blue-600 hover:text-blue-700"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => {
                              deleteAnnouncement(announcement.id);
                              toast.success('Announcement deleted');
                            }}
                            className="p-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{announcement.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                <form onSubmit={handleSendMessage} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      To
                    </label>
                    <input
                      type="text"
                      value={messageForm.to}
                      onChange={(e) => setMessageForm({ ...messageForm, to: e.target.value })}
                      placeholder="Recipient name"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      value={messageForm.content}
                      onChange={(e) => setMessageForm({ ...messageForm, content: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Send Message
                  </button>
                </form>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Message History</h3>
                  {messages.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-center py-8">No messages yet</p>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              To: {message.to}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {format(new Date(message.createdAt), 'MMM d, yyyy h:mm a')}
                            </p>
                          </div>
                          {!message.read && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{message.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Parent Templates Tab */}
            {activeTab === 'parent' && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Parent Meeting Request</h3>
                  <textarea
                    defaultValue="Dear Parent/Guardian,

We would like to schedule a meeting to discuss your child's progress. Please let us know your availability.

Thank you,
AngelXpress Team"
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                    Copy Template
                  </button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Progress Update</h3>
                  <textarea
                    defaultValue="Dear Parent/Guardian,

We are pleased to share an update on your child's progress. [Student Name] has shown great improvement in [Subject/Area].

Best regards,
AngelXpress Team"
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                    Copy Template
                  </button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Event Invitation</h3>
                  <textarea
                    defaultValue="Dear Parent/Guardian,

You are cordially invited to our upcoming event: [Event Name] on [Date] at [Time].

We look forward to your presence.

AngelXpress Team"
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                    Copy Template
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
}

