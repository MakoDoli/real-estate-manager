import { token } from "@/data/token";
import { NextResponse } from "next/server";

export async function createNewAgent(payload) {
  try {
    const response = await fetch(
      "https://api.real-estate-manager.redberryinternship.ge/api/agents",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: payload,
      }
    );

    if (!response.ok) {
      console.error("Request Failed");
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function getAgents() {
  try {
    const response = await fetch(
      "https://api.real-estate-manager.redberryinternship.ge/api/agents",
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
    return NextResponse.json({ message: "Something went wrong" });
  }
}
