/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { YMaps, Map as YaMap, ObjectManager } from '@pbe/react-yandex-maps';

import cl from './Map.module.scss';
import { MarkerData } from '../../utils/models/MarkerData';
import { SideMarkInfo } from '../../components/SideMarkInfo';

const escapeHtml = (unsafe: string) =>
  unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const generateBalloonContent = (data: MarkerData) => `
  <div class="${cl['balloon-content']}">
    ${data.photo ? `<img src="${data.photo}" class="${cl['balloon-photo']}" />` : ''}
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
  const [contextMenu, setContextMenu] = useState<{ coords: [number, number]; isActive: boolean }>({
    coords: [0, 0],
    isActive: false,
  });
  const mapRef = useRef<HTMLDivElement>(null);

  const markersData: MarkerData[] = [
    {
      id: 1,
      coordinates: [55, 73.36],
      title: 'Объект 1',
      description: 'Описание объекта 1',
      author: 'Иван Иванов',
      date: '2024-05-20',
      photo: '/path/to/photo.jpg',
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
      type: 'Point',
      coordinates: marker.coordinates,
    },
    properties: {
      balloonContent: generateBalloonContent(marker),
      hintContent: marker.title,
      customData: {
        onClick: () => setActiveMarkerId(marker.id),
      },
    },
  }));

  const activeMarkerData = markersData.find((marker) => marker.id === activeMarkerId);

  const handleContextMenu = (e: ymaps.IEvent) => {
    const position = e.get('position') as [number, number];
    setContextMenu({ coords: position, isActive: true });
  };

  const handleClick = () => {
    setContextMenu({ coords: [0, 0], isActive: false });
  };

  return (
    <div className={cl['map__container']} ref={mapRef}>
      {activeMarkerData && showInfo && (
        <SideMarkInfo data={activeMarkerData} onClose={() => setShowInfo(false)} />
      )}

      {contextMenu.isActive && (
        <div
          className={cl['context-menu']}
          style={{
            position: 'absolute',
            top: `${contextMenu.coords[1]}px`,
            left: `${contextMenu.coords[0]}px`,
          }}
        >
          <div className={cl['context-menu__item']}>Добавить маркер</div>
          <div className={cl['context-menu__item']}>Редактировать</div>
          <div className={cl['context-menu__item']}>Удалить</div>
        </div>
      )}

      <YMaps query={{ load: 'package.full' }}>
        <YaMap
          defaultState={{ center: [55, 73.36], zoom: 11 }}
          width="100%"
          height="900px"
          className={cl['map']}
          instanceRef={(mapInstance: ymaps.Map) => {
            if (mapInstance) {
              mapInstance.events.add('contextmenu', handleContextMenu);
              mapInstance.events.add('click', handleClick);
            }
          }}
        >
          <ObjectManager
            features={features}
            options={{
              clusterize: true,
              gridSize: 32,
            }}
            objects={{
              openBalloonOnClick: true,
              preset: 'islands#blueDotIcon',
            }}
            modules={['objectManager.addon.objectsBalloon', 'objectManager.addon.objectsHint']}
            // хз что это, тайпскрипт сам добавил
            instanceRef={(instance: { objects: { events: { add: (arg0: string, arg1: (e: any) => void) => void; }; }; }) => {
              if (instance) {
                instance.objects.events.add('click', (e: any) => {
                  const objectId = e.get('objectId');
                  const clickedFeature = features.find((f) => f.id === objectId);
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
