import { supabase } from './supabase';

const FINGERPRINT_KEY = 'eclavin_user_fingerprint';

const getFingerprint = () => {
  if (typeof window === 'undefined') return 'server';
  let fp = window.localStorage.getItem(FINGERPRINT_KEY);
  if (!fp) {
    fp = 'user_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    window.localStorage.setItem(FINGERPRINT_KEY, fp);
  }
  return fp;
};

export type AnalyticsEvent = {
  type: 'page_view' | 'quiz_attempt';
  payload?: any;
};

export const logEvent = async (event: AnalyticsEvent) => {
  try {
    const fingerprint = getFingerprint();
    const { error } = await supabase.from('analytics_events').insert({
      event_type: event.type,
      payload: event.payload || {},
      user_fingerprint: fingerprint,
    });
    if (error) console.error('Analytics error:', error);
  } catch (err) {
    console.error('Failed to log event:', err);
  }
};
