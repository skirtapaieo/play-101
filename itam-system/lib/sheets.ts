import { google } from 'googleapis';
import type { SheetName } from './types';

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

// Initialize Google Sheets API client
export function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

// Read data from a specific sheet
export async function readSheet(sheetName: SheetName, range?: string) {
  const sheets = getGoogleSheetsClient();
  const fullRange = range ? `${sheetName}!${range}` : sheetName;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: fullRange,
  });

  return response.data.values || [];
}

// Write data to a specific sheet
export async function writeSheet(
  sheetName: SheetName,
  range: string,
  values: any[][]
) {
  const sheets = getGoogleSheetsClient();

  const response = await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!${range}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values,
    },
  });

  return response.data;
}

// Append data to a specific sheet
export async function appendSheet(sheetName: SheetName, values: any[][]) {
  const sheets = getGoogleSheetsClient();

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: sheetName,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values,
    },
  });

  return response.data;
}

// Delete a row from a sheet
export async function deleteRow(sheetName: SheetName, rowIndex: number) {
  const sheets = getGoogleSheetsClient();

  // Get sheet ID
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
  });

  const sheet = spreadsheet.data.sheets?.find(
    (s) => s.properties?.title === sheetName
  );

  if (!sheet?.properties?.sheetId) {
    throw new Error(`Sheet ${sheetName} not found`);
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: sheet.properties.sheetId,
              dimension: 'ROWS',
              startIndex: rowIndex,
              endIndex: rowIndex + 1,
            },
          },
        },
      ],
    },
  });
}

// Helper: Convert sheet data to objects
export function sheetToObjects<T>(data: any[][], headers?: string[]): T[] {
  if (data.length === 0) return [];

  const headerRow = headers || data[0];
  const rows = headers ? data : data.slice(1);

  return rows.map((row) => {
    const obj: any = {};
    headerRow.forEach((header: string, index: number) => {
      obj[header] = row[index] || '';
    });
    return obj as T;
  });
}

// Helper: Convert objects to sheet data
export function objectsToSheet<T extends Record<string, any>>(
  objects: T[],
  headers: string[]
): any[][] {
  return objects.map((obj) => headers.map((header) => obj[header] || ''));
}
