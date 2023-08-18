import 'react-native-url-polyfill/auto' 
import { createClient } from '@supabase/supabase-js'
 
const supabaseUrl = "https://smoqrpjagpmjromdiwdw.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtb3FycGphZ3BtanJvbWRpd2R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyNTY0MjcsImV4cCI6MjAwNzgzMjQyN30.co_f9_Nylmj3BsY1yVFO76Sag8-ZM8ClTRjhmJIsw5M"

const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default supabase;