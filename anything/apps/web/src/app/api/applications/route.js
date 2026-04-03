import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      requirement_id,
      applicant_name,
      applicant_email,
      applicant_phone,
      cover_message,
      portfolio_url,
      rate,
    } = body;

    if (!requirement_id || !applicant_name || !applicant_email) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const [newApplication] = await sql`
      INSERT INTO applications (
        requirement_id,
        applicant_name,
        applicant_email,
        applicant_phone,
        cover_message,
        portfolio_url,
        rate,
        status
      ) VALUES (
        ${requirement_id},
        ${applicant_name},
        ${applicant_email},
        ${applicant_phone || null},
        ${cover_message || null},
        ${portfolio_url || null},
        ${rate || null},
        'pending'
      )
      RETURNING *;
    `;

    return Response.json(newApplication);
  } catch (error) {
    console.error("Error creating application:", error);
    return Response.json(
      { error: "Failed to create application" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const applications = await sql`
      SELECT 
        a.*,
        r.event_name,
        r.event_type,
        r.event_date_range,
        r.location,
        r.hiring_type
      FROM applications a
      JOIN requirements r ON a.requirement_id = r.id
      ORDER BY a.created_at DESC;
    `;
    return Response.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return Response.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}
