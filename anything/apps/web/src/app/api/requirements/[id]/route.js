import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const [requirement] = await sql`
      SELECT * FROM requirements WHERE id = ${id}
    `;

    if (!requirement) {
      return Response.json({ error: "Requirement not found" }, { status: 404 });
    }

    return Response.json(requirement);
  } catch (error) {
    console.error("Error fetching requirement:", error);
    return Response.json(
      { error: "Failed to fetch requirement" },
      { status: 500 },
    );
  }
}
