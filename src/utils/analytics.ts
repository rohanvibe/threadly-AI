/**
 * Threadly Analytics Utility
 * 
 * Simple wrapper for tracking user engagement events.
 * Connect this to PostHog, Vercel Analytics, or Mixpanel for production.
 */

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

  // 2. Placeholder for production tracking provider
  // Example: posthog.capture(event, metadata)
  
  // 3. Optional: Fire to a lightweight Supabase 'events' table if you need internal metrics
}
