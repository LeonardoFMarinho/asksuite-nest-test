import { IRoom } from '../interface/IRoom';
import { clearUrl } from './clearURL';

export const formaterRoomsParams = (rooms: IRoom[]): IRoom[] => {
  const roomsImageModified = rooms.map((room) => {
    room.image = clearUrl(room['image']);
    return room;
  });
  return roomsImageModified;
};
