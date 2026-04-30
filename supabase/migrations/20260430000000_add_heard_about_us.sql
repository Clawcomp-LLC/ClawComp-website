-- Add "How did you hear about us?" field to applications.
-- Nullable because existing applications were submitted before this question existed;
-- the application form enforces the requirement on new submissions.
ALTER TABLE applications
  ADD COLUMN heard_about_us TEXT;
