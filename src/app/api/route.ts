import { google } from "googleapis";
import { type NextRequest } from "next/server";
import path from "path";

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_IDS, SPREADSHEET_ID } = process.env;
const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
const chatIds = TELEGRAM_CHAT_IDS?.split(" ") || [];
const googleServiceAccount = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

const auth = new google.auth.GoogleAuth({
  ...(googleServiceAccount
    ? { credentials: JSON.parse(googleServiceAccount) }
    : { keyFilename: path.join(__dirname, "../../../../algozeus-53ef21de39f3.json") }),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    const email = formData.email;
    if (typeof email !== "string") {
      return Response.json({ error: "Email must be a string", status: 500 });
    }
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:A",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[email]],
      },
    });
    const message = `New email subscription: ${email}`;
    for (const chatId of chatIds) {
      const params = new URLSearchParams();
      params.append("chat_id", chatId);
      params.append("text", message);

      await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });
    }
    return Response.json({
      message: "Email sent successfully!",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      error: "Failed to send email, please book a meeting",
      status: 500,
    });
  }
}
