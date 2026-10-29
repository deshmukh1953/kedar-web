import React, { useState } from 'react';
import { TaskItem } from '../types';

interface TaskSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskItem;
  onSubmit: (githubUrl: string, description: string, screenshotUrl: string) => void;
}

export const TaskSubmitModal: React.FC<TaskSubmitModalProps> = ({
  isOpen,
  onClose,
  task,
  onSubmit,
}) => {
  const [githubUrl, setGithubUrl] = useState('https://github.com/student-dev/internship-nexus/pull/4');
  const [description, setDescription] = useState('Implemented REST API endpoints with JWT authentication middleware, rate limiting with Redis, and 85% unit test coverage.');
  const [screenshotPreview, setScreenshotPreview] = useState<string>('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop');
  const [customScreenshotUrl, setCustomScreenshotUrl] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalScreenshot = customScreenshotUrl.trim() ? customScreenshotUrl : screenshotPreview;
    onSubmit(githubUrl, description, finalScreenshot);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#111111] border border-orange-500/40 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl shadow-orange-500/10 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <span>🚀 Mandatory Submission</span> • Task #{task.number}
            </div>
            <h3 className="text-xl font-black text-white mt-1">
              {task.title}
            </h3>
            <p className="text-xs text-neutral-400">
              Submit GitHub Link + Detailed Description + Proof Screenshot as required by blueprint.
            </p>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white text-xl">
            &times;
          </button>
        </div>

        {/* Requirements checklist */}
        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
          <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Review Criteria Checklist:</span>
          <div className="space-y-1.5">
            {task.requirements.map((req, i) => (
              <div key={i} className="flex items-start text-xs text-neutral-300 gap-2">
                <span className="text-orange-400 font-bold shrink-0">✓</span>
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Rule 1: GitHub Link */}
          <div>
            <label className="block font-semibold text-neutral-300 mb-1.5">
              1. GitHub Repository / Pull Request Link <span className="text-orange-400">*</span>
            </label>
            <input
              type="url"
              required
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/your-username/repo/pull/1"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          {/* Rule 2: Description */}
          <div>
            <label className="block font-semibold text-neutral-300 mb-1.5">
              2. Detailed Implementation Description <span className="text-orange-400">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain how you resolved the requirements, architecture decisions, and test results..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Rule 3: Screenshots */}
          <div>
            <label className="block font-semibold text-neutral-300 mb-1.5">
              3. Verification Screenshots (Terminal tests, API response, UI) <span className="text-orange-400">*</span>
            </label>
            
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-500 file:text-black hover:file:bg-orange-400 cursor-pointer"
              />

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-neutral-500">Or Image URL:</span>
                <input
                  type="url"
                  placeholder="https://i.imgur.com/..."
                  value={customScreenshotUrl}
                  onChange={(e) => setCustomScreenshotUrl(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white font-mono"
                />
              </div>

              {/* Preview */}
              {(customScreenshotUrl || screenshotPreview) && (
                <div className="mt-2 rounded-xl border border-neutral-800 overflow-hidden bg-black max-h-40 flex items-center justify-center">
                  <img
                    src={customScreenshotUrl || screenshotPreview}
                    alt="Screenshot Proof Preview"
                    className="object-cover w-full h-full max-h-40"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs transition shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
            >
              <span>Submit Task #{task.number} to Senior Trainer</span>
              <span>📤</span>
            </button>
            <p className="text-[10px] text-center text-neutral-500 mt-2">
              Trainer will review code diff, verify test screenshot, and sign off within 48 hours SLA.
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};

