import React, { useEffect, useState } from 'react';
import L, { LatLng } from 'leaflet';
import { Spinner } from 'orcalib-ui-kit';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SideMarkInfo } from '../../components/SideMarkInfo';
import { getAllParties } from '../../redux/actions/marker';
import { useSelector } from '../../redux/store';
import { IParty } from '../../utils/models/MarkerData';
import { ErrorPage } from '../Error';

import 'leaflet/dist/leaflet.css';
import cl from './Map.module.scss';

const customIcon = new L.DivIcon({
    html: `
    <div style="
      width: 40px;
      height: 56px;
      background: linear-gradient(90deg,rgb(9, 99, 189) 0%, #66CCFF 100%);
      mask-image: url('/icons/marker.svg');
      mask-size: contain;
      mask-repeat: no-repeat;
      border: 2px solid black;
    "></div>
  `,
    className: '',
    iconSize: [40, 56],
    iconAnchor: [22, 43],
    popupAnchor: [0, -41],
});

const mapContainerStyle = {
    width: '100%',
    height: '900px',
};

const defaultCenter: [number, number] = [55, 73.36];

interface ContextMenuState {
    coords: [number, number];
    latlng: [number, number];
    isActive: boolean;
}

const MapEvents: React.FC<{
    setContextMenu: React.Dispatch<React.SetStateAction<ContextMenuState>>;
}> = ({ setContextMenu }) => {
    const map = useMapEvents({
        contextmenu (e: { latlng: LatLng; originalEvent: MouseEvent }) {
            const point = map.latLngToContainerPoint(e.latlng);
            const container = map.getContainer();
            const rect = container.getBoundingClientRect();
            setContextMenu({
                coords: [rect.top + point.y, rect.left + point.x],
                latlng: [e.latlng.lat, e.latlng.lng],
                isActive: true,
            });
            localStorage.setItem('geoCord', `${e.latlng.lat}, ${e.latlng.lng}`);
        },
        click () {
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

    if (!marker.geoPoint) return null;

    return (
        <Marker
            position={[marker.geoPoint[0], marker.geoPoint[1]]}
            icon={customIcon}
            eventHandlers={{
                click: () => {
                    setActiveMarkerId(marker._id);
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
                        <span>
                            Дата: {marker?.createdAt instanceof Date
                                ? marker.createdAt.toLocaleDateString()
                                : typeof marker?.createdAt === 'string'
                                    ? new Date(marker.createdAt).toLocaleDateString()
                                    : 'Н/Д'}
                        </span>
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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allParties, getAllLoading, getAllError } = useSelector((state) => state.marker);

    const [activeMarkerId, setActiveMarkerId] = useState<string | undefined>('');
    const [showInfo, setShowInfo] = useState(false);
    const [contextMenu, setContextMenu] = useState<ContextMenuState>({
        coords: [0, 0],
        latlng: [0, 0],
        isActive: false,
    });

    const activeMarkerData = allParties?.find((marker: IParty) => marker._id === activeMarkerId);

    useEffect(() => {
        dispatch(getAllParties());
    }, [dispatch]);

    if (getAllError) return <ErrorPage />;

    if (getAllLoading) return <Spinner />;

    return (
        <div className={cl['map__container']}>
            {activeMarkerData && showInfo && (
                <SideMarkInfo
                    data={activeMarkerData}
                    onClose={() => setShowInfo(false)}
                />
            )}

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
                        onClick={() => navigate('/add-event')}
                        className={cl['context-menu__item']}
                    >
                        Добавить маркер
                    </div>
                    {allParties?.some(
                        (marker: IParty) =>
                            marker.geoPoint &&
                            marker.geoPoint[0] === contextMenu.latlng[0] &&
                            marker.geoPoint[1] === contextMenu.latlng[1],
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
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapEvents setContextMenu={setContextMenu} />

                {allParties?.map((party: IParty) => (
                    <MarkerWithZoom
                        key={party._id || party.uid}
                        marker={party}
                        setActiveMarkerId={setActiveMarkerId}
                        setShowInfo={setShowInfo}
                    />
                ))}
            </MapContainer>
        </div>
    );
};
