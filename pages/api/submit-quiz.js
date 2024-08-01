import axios from "axios";
import mailchimp from "@mailchimp/mailchimp_marketing";

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER, // e.g., 'us8'
});


async function ensureCustomPropertiesExist(accessToken) {
  const properties = [
    {
      name: "quiz_results",
      label: "Quiz Results",
      type: "string",
      fieldType: "textarea",
      groupName: "contactinformation",
    },
    {
      name: "quiz_answers",
      label: "Quiz Answers",
      type: "string",
      fieldType: "textarea",
      groupName: "contactinformation",
    },
  ];

  for (const property of properties) {
    try {
      await axios.post(
        "https://api.hubapi.com/properties/v1/contacts/properties",
        property,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(`Property ${property.name} created or already exists`);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log(`Property ${property.name} already exists`);
      } else {
        console.error(
          `Error creating property ${property.name}:`,
          error.response ? error.response.data : error.message,
        );
        throw error;
      }
    }
  }
}

async function addContactToHubSpot(email, results, answers) {
  const hubspotAccessToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!hubspotAccessToken) {
    console.error("HUBSPOT_ACCESS_TOKEN is not set");
    throw new Error("HubSpot access token is missing");
  }

  try {
    // Ensure custom properties exist
    await ensureCustomPropertiesExist(hubspotAccessToken);

    // Create or update contact
    const createOrUpdateResponse = await axios.post(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        properties: {
          email: email,
          quiz_results: JSON.stringify(results),
          quiz_answers: JSON.stringify(answers),
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${hubspotAccessToken}`,
        },
      },
    );

    console.log("Contact created or updated in HubSpot:", createOrUpdateResponse.data);
    return createOrUpdateResponse.data;
  } catch (error) {
    console.error(
      "Error in HubSpot integration:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}

async function addSubscriberToMailchimp(email, results, answers) {
  try {
    // Check Mailchimp connection
    await mailchimp.ping.get();
    console.log("Successfully connected to Mailchimp");

    // Assuming results is an array of [archetype, score] pairs
    const topArchetype = results[0][0];
    const tag = `Archetype:${topArchetype}`;

    // Add or update subscriber
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          QUIZRESULTS: JSON.stringify(results),
          QUIZANSWERS: JSON.stringify(answers),
        },
        tags: [tag],
      }
    );

    console.log("Subscriber added/updated in Mailchimp:", response);
    return response;
  } catch (error) {
    console.error(
      "Error in Mailchimp integration:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, results, answers } = req.body;
    console.log("Received data:", { email, results, answers });

    try {
      // Add/update contact in HubSpot
      console.log("Adding/updating contact in HubSpot...");
      await addContactToHubSpot(email, results, answers);

      // Add/update subscriber in Mailchimp
      console.log("Adding/updating subscriber in Mailchimp...");
      await addSubscriberToMailchimp(email, results, answers);

      res.status(200).json({
        message: "Quiz results submitted successfully and synced with HubSpot and Mailchimp",
      });
    } catch (error) {
      console.error("Error processing quiz submission:", error);
      res.status(500).json({
        message: "Error processing quiz submission",
        error: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}