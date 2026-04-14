
-- Enable the "uuid-ossp" extension for generating UUIDs, if not already enabled.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the inquiry_submissions table
CREATE TABLE public.inquiry_submissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  hotel_name text NOT NULL,
  room_name text NOT NULL,
  check_in date,
  check_out date,
  adults integer NOT NULL,
  children integer NOT NULL,
  meal_plan text NOT NULL,
  is_custom_inquiry boolean DEFAULT FALSE NOT NULL,
  submission_type text NOT NULL -- 'EMAIL' or 'WHATSAPP'
);

ALTER TABLE public.inquiry_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for inquiry submissions" ON public.inquiry_submissions
  FOR INSERT WITH CHECK (true);

-- Optionally, to prevent anonymous users from reading/updating/deleting:
CREATE POLICY "Deny all other operations for inquiry submissions" ON public.inquiry_submissions
  FOR ALL TO anon USING (false);


-- Create the contact_submissions table
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for contact submissions" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

-- Optionally, to prevent anonymous users from reading/updating/deleting:
CREATE POLICY "Deny all other operations for contact submissions" ON public.contact_submissions
  FOR ALL TO anon USING (false);
