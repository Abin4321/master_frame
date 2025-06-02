import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mhjbsptnmjmeqtpocwhm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oamJzcHRubWptZXF0cG9jd2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NzQ1NjYsImV4cCI6MjA2NDQ1MDU2Nn0.oPTQM9RD6ltQLxzh5-2vX1X88-96dYn9SWq895OX3vs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
