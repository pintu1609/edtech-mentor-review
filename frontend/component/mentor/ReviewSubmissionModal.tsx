"use client";
import { useState } from "react";
import axios from "@/frontend/service/axios";

export default function ReviewSubmissionModal({
  open,
  submission,
  onClose,
}: any) {
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState<number>(0);

  if (!open || !submission) return null;

  const submit = async () => {
    await axios.patch("/api/mentor/review", {
      submissionId: submission._id,
      feedback,
      score,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white/80 backdrop-blur-xl p-6 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="font-semibold mb-4">Review Submission</h2>

        <textarea
          className="w-full border rounded-lg p-3 text-sm mb-2"
          placeholder="Feedback"
          onChange={(e) => setFeedback(e.target.value)}
        />

        <input
          type="number"
          className="w-full border rounded-lg p-2 mb-4"
          placeholder="Score"
          onChange={(e) => setScore(Number(e.target.value))}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={submit}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
