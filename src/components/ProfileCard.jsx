import { useState } from "react";

const ProfileCard = () => {
  const [cardLoaded, setCardLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setCardLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    console.error("Failed to load dev card");
  };

  return (
    <div className="mt-10 flex justify-center">
      <a
        href="https://app.daily.dev/shreyuu_icymi"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        {!imageError ? (
          <img
            src="https://api.daily.dev/devcards/v2/zwkjv4hIqFk3ReuCdRjqV.png?type=default&r=vrs"
            width="356"
            height="356"
            alt="Shreyash Meshram's Dev Card"
            className="rounded-xl shadow-xl transition-opacity duration-300 group-hover:shadow-2xl"
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            style={{
              opacity: cardLoaded ? 1 : 0.5,
              aspectRatio: '1 / 1'
            }}
          />
        ) : (
          <div className="w-[356px] h-[356px] rounded-xl shadow-xl bg-gray-800 flex items-center justify-center text-gray-400">
            <p>Unable to load dev card</p>
          </div>
        )}
      </a>
    </div>
  );
};

export default ProfileCard;
