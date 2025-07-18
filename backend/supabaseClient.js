// supabaseClient.js
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://wfwjcdofmrmtbsevhgin.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indmd2pjZG9mbXJtdGJzZXZoZ2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1ODQxNDMsImV4cCI6MjA2ODE2MDE0M30._v36zFhVVODt8fe2q50ATVPUU63Gh3K69mkXp-spDUU";
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
