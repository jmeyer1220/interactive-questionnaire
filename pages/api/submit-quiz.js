export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, results, answers } = req.body;

    // Here, you would typically send this data to your email service or CRM
    // For this example, we'll just log it and send a success response
    console.log("Received quiz submission:", { email, results, answers });

    // TODO: Add your email service or CRM logic here

    res.status(200).json({ message: "Quiz results submitted successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
