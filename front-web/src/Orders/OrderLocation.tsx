import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import AsyncSelect from 'react-select/async';
import { fetchLocalMapBox } from '../api';
import { OrderLocationData } from './types';

const initialPosition = {
    lat: -25.5172828,
    lng: -54.5469635
}

type Place = {
    label?: string;
    value?: string;
    position: {
        lat: number;
        lng: number;
    }
}

type Props = {
    onChangeLocation: (Location: OrderLocationData) => void;
}

function OrderLocation({ onChangeLocation }: Props) {

    const [address, setAddress] = useState<Place>({
        position: initialPosition
    })

    const loadOptions = async (inputValue: string, callback: (places: Place[]) => void) => {
        const response: any = await fetchLocalMapBox(inputValue);
      
        const places = response.data.features.map((item: any) => {
          return ({
            label: item.place_name,
            value: item.place_name,
            position: {
              lat: item.center[1],
              lng: item.center[0]
            }
            
          });
        });
    
        callback(places);

        return places

      };

    const handleChangeSelect = (place: Place) => {
        setAddress(place);
        onChangeLocation({
            latitude: place.position.lat,
            longitude: place.position.lng,
            address: place.label!
        })
    }

    return (
        <div className='order-location-container'>
            <div className='order-location-content'>
                <h3 className='order-location-title'>
                    Selecione onde o pedido deve ser entregue:
                </h3>
                <div className='filter-container'>
                    <AsyncSelect
                        placeholder=""
                        className='filter'
                        loadOptions={loadOptions}
                        onChange={value => handleChangeSelect(value as Place)}
                    />
                </div>

                <MapContainer
                    center={address.position}
                    zoom={14}
                    key={address.position.lat}
                    scrollWheelZoom>

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={address.position}>
                        <Popup>
                            {address.label}
                        </Popup>
                    </Marker>
                </MapContainer>

            </div>
        </div>
    )
}

export default OrderLocation;