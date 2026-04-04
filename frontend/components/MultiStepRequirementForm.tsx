'use client';

import { FormEvent, useMemo, useState } from 'react';
import { createRequirement } from '../lib/api';
import type { HiringCategory, RequirementPayload } from './types';

type FormState = RequirementPayload;

const initialState: FormState = {
  eventName: '',
  eventType: '',
  dateType: 'single',
  startDate: '',
  endDate: '',
  location: '',
  venue: '',
  hiringFor: 'planner',
  details: {}
};

const categoryFields: Record<
  HiringCategory,
  { key: string; label: string; placeholder: string; type?: 'text' | 'number' }[]
> = {
  planner: [
    { key: 'budget', label: 'Budget (USD)', placeholder: '25000', type: 'number' },
    { key: 'guestCount', label: 'Expected Guests', placeholder: '200', type: 'number' },
    { key: 'planningScope', label: 'Planning Scope', placeholder: 'End-to-end, vendor management...' }
  ],
  performer: [
    { key: 'performerType', label: 'Performer Type', placeholder: 'Band, DJ, Emcee...' },
    { key: 'setLength', label: 'Set Length (minutes)', placeholder: '90', type: 'number' },
    { key: 'equipmentNeeds', label: 'Equipment Needs', placeholder: 'PA system, lights...' }
  ],
  crew: [
    { key: 'crewRole', label: 'Crew Role', placeholder: 'Stage setup, audio engineer...' },
    { key: 'headCount', label: 'Head Count Needed', placeholder: '6', type: 'number' },
    { key: 'shiftHours', label: 'Shift Hours', placeholder: '8', type: 'number' }
  ]
};

export default function MultiStepRequirementForm() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string>('');
  const fields = useMemo(() => categoryFields[state.hiringFor], [state.hiringFor]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const updateDetail = (key: string, value: string) => {
    setState((prev) => ({ ...prev, details: { ...prev.details, [key]: value } }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setResult('');
    try {
      const data = await createRequirement(state);
      setResult(`Saved! Requirement id: ${data.data.documentId} (${data.data.hiringFor})`);
    } catch (error) {
      setResult(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <div className="step-indicator">Step {step} of 4</div>

      {step === 1 && (
        <section className="grid">
          <label>
            Event Name
            <input required value={state.eventName} onChange={(e) => update('eventName', e.target.value)} />
          </label>
          <label>
            Event Type
            <input required value={state.eventType} onChange={(e) => update('eventType', e.target.value)} />
          </label>
          <label>
            Date Type
            <select value={state.dateType} onChange={(e) => update('dateType', e.target.value as 'single' | 'range')}>
              <option value="single">Single Date</option>
              <option value="range">Date Range</option>
            </select>
          </label>
          <label>
            Start Date
            <input type="date" required value={state.startDate} onChange={(e) => update('startDate', e.target.value)} />
          </label>
          {state.dateType === 'range' && (
            <label>
              End Date
              <input type="date" required value={state.endDate} onChange={(e) => update('endDate', e.target.value)} />
            </label>
          )}
          <label>
            Location
            <input required value={state.location} onChange={(e) => update('location', e.target.value)} />
          </label>
          <label>
            Venue (optional)
            <input value={state.venue} onChange={(e) => update('venue', e.target.value)} />
          </label>
          <label>
            Hiring For
            <select
              value={state.hiringFor}
              onChange={(e) => {
                const category = e.target.value as HiringCategory;
                update('hiringFor', category);
                update('details', {});
              }}
            >
              <option value="planner">Event Planner</option>
              <option value="performer">Performer</option>
              <option value="crew">Crew</option>
            </select>
          </label>
        </section>
      )}

      {(step === 2 || step === 3) && (
        <section className="grid">
          <h2>{state.hiringFor[0].toUpperCase() + state.hiringFor.slice(1)} Details</h2>
          {fields.map((field) => (
            <label key={field.key}>
              {field.label}
              <input
                type={field.type ?? 'text'}
                required
                placeholder={field.placeholder}
                value={String(state.details[field.key] ?? '')}
                onChange={(e) => updateDetail(field.key, e.target.value)}
              />
            </label>
          ))}
          <p className="helper">Step {step}: collect category-specific requirement details.</p>
        </section>
      )}

      {step === 4 && (
        <section>
          <h2>Review & Submit</h2>
          <pre>{JSON.stringify(state, null, 2)}</pre>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Requirement'}
          </button>
        </section>
      )}

      <div className="actions">
        <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1 || submitting}>
          Back
        </button>
        {step < 4 && (
          <button type="button" onClick={() => setStep((s) => Math.min(4, s + 1))}>
            Next
          </button>
        )}
      </div>

      {result && <p className="result">{result}</p>}
    </form>
  );
}
