"use client";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import Link from "next/link";
import { list as LIST } from "@/_api/api";
import { Layout } from "@/_components/ui/layout";
import { Breadcrumbs } from "@/_components/shared/breadcrumbs";

export const Locations = () => {
  const [selected, setSelected] = useState({
    country: "Serbia",
    town: "Beograd",
  });

  const [findStore, setFindStore] = useState(false);

  const containerStyle = {
    width: "100%",
    height: "500px",
    marginTop: "1rem",
    display: findStore ? "block" : "none",
  };

  const [places, setPlaces] = useState([
    {
      lat: "",
      lng: "",
    },
  ]);

  const { data } = useQuery({
    queryKey: ["prodajna-mesta"],
    queryFn: async () => {
      return await LIST(`/stores/retails`, { limit: -1 }).then((res) => {
        setSelected({ country: "Serbia", town: "Beograd" });
        return res?.payload;
      });
    },
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAb3yABiMy-kIRMSGFD1YQMMp8pMHPZ2m0",
  });
  const [showMap, setShowMap] = useState(false);
  const [zoom, setZoom] = useState(11);

  const findPlaces = (data) => {
    const places = [];
    data?.items?.map(({ country_name, town_name, latitude, longitude }) => {
      const isTownInSelectedCountry = country_name === selected?.country;
      const isTownSelected = town_name === selected?.town;
      if (isTownInSelectedCountry && isTownSelected) {
        places.push({
          lat: latitude,
          lng: longitude,
        });
      }
    });
    setPlaces(places);
  };

  const showMapHandler = useCallback(() => {
    const btn = document?.getElementById("findButton");
    setShowMap(true);
    setZoom(12);

    btn?.click();
  }, []);

  useEffect(() => {
    if (selected?.country && selected?.town) {
      setTimeout(() => {
        showMapHandler();
      }, 1000);
    }
  }, [selected]);

  const uniqueTowns = new Set();

  return (
    <Layout className={``}>
      <div className={`ml-auto flex justify-start md:justify-end mt-5`}>
        <Breadcrumbs name={`Prodajna mesta`} parents={[]} />
      </div>
      <h1 className={`text-[1.823rem] font-bold my-5`}>Prodajna mesta</h1>
      <div className={`flex items-center gap-5 max-lg:flex-wrap`}>
        <select
          value={selected?.country}
          className={`cursor-pointer border border-slate-300 focus:border-slate-300 focus:outline-0 focus:ring-0 group-hover:bg-black max-md:mr-auto max-md:w-full max-md:text-[16px]`}
          onChange={(e) => {
            setSelected({ town: "", country: e.target.value });
            setFindStore(false);
            setShowMap(false);
          }}
        >
          <option value={""}>Izaberite državu</option>
          {(data?.items || [])
            .map(({ country_name }) => country_name)
            .filter(Boolean)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((uniqueCountry, index) => {
              switch (uniqueCountry) {
                case "Serbia":
                  return <option value={uniqueCountry}>Srbija</option>;
                case "Montenegro":
                  return <option value={uniqueCountry}>Crna Gora</option>;
                case "Bosnia and Herzegovina":
                  return (
                    <option value={uniqueCountry}>Bosna i Hercegovina</option>
                  );
                case "Croatia":
                  return <option value={uniqueCountry}>Hrvatska</option>;
                case "Slovenia":
                  return <option value={uniqueCountry}>Slovenija</option>;
                case "Hungary":
                  return <option value={uniqueCountry}>Mađarska</option>;
                case "Macedonia":
                  return <option value={uniqueCountry}>Makedonija</option>;
                case "Slovakia":
                  return <option value={uniqueCountry}>Slovačka</option>;
                default:
                  return <option value={uniqueCountry}>{uniqueCountry}</option>;
              }
            })}
        </select>
        <select
          value={selected?.town}
          className={`cursor-pointer border border-slate-300 focus:border-slate-300 focus:outline-0 focus:ring-0 group-hover:bg-black max-md:mr-auto max-md:w-full max-md:text-[16px]`}
          onChange={(e) => {
            setSelected({ ...selected, town: e.target.value });
            setShowMap(false);
            setFindStore(false);
          }}
        >
          <option value={""}>Izaberite grad</option>
          {data?.items?.map(({ country_name, town_name }) => {
            const isTownInSelectedCountry = country_name === selected?.country;

            if (isTownInSelectedCountry && !uniqueTowns.has(town_name)) {
              uniqueTowns.add(town_name);
              return <option value={town_name}>{town_name}</option>;
            }

            return null;
          })}
        </select>
        <button
          onClick={() => {
            setFindStore(true);
            //find every place in selected town
            findPlaces(data);

            setZoom(15);
            showMapHandler();
          }}
          className={`self-stretch bg-black px-10 py-2 text-white hover:bg-black/80 max-md:mr-auto max-md:w-full max-md:text-[16px]`}
          id={`findButton`}
        >
          Pronađite radnju
        </button>
      </div>
      <div className={`flex flex-col items-start md:gap-10 lg:flex-row`}>
        {findStore && (
          <div
            className={`mt-10 flex flex-col max-md:divide-y md:gap-7 md:min-w-[20%] md:max-w-[20%] !w-full`}
          >
            {data?.items?.map((item, i) => {
              const isTownInSelectedCountry =
                item.country_name === selected?.country;
              const isTownSelected = item.town_name === selected?.town;
              return (
                isTownInSelectedCountry &&
                isTownSelected && (
                  <div key={i} className={` max-md:py-6 `}>
                    <h1
                      className={`mb-3 text-[1.5rem] font-medium max-md:text-[1.3rem]`}
                    >
                      {item?.name}
                    </h1>
                    <div className={`flex items-start gap-10`}>
                      <div className={`flex flex-col gap-1`}>
                        <p className={`text-[.9rem] max-md:text-[16px]`}>
                          {item?.town_name} - {item?.address}
                        </p>
                        <Link
                          href={`tel:${
                            item.phone?.includes("381") ||
                            item?.phone?.includes("382") ||
                            item?.phone?.includes("387") ||
                            item?.phone?.includes("386")
                              ? "+"
                              : ""
                          }${item.phone}`}
                          className={`text-[.9rem] underline max-md:text-[16px]`}
                        >
                          {item.phone?.includes("381") ||
                          item?.phone?.includes("382") ||
                          item?.phone?.includes("387") ||
                          item?.phone?.includes("386")
                            ? "+"
                            : ""}
                          {item.phone}
                        </Link>
                        <Link
                          href={`mailto:${item?.email}`}
                          className={`text-[.9rem] underline max-md:text-[16px]`}
                        >
                          {item.email}
                        </Link>
                        {item?.work_hours && (
                          <div className={`flex flex-col gap-1`}>
                            <span className={`font-medium max-md:!text-[16px]`}>
                              Radno vreme:
                            </span>
                            <p
                              className={`prose text-[.9rem] prose-p:!text-[16px] max-md:!text-[16px]`}
                              dangerouslySetInnerHTML={{
                                __html: item?.work_hours,
                              }}
                            ></p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        )}
        {isLoaded &&
        selected?.country &&
        selected?.town &&
        showMap &&
        findStore ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            options={{
              zoom: zoom,
              minZoom: 11,
            }}
            center={{
              lat: Number(places[0]?.lat),
              lng: Number(places[0]?.lng),
            }}
            onLoad={(map) => {
              const bounds = new window.google.maps.LatLngBounds({
                lat: Number(
                  places.reduce((sum, place) => sum + Number(place?.lat), 0) /
                    places.length,
                ),
                lng: Number(
                  places.reduce((sum, place) => sum + Number(place?.lng), 0) /
                    places.length,
                ),
              });

              map.fitBounds(bounds);
            }}
            zoom={zoom}
            mapContainerClassName={`${!findStore ? `!hidden` : ``}`}
          >
            {places?.map((place) => {
              return (
                <MarkerF
                  key={place.lat}
                  position={{
                    lat: Number(place.lat),
                    lng: Number(place.lng),
                  }}
                ></MarkerF>
              );
            })}
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
};
