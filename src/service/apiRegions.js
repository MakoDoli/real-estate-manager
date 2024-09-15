import { token } from "@/data/token";

export async function getRegions() {
  try {
    const response = await fetch(
      "https://api.real-estate-manager.redberryinternship.ge/api/regions",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!response.ok) console.error("Request failed");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getCities() {
  try {
    const response = await fetch(
      "https://api.real-estate-manager.redberryinternship.ge/api/cities",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!response.ok) console.error("Request failed");
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}
