/**
 * Threadly Analytics Utility
 * 
 * Connected to Vercel Analytics.
 */
import { track } from '@vercel/analytics'

type AnalyticsEvent = 
  | 'signup_started'
  | 'signup_completed'
  | 'chat_sent'
  | 'sidebar_jump'
  | 'share_created'
  | 'snapshot_exported'
  | 'tutorial_started'
  | 'tutorial_completed'
  | 'feedback_submitted'

export const trackEvent = (event: AnalyticsEvent, metadata: Record<string, any> = {}) => {
  // 1. Log to console in dev for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${event}`, metadata)
  }

  // 2. Fire to Vercel Analytics
  try {
    track(event, metadata)
  } catch (e) {
    console.error('Analytics tracking failed', e)
  }
}
