/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { YMaps, Map as YaMap, ObjectManager } from "@pbe/react-yandex-maps";

import cl from './Map.module.scss';
import { MarkerData } from '../../utils/models/MarkerData';
import { SideMarkInfo } from '../../components/SideMarkInfo';

const escapeHtml = (unsafe: string) => unsafe
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

const generateBalloonContent = (data: MarkerData) => `
  <div class="${cl['balloon-content']}">
    ${data.photo ? `<img src="${data.photo}" class="${cl['balloon-photo']}"/>` : ''}
    <h3>${escapeHtml(data.title)}</h3>
    <p>${escapeHtml(data.description)}</p>
    <div class="${cl['balloon-footer']}">
      <span>Автор: ${escapeHtml(data.author)}</span>
      <span>Дата: ${new Date(data.date).toLocaleDateString()}</span>
    </div>
    <button 
      class="${cl['balloon-button']}"
      onclick="window.handleMarkerClick()"
    >
      Подробнее
    </button>
  </div>
`;

export const Map: React.FC = () => {
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const markersData: MarkerData[] = [
    {
      id: 1,
      coordinates: [55, 73.36],
      title: "Объект 1",
      description: "Описание объекта 1",
      author: "Иван Иванов",
      date: "2024-05-20",
      photo: "/path/to/photo.jpg"
    },
  ];

  const handleMarkerClick = () => {
    setShowInfo(true);
  };

  useEffect(() => {
    (window as any).handleMarkerClick = handleMarkerClick;

    return () => {
      delete (window as any).handleMarkerClick;
    };
  }, []);

  const features = markersData.map((marker) => ({
    id: marker.id,
    geometry: {
      type: "Point",
      coordinates: marker.coordinates
    },
    properties: {
      balloonContent: generateBalloonContent(marker),
      hintContent: marker.title,
      customData: {
        onClick: () => setActiveMarkerId(marker.id)
      },
    }
  }));

  const activeMarkerData = markersData.find(marker => marker.id === activeMarkerId);

  return (
    <div className={cl['map__container']}>
      {activeMarkerData && showInfo && (
        <SideMarkInfo data={activeMarkerData} onClose={() => setShowInfo(false)} />
      )}

      <YMaps query={{ load: "package.full" }}>
        <YaMap
          defaultState={{ center: [55, 73.36], zoom: 11 }}
          width="100%"
          height="900px"
          className={cl['map']}
        >
          <ObjectManager
            features={features}
            options={{
              clusterize: true,
              gridSize: 32,
            }}
            objects={{
              openBalloonOnClick: true,
              preset: "islands#blueDotIcon",
            }}
            modules={[
              "objectManager.addon.objectsBalloon",
              "objectManager.addon.objectsHint",
            ]}
            instanceRef={(instance: { objects: { events: { add: (arg0: string, arg1: (e: any) => void) => void; }; }; }) => {
              if (instance) {
                instance.objects.events.add('click', (e: any) => {
                  const objectId = e.get('objectId');
                  const clickedFeature = features.find(f => f.id === objectId);
                  clickedFeature?.properties.customData.onClick();
                });
              }
            }}
          />
        </YaMap>
      </YMaps>
    </div>
  );
};
