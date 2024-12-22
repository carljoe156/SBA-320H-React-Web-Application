import React from "react";

const ArtworkCard = ({ artwork }) => {
  //   To that   ensure the image URL is fully qualified
  const imageUrl = artwork.primaryImage?.startsWith("http")
    ? artwork.primaryImage
    : `https://www.metmuseum.org${artwork.primaryImage}`;

  return (
    <div className="artwork-card">
      <h3>{artwork.title}</h3>
      <p>{artwork.artistDisplayName}</p>
      <p>{artwork.objectDate}</p>
      {/* <p>{artwork.objectDescription}</p> */}

      {imageUrl ? (
        <img
          src={imageUrl}
          alt={artwork.title}
          style={{ width: "100px", height: "auto" }}
        />
      ) : (
        <p>No image available</p> //   Our  Fallback message if there's no image/Error Handling
      )}
    </div>
  );
};

export default ArtworkCard;
