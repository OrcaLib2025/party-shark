import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLng } from 'leaflet';
import { IParty } from '../../utils/models/MarkerData';
import cl from './Map.module.scss';
import { SideMarkInfo } from '../../components/SideMarkInfo';
import { Modal } from 'orcalib-ui-kit';
import { useNavigate } from 'react-router-dom';

const customIcon = new L.Icon({
  iconUrl: '/icons/marker.svg', // Если найдем метку получше, менять здесь
  iconSize: [40, 56],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const mapContainerStyle = {
  width: '100%',
  height: '900px',
};

const defaultCenter: [number, number] = [55, 73.36];

const markersData: IParty[] = [
  {
    id: '1',
    geoPoint: [55, 73.36],
    title: 'Объект 1',
    description: 'Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст ТекстТекст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст ТекстТекст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст ТекстТекст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст ',
    author: 'Иван Иванов',
    createdAt: new Date(),
    img: 'img/Seat.svg',
  },
];

interface ContextMenuState {
  coords: [number, number];
  latlng: [number, number];
  isActive: boolean;
}

const MapEvents: React.FC<{
  setContextMenu: React.Dispatch<React.SetStateAction<ContextMenuState>>;
}> = ({ setContextMenu }) => {
  const map = useMapEvents({
    contextmenu(e: { latlng: LatLng; originalEvent: MouseEvent }) {
      const point = map.latLngToContainerPoint(e.latlng);
      const container = map.getContainer();
      const rect = container.getBoundingClientRect();
      setContextMenu({
        coords: [rect.top + point.y, rect.left + point.x],
        latlng: [e.latlng.lat, e.latlng.lng],
        isActive: true,
      });
    },
    click() {
      setContextMenu({ coords: [0, 0], latlng: [0, 0], isActive: false });
    },
  });
  return null;
};

const MarkerWithZoom: React.FC<{
  marker: IParty;
  setActiveMarkerId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ marker, setActiveMarkerId, setShowInfo }) => {
  const map = useMap();
  if (!marker.geoPoint) return;
  return (
    <Marker
      position={[marker.geoPoint[0], marker.geoPoint[1]]}
      icon={customIcon}
      eventHandlers={{
        click: () => {
          setActiveMarkerId(marker.id);
          if (!marker.geoPoint) return;
          map.setView([marker.geoPoint[0], marker.geoPoint[1]], 16);
        },
      }}
    >
      <Popup>
        <div className={cl['balloon-content']}>
          {marker.img && <img src={marker.img} className={cl['balloon-photo']} />}
          <h3>{marker.title}</h3>
          <div className={cl['balloon-desc']}>{marker.description}</div>
          <div className={cl['balloon-footer']}>
            <span>Автор: {marker.author}</span>
            <span>Дата: {marker?.createdAt?.toLocaleDateString()}</span>
          </div>
          <button
            className={cl['balloon-button']}
            onClick={() => setShowInfo(true)}
          >
            Подробнее
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export const Map: React.FC = () => {
  const navigate = useNavigate();

  const [activeMarkerId, setActiveMarkerId] = useState<string | undefined>('');
  // const [newParty, setNewParty] = useState<IParty>({});
  const [modalCreate, setModalCreate] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    coords: [0, 0],
    latlng: [0, 0],
    isActive: false,
  });

  const activeMarkerData = markersData.find((marker) => marker.id === activeMarkerId);

  return (
    <div className={cl['map__container']}>
      {activeMarkerData && showInfo && (
        <SideMarkInfo data={activeMarkerData} onClose={() => setShowInfo(false)} />
      )}
      
      <Modal
        title="Create party"
        onClose={() => setModalCreate(false)}
        isVisible={modalCreate}
      >

      </Modal>

      {contextMenu.isActive && (
        <div
          className={cl['context-menu']}
          style={{
            position: 'fixed',
            top: `${contextMenu.coords[0] + 10}px`,
            left: `${contextMenu.coords[1] + 10}px`,
            zIndex: 1000,
          }}
        >
          <div
            role="presentation"
            onClick={() => void navigate('/add-event')}
            className={cl['context-menu__item']}
          >
            Добавить маркер
          </div>
          {markersData.some(
            (marker) =>
              marker.geoPoint &&
              marker.geoPoint[0] === contextMenu.latlng[0] &&
              marker?.geoPoint[1] === contextMenu.latlng[1]
          ) && (
            <React.Fragment>
              <div className={cl['context-menu__item']}>Редактировать</div>
              <div className={cl['context-menu__item']}>Удалить</div>
            </React.Fragment>
          )}
        </div>
      )}

      <MapContainer
        center={defaultCenter}
        zoom={15}
        style={mapContainerStyle}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        className={cl['map']}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents setContextMenu={setContextMenu} />
        {markersData.map((marker) => (
          <MarkerWithZoom
            key={marker.id}
            marker={marker}
            setActiveMarkerId={setActiveMarkerId}
            setShowInfo={setShowInfo}
          />
        ))}
      </MapContainer>
    </div>
  );
};
