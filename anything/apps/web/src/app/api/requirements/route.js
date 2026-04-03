import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      event_name,
      event_type,
      event_date_range,
      location,
      venue,
      hiring_type,
      details,
    } = body;

    // Basic validation
    if (
      !event_name ||
      !event_type ||
      !event_date_range ||
      !location ||
      !hiring_type
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const [newRequirement] = await sql`
      INSERT INTO requirements (
        event_name, 
        event_type, 
        event_date_range, 
        location, 
        venue, 
        hiring_type, 
        details
      ) VALUES (
        ${event_name}, 
        ${event_type}, 
        ${event_date_range}, 
        ${location}, 
        ${venue || null}, 
        ${hiring_type}, 
        ${JSON.stringify(details || {})}
      )
      RETURNING *;
    `;

    return Response.json(newRequirement);
  } catch (error) {
    console.error("Error saving requirement:", error);
    return Response.json(
      { error: "Failed to save requirement" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const requirements = await sql`
      SELECT * FROM requirements ORDER BY created_at DESC;
    `;
    return Response.json(requirements);
  } catch (error) {
    console.error("Error fetching requirements:", error);
    return Response.json(
      { error: "Failed to fetch requirements" },
      { status: 500 },
    );
  }
}
