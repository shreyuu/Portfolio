import { useState } from "react";

const ProfileCard = () => {
  const [cardLoaded, setCardLoaded] = useState(false);

  return (
    <div className="mt-10 flex justify-center">
      <a
        href="https://app.daily.dev/shreyuu_icymi"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://api.daily.dev/devcards/v2/zwkjv4hIqFk3ReuCdRjqV.png?type=default&r=3cs"
          width="356"
          alt="Shreyash Meshram's Dev Card"
          className="rounded-xl shadow-xl"
          onLoad={() => setCardLoaded(true)}
          onError={() => console.error("Failed to load dev card")}
          style={{ opacity: cardLoaded ? 1 : 0.5 }}
        />
      </a>
    </div>
  );
};

export default ProfileCard;
