import { toast } from "react-toastify";
const handleCopy = async (id) => {

    const res = await fetch(`http://localhost:3000/api/trips/find/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 403 || res.status === 404) navigate("/create");
    const data = await res.json();
    const formatted = data.details
      .map((item) => {
        const places = item.places_to_visit
          .map((p) => `• ${p.name} (Ticket: ₹${p.ticket})`)
          .join("\n");

        return `
Day ${item.day}
${item.title ? item.title : ""}

${item.description ? item.description : ""}

Places to Visit:
${places || "None"}

Estimated Cost: ₹${item.estimated_cost}

Budget Breakdown:
  • Food: ₹${item.budget_details.food}
  • Travel: ₹${item.budget_details.travel}
  • Tickets: ₹${item.budget_details.tickets}
  • Misc: ₹${item.budget_details.misc}
`.trim();
      })
      .join("\n\n---------------------\n\n");

    navigator.clipboard
      .writeText(formatted)
      .then(() => toast.success("Itinerary copied!"))
      .catch(() => toast.error("Failed to copy"));
  };
  export default handleCopy;
