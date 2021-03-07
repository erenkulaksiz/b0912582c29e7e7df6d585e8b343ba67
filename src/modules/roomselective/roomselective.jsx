import React, { Component } from 'react'
import styles from './roomselective.module.scss'
import PropTypes from 'prop-types'

class RoomSelective extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {
            cacheSelectedRoom,
            hotelDetails,
            selectedHotel,
            selectedRoom,
        } = this.props

        let rooms = [];

        const Room = (checked, room) => {

            return (<div className={styles.room}>
                <input
                    type="radio"
                    id={room.id}
                    name={"room"}
                    value={room.id}
                    className={styles.roomRadio}
                    onChange={(e) => { selectedRoom(e.target.value) }}
                    checked={checked}
                />
                <label for={room.id} className={styles.roomLabel}>
                    <div className={styles.innerDetails}>
                        <div className={styles.innerDetails__title}>
                            {room.title}
                        </div>
                        <img src={room.photo} className={styles.roomImg} />
                        <div className={styles.innerDetails__desc}>
                            <div className={styles.details}>
                                5 gün <br /> 1 yetişkin
                            </div>
                            <div className={styles.price}>
                                {room.price}TL
                            </div>
                        </div>
                    </div>
                </label>
            </div>);
        }

        console.log("states ", cacheSelectedRoom);

        return (
            <div className={styles.roomselective}>
                <div className={styles.title}>
                    Oda Tipi Seçimi
                </div>
                <div className={styles.bar}></div>
                <div className={styles.roomtype}>
                    {hotelDetails.map(function (hotel, index) {
                        if (hotel.id == selectedHotel) {
                            hotel.room_type.map(function (room, index) {
                                //console.log("room ", room);
                                if (cacheSelectedRoom) {
                                    if (room.id == cacheSelectedRoom) {
                                        rooms.push(Room(true, room));
                                    } else {
                                        rooms.push(Room(false, room));
                                    }
                                } else {
                                    rooms.push(Room(false, room));
                                }
                            })
                        }
                    })}

                    {rooms}

                </div>
            </div>
        );
    }

}

RoomSelective.propTypes = {
    cacheSelectedRoom: PropTypes.string,
    hotelDetails: PropTypes.string,
    selectedHotel: PropTypes.number,
    selectedRoom: PropTypes.string,
}

export default RoomSelective