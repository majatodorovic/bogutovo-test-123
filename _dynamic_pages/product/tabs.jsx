"use client";

import { Suspense, useState } from "react";
import { Description, Declaration } from "@/_dynamic_pages";

export const Tabs = ({ slug }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`mt-10`}>
      <div className={`flex items-center gap-7 divider`}>
        <button
          className={`relative font-semibold ${
            activeTab === 0 && "text-boa-red"
          }`}
          onClick={() => setActiveTab(0)}
        >
          Opis
        </button>
        <button
          className={`relative font-semibold ${
            activeTab === 1 && "text-boa-red"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Deklaracija
        </button>
        <button
          className={`relative font-semibold ${
            activeTab === 2 && "text-boa-red"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Dostava
        </button>
      </div>
      <div>
        {activeTab === 0 && (
          <Suspense
            fallback={
              <div className={`h-5 w-full bg-slate-200 animate-pulse`} />
            }
          >
            <Description slug={slug} />
          </Suspense>
        )}
        {activeTab === 1 && (
          <Suspense
            fallback={
              <div className={`h-5 w-full bg-slate-200 animate-pulse`} />
            }
          >
            <Declaration slug={slug} />
          </Suspense>
        )}
        {activeTab === 2 && (
          <p className={`mt-5`}>
            Vaša pošiljka će biti dostavljena putem kurirske službe AKS, svakim
            radnim danom u periodu između 8h – 16h. Troškovi dostave su fiksni i
            iznose 180 dinara, sem u slučaju da je vrednost Vaše porudžbinu
            preko 4.000 dinara kada je dostava besplatna.
          </p>
        )}
      </div>
    </div>
  );
};
