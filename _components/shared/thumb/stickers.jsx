"use client";

export const Stickers = ({ stickers, position }) => {
  if (stickers?.length > 0) {
    switch (position) {
      case "thumb":
        return (
          <div
            className={`absolute top-1.5 right-1.5 z-[5] flex flex-col text-white`}
          >
            {(stickers ?? [])?.map(({ name }) => {
              return (
                <div
                  key={`sticker-${name}`}
                  className={`bg-boa-dark rounded-lg px-2 md:px-[1.85rem] py-1 text-xs font-semibold`}
                >
                  <p className={`text-white`}>{name}</p>
                </div>
              );
            })}
          </div>
        );
      default:
        return (stickers ?? [])?.map(({ name }) => {
          return (
            <div
              key={`sticker-${name}`}
              className={`bg-boa-dark rounded-lg w-fit px-3 py-1 text-xs font-semibold`}
            >
              <p className={`text-white`}>{name}</p>
            </div>
          );
        });
    }
  }

  return null;
};
