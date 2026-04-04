'use client';

import { FormEvent, useMemo, useState } from 'react';
import { createRequirement } from '../lib/api';
import type { HiringCategory, RequirementPayload } from './types';
import GuideSidebar from './GuideSidebar';
import SuccessPage from './SuccessPage';

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
  details: {},
};

const STEP_META = [
  { n: 1, badge: 'Step 1 of 4', title: 'Tell us about your event',  subtitle: "Basic details about the occasion you're planning.", pct: 25  },
  { n: 2, badge: 'Step 2 of 4', title: 'Who are you hiring?',       subtitle: 'Choose the type of talent you need.',               pct: 50  },
  { n: 3, badge: 'Step 3 of 4', title: 'Role specifics',            subtitle: 'Help candidates understand exactly what you need.', pct: 75  },
  { n: 4, badge: 'Step 4 of 4', title: 'Review & submit',           subtitle: 'Confirm your requirement before posting.',           pct: 100 },
];

const STEP_TABS = [
  { n: 1, label: 'Event Details'   },
  { n: 2, label: 'Role & Category' },
  { n: 3, label: 'Specifics'       },
  { n: 4, label: 'Review'          },
];

const categoryFields: Record<HiringCategory, { key: string; label: string; placeholder: string; type?: 'text' | 'number' }[]> = {
  planner: [
    { key: 'budget',        label: 'Budget (USD)',    placeholder: '25,000',                                              type: 'number' },
    { key: 'guestCount',    label: 'Expected Guests', placeholder: '200',                                                 type: 'number' },
    { key: 'planningScope', label: 'Planning Scope',  placeholder: 'End-to-end, vendor management, day-of coordination…' },
  ],
  performer: [
    { key: 'performerType',  label: 'Performer Type',   placeholder: 'Band, DJ, Emcee, Classical ensemble…' },
    { key: 'setLength',      label: 'Set Length (min)', placeholder: '90',                                   type: 'number' },
    { key: 'equipmentNeeds', label: 'Equipment Needs',  placeholder: 'PA system, stage lighting, backline…' },
  ],
  crew: [
    { key: 'crewRole',   label: 'Crew Role',   placeholder: 'Stage setup, audio engineer, lighting tech…' },
    { key: 'headCount',  label: 'Head Count',  placeholder: '6',                                           type: 'number' },
    { key: 'shiftHours', label: 'Shift Hours', placeholder: '8',                                           type: 'number' },
  ],
};

const categoryMeta: Record<HiringCategory, { icon: string; name: string; desc: string }> = {
  planner:   { icon: '📋', name: 'Planner',   desc: 'Full-service event coordination' },
  performer: { icon: '🎤', name: 'Performer', desc: 'Artists, musicians & MCs'        },
  crew:      { icon: '🔧', name: 'Crew',      desc: 'Technical & production staff'     },
};

function formatLabel(key: string) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
}

// Sync left-aside step indicators (SSR-safe)
function syncAside(currentStep: number) {
  if (typeof window === 'undefined') return;
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`aside-step-${i}`);
    if (!el) continue;
    el.classList.remove('active', 'done');
    if (i === currentStep)    el.classList.add('active');
    else if (i < currentStep) el.classList.add('done');
  }
}

