export async function fetchDataAsync(): Promise<any[]> {
  try {
    const response = await fetch(`../public/dataset.json`);
    if (!response.ok) {
      throw new Error("failed fetching");
    }
    const data = await response.json();
    return data;
  } catch {
    return [];
  }
}
