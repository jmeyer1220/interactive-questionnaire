import axios from "axios";

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

    // Search for existing contact
    const searchResponse = await axios.post(
      `https://api.hubapi.com/crm/v3/objects/contacts/search`,
      {
        filterGroups: [
          {
            filters: [
              {
                propertyName: "email",
                operator: "EQ",
                value: email,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${hubspotAccessToken}`,
        },
      },
    );

    let contactId;
    if (searchResponse.data.total > 0) {
      // Contact exists, get their ID
      contactId = searchResponse.data.results[0].id;
      console.log("Existing contact found:", contactId);
    } else {
      // Contact doesn't exist, create a new one
      const createResponse = await axios.post(
        "https://api.hubapi.com/crm/v3/objects/contacts",
        {
          properties: {
            email: email,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${hubspotAccessToken}`,
          },
        },
      );
      contactId = createResponse.data.id;
      console.log("New contact created:", contactId);
    }

    // Update the contact with quiz results
    const updateResponse = await axios.patch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
      {
        properties: {
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

    console.log("Contact updated in HubSpot:", updateResponse.data);
    return updateResponse.data;
  } catch (error) {
    console.error(
      "Error in HubSpot integration:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, results, answers } = req.body;

    try {
      // Add/update contact in HubSpot
      await addContactToHubSpot(email, results, answers);

      res.status(200).json({
        message: "Quiz results submitted successfully and synced with HubSpot",
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

async function addSubscriberToMailchimp(email, results, answers, tag) {
  const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
  const mailchimpAudienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const mailchimpServer =  process.env.MAILCHIMP_SERVER; // E.g., "us8"

  if (!mailchimpApiKey || !mailchimpAudienceId || !mailchimpServer) {
    console.error("Mailchimp credentials are not set");
    throw new Error("Mailchimp credentials are missing");
  }

  try {
    const subscriberHash = crypto
      .createHash("md5")
      .update(email.toLowerCase())
      .digest("hex");

    // Add or update subscriber
    const response = await axios.put(
      `https://${mailchimpServer}.api.mailchimp.com/3.0/lists/${mailchimpAudienceId}/members/${subscriberHash}`,
      {
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: {
          QUIZRESULTS: JSON.stringify(results),
          QUIZANSWERS: JSON.stringify(answers),
        },
        tags: [tag],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mailchimpApiKey}`,
        },
      },
    );

    console.log("Subscriber added/updated in Mailchimp:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in Mailchimp integration:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}
