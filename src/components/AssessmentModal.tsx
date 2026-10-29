import React, { useState } from 'react';
import { ASSESSMENT_QUESTIONS } from '../data/assessmentAndTasks';
import { UserProfile } from '../types';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onCompleteAssessment: (score: number, discountPercent: number) => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onCompleteAssessment,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const currentQ = ASSESSMENT_QUESTIONS[currentQuestionIndex];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    ASSESSMENT_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        calculatedScore += 1;
      }
    });

    // Discount Engine:
    // 13-15 correct => 40% discount
    // 9-12 correct => 25% discount
    // 5-8 correct => 15% discount
    // <5 correct => 10% enrollment scholarship
    let discount = 10;
    if (calculatedScore >= 13) discount = 40;
    else if (calculatedScore >= 9) discount = 25;
    else if (calculatedScore >= 5) discount = 15;

    setScore(calculatedScore);
    setIsSubmitted(true);
    onCompleteAssessment(calculatedScore, discount);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#111111] border border-orange-500/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl shadow-orange-500/10 animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <span>🎯 Step 4 of 6</span> • 15-Question Skill Assessment
            </div>
            <h3 className="text-xl font-black text-white mt-1">
              {userProfile.designation} Evaluation
            </h3>
            <p className="text-xs text-neutral-400">Score well to unlock up to 40% scholarship discount on your plan.</p>
          </div>
          {!isSubmitted && (
            <button onClick={onClose} className="text-neutral-400 hover:text-white text-xl">
              &times;
            </button>
          )}
        </div>

        {!isSubmitted ? (
          <>
            {/* Progress bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-neutral-400">
                <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                <span className="text-orange-400">{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300" 
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-4">
              <h4 className="text-base font-bold text-white leading-snug">
                {currentQ.question}
              </h4>

              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt: string, idx: number) => {
                  const isSelected = selectedAnswers[currentQ.id] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center justify-between ${
                        isSelected
                          ? 'border-orange-500 bg-orange-500/15 text-orange-200'
                          : 'border-neutral-800 bg-[#141414] text-neutral-300 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      <span>{opt}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                        isSelected ? 'border-orange-500 bg-orange-500 text-black text-[10px] font-black' : 'border-neutral-700'
                      }`}>
                        {isSelected && '✓'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white disabled:opacity-30 disabled:hover:text-neutral-400 transition"
              >
                ← Previous
              </button>

              <div className="flex gap-2">
                {currentQuestionIndex < totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <span>Next</span>
                    <span>→</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black text-xs font-black transition shadow-lg shadow-orange-500/25"
                  >
                    Submit 15 Questions & Calculate Discount 🎉
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Results View */
          <div className="text-center py-6 space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/40 flex items-center justify-center text-3xl mx-auto">
              🏆
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-white">Assessment Complete!</h4>
              <p className="text-neutral-300 text-sm">
                You scored <strong className="text-orange-400 font-bold">{score} / {totalQuestions}</strong> on the {userProfile.designation} track.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1b140f] to-[#121212] border border-orange-500/30 max-w-md mx-auto space-y-2">
              <span className="text-xs uppercase tracking-wider text-orange-400 font-bold">Scholarship Unlocked</span>
              <div className="text-4xl font-black text-white">
                {score >= 13 ? '40%' : score >= 9 ? '25%' : score >= 5 ? '15%' : '10%'} OFF
              </div>
              <p className="text-xs text-neutral-400">
                Applied automatically to your {userProfile.duration}-Month Internship tuition.
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-7 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-sm transition shadow-lg shadow-orange-500/25"
            >
              Continue to Plan & Payment →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
