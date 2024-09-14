import React from "react";
import { getListingById } from "../../service/apiListings";

export default async function ItemDetails({ id, region }) {
  const idInt = parseInt(id);
  //const item = await getListingById(189);
  console.log(item);
  return <div>ItemDetails</div>;
}