export default function MultiStepRequirementForm() {
  const [step, setStep]             = useState(1);
  const [state, setState]           = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const fields = useMemo(() => categoryFields[state.hiringFor], [state.hiringFor]);

  const goToStep = (n: number) => {
    // Allow navigating back to any previous step, or step 1-4 in sequence
    if (n < step || n === step) {
      setStep(n);
      syncAside(n);
    }
  };

  const nextStep = () => {
    const next = Math.min(4, step + 1);
    setStep(next);
    syncAside(next);
  };

  const prevStep = () => {
    const prev = Math.max(1, step - 1);
    setStep(prev);
    syncAside(prev);
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setState(prev => ({ ...prev, [key]: value }));

  const updateDetail = (key: string, value: string) =>
    setState(prev => ({ ...prev, details: { ...prev.details, [key]: value } }));

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createRequirement(state);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePostAnother = () => {
    setSubmitted(false);
    setStep(1);
    setState(initialState);
    setError(null);
    syncAside(1);
  };

  if (submitted) {
    return <SuccessPage onPostAnother={handlePostAnother} />;
  }

  const meta = STEP_META[step - 1];

  return (
    <>
      {/* CENTER: form */}
      <main className="page-main">
        {/* Progress header */}
        <div className="progress-header">
          <div className="form-step-badge">{meta.badge}</div>
          <div className="progress-title-row">
            <h1 className="form-title">{meta.title}</h1>
            <span className="progress-pct">{meta.pct}%</span>
          </div>
          <div className="progress-meta-row">
            <span className="progress-meta-pill">Autosaved locally</span>
            <span className="progress-meta-pill">{5 - step} step{5 - step === 1 ? '' : 's'} remaining</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${meta.pct}%` }} />
          </div>
        </div>

        {/* Step tabs — clickable to go back */}
        <div className="step-tabs" role="tablist">
          {STEP_TABS.map(({ n, label }) => (
            <div
              key={n}
              role="tab"
              aria-selected={n === step}
              className={`step-tab${n === step ? ' active' : n < step ? ' done' : ''}`}
              onClick={() => n < step && goToStep(n)}
              style={{ cursor: n < step ? 'pointer' : 'default' }}
              title={n < step ? `Go back to ${label}` : undefined}
            >
              <span className="step-tab-num">{n < step ? '✓' : n}</span>
              {label}
            </div>
          ))}
        </div>

        <p className="form-subtitle">{meta.subtitle}</p>

        <form className="card" onSubmit={onSubmit}>

          {/* STEP 1: Event basics */}
          {step === 1 && (
            <div className="step-section grid">
              <div className="grid-2">
                <div className="field">
                  <label className="field-label" htmlFor="eventName">Event Name</label>
                  <input id="eventName" required placeholder="Summer Gala 2025"
                    value={state.eventName} onChange={e => update('eventName', e.target.value)} />
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="eventType">Event Type</label>
                  <input id="eventType" required placeholder="Corporate, Wedding, Festival…"
                    value={state.eventType} onChange={e => update('eventType', e.target.value)} />
                </div>
              </div>

              <div className="field">
                <label className="field-label">Date Type</label>
                <div className="segment-control">
                  <button type="button"
                    className={`segment-btn${state.dateType === 'single' ? ' active' : ''}`}
                    onClick={() => update('dateType', 'single')}>
                    Single Date
                  </button>
                  <button type="button"
                    className={`segment-btn${state.dateType === 'range' ? ' active' : ''}`}
                    onClick={() => update('dateType', 'range')}>
                    Date Range
                  </button>
                </div>
              </div>

              <div className={state.dateType === 'range' ? 'grid-2' : ''}>
                <div className="field">
                  <label className="field-label" htmlFor="startDate">
                    {state.dateType === 'range' ? 'Start Date' : 'Date'}
                  </label>
                  <input id="startDate" type="date" required
                    value={state.startDate} onChange={e => update('startDate', e.target.value)} />
                </div>
                {state.dateType === 'range' && (
                  <div className="field">
                    <label className="field-label" htmlFor="endDate">End Date</label>
                    <input id="endDate" type="date" required
                      value={state.endDate} onChange={e => update('endDate', e.target.value)} />
                  </div>
                )}
              </div>

              <div className="grid-2">
                <div className="field">
                  <label className="field-label" htmlFor="location">Location</label>
                  <input id="location" required placeholder="New York, NY"
                    value={state.location} onChange={e => update('location', e.target.value)} />
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="venue">
                    Venue <span className="field-opt">(optional)</span>
                  </label>
                  <input id="venue" placeholder="The Grand Ballroom"
                    value={state.venue} onChange={e => update('venue', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Hiring category */}
          {step === 2 && (
            <div className="step-section">
              <div className="field">
                <label className="field-label">Select a Category</label>
                <div className="category-grid">
                  {(Object.keys(categoryMeta) as HiringCategory[]).map(cat => {
                    const m = categoryMeta[cat];
                    const sel = state.hiringFor === cat;
                    return (
                      <div
                        key={cat}
                        className={`category-card${sel ? ' selected' : ''}`}
                        onClick={() => { update('hiringFor', cat); update('details', {}); }}
                        role="radio"
                        aria-checked={sel}
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && update('hiringFor', cat)}
                      >
                        <div className="cat-check">
                          <svg viewBox="0 0 8 8" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 4l2 2 4-4"/>
                          </svg>
                        </div>
                        <span className="category-icon">{m.icon}</span>
                        <span className="category-name">{m.name}</span>
                        <span className="category-desc">{m.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Role specifics */}
          {step === 3 && (
            <div className="step-section grid">
              {fields.map(field => (
                <div className="field" key={field.key}>
                  <label className="field-label" htmlFor={field.key}>{field.label}</label>
                  <input
                    id={field.key}
                    type={field.type ?? 'text'}
                    required
                    placeholder={field.placeholder}
                    value={String(state.details[field.key] ?? '')}
                    onChange={e => updateDetail(field.key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* STEP 4: Review */}
          {step === 4 && (
            <div className="step-section">
              <div className="review-bento">
                <div className="review-section">
                  <div className="review-section-num">Section 01</div>
                  <div className="review-section-title">
                    General Information
                    <button type="button" className="review-section-edit" onClick={() => goToStep(1)}>
                      <span className="material-symbols-outlined" style={{ fontSize: '0.8rem' }}>edit</span>
                      Edit
                    </button>
                  </div>
                  {([
                    ['Event Name', state.eventName],
                    ['Event Type', state.eventType],
                    ['Date', state.dateType === 'range'
                      ? `${state.startDate} → ${state.endDate}`
                      : state.startDate],
                    ['Location', state.location],
                    state.venue ? ['Venue', state.venue] : null,
                  ] as Array<[string, string] | null>)
                    .filter((e): e is [string, string] => e !== null)
                    .map(([k, v]) => (
                      <div className="review-row" key={k}>
                        <span className="review-key">{k}</span>
                        <span className="review-val">{v}</span>
                      </div>
                    ))}
                </div>

                <div className="review-section">
                  <div className="review-section-num">Section 02</div>
                  <div className="review-section-title">
                    Requirement Details
                    <button type="button" className="review-section-edit" onClick={() => goToStep(2)}>
                      <span className="material-symbols-outlined" style={{ fontSize: '0.8rem' }}>edit</span>
                      Edit
                    </button>
                  </div>
                  <div className="review-row">
                    <span className="review-key">Category</span>
                    <span className="review-val" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {categoryMeta[state.hiringFor].icon} {categoryMeta[state.hiringFor].name}
                    </span>
                  </div>
                  {Object.entries(state.details).map(([k, v]) => (
                    <div className="review-row" key={k}>
                      <span className="review-key">{formatLabel(k)}</span>
                      <span className="review-val">{String(v)}</span>
                    </div>
                  ))}
                </div>

                <div className="ready-badge">
                  <div className="ready-icon">
                    <span className="material-symbols-outlined" style={{ color: 'var(--success)', fontSize: '1.5rem', fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                  <div className="ready-title">Ready to Launch</div>
                  <div className="ready-sub">All mandatory fields are completed and verified.</div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={prevStep}
              disabled={step === 1 || submitting}
            >
              ← Back
            </button>

            {step < 4 ? (
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Continue →
              </button>
            ) : (
              <button type="submit" className="btn btn-indigo" disabled={submitting}>
                {submitting
                  ? <><span className="material-symbols-outlined" style={{ fontSize: '1rem', animation: 'spin 1s linear infinite' }}>progress_activity</span> Submitting…</>
                  : 'Submit Requirement'}
              </button>
            )}
          </div>

          {error && <div className="result-box error">{error}</div>}
        </form>
      </main>

      {/* RIGHT: guide sidebar */}
      <GuideSidebar step={step} />
    </>
  );
}
