'use client';

import { useState } from 'react';
import { usePostHog } from 'posthog-js/react';
import styles from '@/app/practice/practice.module.css';

export interface PracticeQuestion {
  number: number;
  question: string;
  options: { label: string; text: string }[];
  answer: string;
  explanation: string;
}

export interface QuizLabels {
  answered: string;
  correct: string;
  correctMark: string;
  answerPrefix: string; // followed by the correct option letter
}

const DEFAULT_LABELS: QuizLabels = {
  answered: 'Answered',
  correct: 'Correct',
  correctMark: '✓ Correct',
  answerPrefix: 'Answer:',
};

/**
 * Interactive practice quiz. Questions are rendered server-side (text is present
 * in the initial HTML for crawlers and AI engines); the client layer only adds
 * answer selection, instant scoring, and explanation reveal.
 */
export default function PracticeQuiz({
  questions,
  labels = DEFAULT_LABELS,
}: {
  questions: PracticeQuestion[];
  labels?: QuizLabels;
}) {
  const posthog = usePostHog();
  const [picked, setPicked] = useState<Record<number, string>>({});

  const answeredCount = Object.keys(picked).length;
  const correctCount = questions.reduce(
    (acc, q) => (picked[q.number] === q.answer ? acc + 1 : acc),
    0,
  );

  const choose = (qNumber: number, label: string) => {
    if (picked[qNumber]) return; // lock after first choice
    setPicked((prev) => ({ ...prev, [qNumber]: label }));
    posthog?.capture('Practice_Answer', { question: qNumber, choice: label });
  };

  return (
    <div className={styles.quiz}>
      <div className={styles.scoreBar} aria-live="polite">
        <span>
          {labels.answered} <strong>{answeredCount}</strong> / {questions.length}
        </span>
        <span>
          {labels.correct} <strong>{correctCount}</strong>
        </span>
      </div>

      <ol className={styles.questionList}>
        {questions.map((q) => {
          const chosen = picked[q.number];
          const isAnswered = Boolean(chosen);
          return (
            <li key={q.number} className={styles.questionCard}>
              <p className={styles.questionText}>
                <span className={styles.qNum}>Q{q.number}.</span> {q.question}
              </p>
              <div className={styles.options}>
                {q.options.map((opt) => {
                  const isCorrect = opt.label === q.answer;
                  const isChosen = chosen === opt.label;
                  let cls = styles.option;
                  if (isAnswered && isCorrect) cls = `${styles.option} ${styles.optionCorrect}`;
                  else if (isChosen && !isCorrect) cls = `${styles.option} ${styles.optionWrong}`;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      className={cls}
                      onClick={() => choose(q.number, opt.label)}
                      disabled={isAnswered}
                    >
                      <span className={styles.optionLabel}>{opt.label}</span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation is always in the DOM (crawlable); visually revealed after answering. */}
              <div
                className={isAnswered ? `${styles.explanation} ${styles.explanationOpen}` : styles.explanation}
                hidden={!isAnswered}
              >
                <p className={styles.explanationVerdict}>
                  {isAnswered && chosen === q.answer
                    ? labels.correctMark
                    : `${labels.answerPrefix} ${q.answer}`}
                </p>
                <p className={styles.explanationText}>{q.explanation}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
