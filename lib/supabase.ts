
// This file configures the connection to Supabase and provides helper functions.

const supabaseUrl = 'https://kxbxdrfgfezxapgiqeoe.supabase.co'; // Updated Supabase URL
const supabaseKey = 'sb_publishable_vwJ-mzu84M52VSAICtwMKQ_Oczsls4G'; // Updated Supabase Key

const commonHeaders = {
  'apikey': supabaseKey as string,
  'Authorization': `Bearer ${supabaseKey}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=minimal', // We don't need the data back after inserting
};

interface ContactSubmission {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}

export const saveContactSubmission = async (data: ContactSubmission) => {
    if (!supabaseUrl || !supabaseKey) {
        console.error("Supabase URL or Key is not configured.");
        throw new Error("Supabase is not configured.");
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
        method: 'POST',
        headers: commonHeaders,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            const errorText = await response.text();
            console.error('Supabase non-JSON error response:', errorText);
            throw new Error(`Server returned a non-JSON error (status: ${response.status})`);
        }
        console.error('Supabase error:', errorData);
        const message = errorData.message || `Database error (code: ${response.status})`;
        throw new Error(message);
    }
};


interface InquirySubmission {
    name: string;
    email: string;
    phone?: string;
    hotel_name: string;
    room_name: string;
    check_in: string | null;
    check_out: string | null;
    adults: number;
    children: number;
    meal_plan: string;
    is_custom_inquiry: boolean;
    submission_type: 'EMAIL' | 'WHATSAPP';
}

export const saveInquirySubmission = async (data: InquirySubmission) => {
    if (!supabaseUrl || !supabaseKey) {
        console.error("Supabase URL or Key is not configured.");
        throw new Error("Supabase is not configured.");
    }

    // Explicitly build the payload to ensure all fields are included.
    const payloadToSend = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        hotel_name: data.hotel_name,
        room_name: data.room_name,
        check_in: data.check_in || null, // Convert empty strings to null for date fields
        check_out: data.check_out || null,
        adults: data.adults,
        children: data.children,
        meal_plan: data.meal_plan,
        is_custom_inquiry: data.is_custom_inquiry,
        submission_type: data.submission_type,
    };

    const response = await fetch(`${supabaseUrl}/rest/v1/inquiry_submissions`, {
        method: 'POST',
        headers: commonHeaders,
        body: JSON.stringify(payloadToSend),
    });

    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            const errorText = await response.text();
            console.error('Supabase non-JSON error response:', errorText);
            throw new Error(`Server returned a non-JSON error (status: ${response.status})`);
        }
        console.error('Supabase error:', errorData);
        const message = errorData.message || `Database error (code: ${response.status})`;
        throw new Error(message);
    }
};