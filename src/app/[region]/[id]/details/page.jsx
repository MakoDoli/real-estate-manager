import React from "react";

export default function Page({ params }) {
  return (
    <div>
      {params.id} {params.region}
    </div>
  );
}
